import { NextRequest, NextResponse } from 'next/server';
import { retrieve } from '@/src/lib/ai/retriever';
import { generateAnswer, isLLMAvailable } from '@/src/lib/ai/generator';
import { env } from '@/src/lib/env';

/**
 * Build context-aware prompt for LLM generation
 */
function buildPrompt(question: string, docs: { content: string; metadata: any }[]): string {
  const context = docs
    .map((doc, index) => 
      `[[Doc ${index + 1}]]\n${doc.content}\n(Metadata: ${JSON.stringify(doc.metadata)})`
    )
    .join('\n\n');

  return `You are an assistant for a B2B reviews and ratings platform. Answer the user's question using ONLY the context provided below. If the context doesn't contain enough information to answer the question, say you don't know.

Context:
${context}

Question: ${question}

Guidelines:
- Be concise and factual
- If multiple relevant snippets exist, synthesize them coherently
- Always end with "Citations: Doc X, Doc Y" referencing the document numbers you used
- If no relevant information is found, say "I don't have enough information to answer this question"`;
}

/**
 * AI Ask API endpoint
 * 
 * POST /api/ai/ask
 * Body: { question: string, filter?: Record<string, any> }
 * 
 * Returns: { answer?: string, docs: Array, message?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const question = String(body?.question ?? '').trim();
    const filter = (body?.filter && typeof body.filter === 'object') 
      ? body.filter 
      : {};

    // Validate input
    if (!question) {
      return NextResponse.json(
        { error: 'Missing required field: question' }, 
        { status: 400 }
      );
    }

    if (question.length > 1000) {
      return NextResponse.json(
        { error: 'Question too long (max 1000 characters)' }, 
        { status: 400 }
      );
    }

    // Retrieve relevant documents
    const retrievedDocs = await retrieve(question, filter);
    
    if (!retrievedDocs.length) {
      return NextResponse.json({
        answer: null,
        message: 'No relevant documents found. Try rephrasing your question or broadening your search criteria.',
        docs: []
      });
    }

    // If no LLM configured, return retrieved snippets only
    if (!isLLMAvailable()) {
      return NextResponse.json({
        answer: null,
        message: 'AI generation not configured. Returning retrieved document snippets.',
        docs: retrievedDocs.map((doc, index) => ({
          n: index + 1,
          id: doc.id,
          similarity: doc.similarity,
          content: doc.content,
          metadata: doc.metadata
        }))
      });
    }

    // Generate AI response with context
    const topDocs = retrievedDocs.slice(0, Number(env.AI_TOP_K ?? 8));
    const prompt = buildPrompt(question, topDocs);
    const answer = await generateAnswer(prompt);

    return NextResponse.json({
      answer,
      docs: topDocs.map((doc, index) => ({
        n: index + 1,
        id: doc.id,
        similarity: doc.similarity,
        metadata: doc.metadata
      }))
    });

  } catch (error: any) {
    console.error('AI Ask API error:', error);
    
    return NextResponse.json(
      { 
        error: error?.message ?? 'Internal server error',
        docs: []
      }, 
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported methods
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST with { question: string, filter?: object }' },
    { status: 405 }
  );
}
