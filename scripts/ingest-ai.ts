#!/usr/bin/env tsx

/**
 * AI Document Ingestion Script
 * 
 * Usage: tsx scripts/ingest-ai.ts
 * 
 * Pulls data from domain tables (companies, services, reviews, faqs), 
 * chunks content, generates embeddings via BGE, and upserts into ai_documents
 * using service role key for elevated permissions.
 */

import 'dotenv/config';
import { supabaseService } from '../src/lib/supabase';
import { embedTextBGE } from '../src/lib/ai/embeddings';
import { splitIntoChunks } from '../src/lib/ai/chunker';

type DomainRow = { 
  id: string; 
  content: string; 
  metadata: Record<string, any> 
};

/**
 * Fetch and prepare data from domain tables for embedding
 */
async function fetchDomainRows(): Promise<DomainRow[]> {
  const rows: DomainRow[] = [];

  console.log('📊 Fetching domain data...');

  // 1) Companies - core business information
  try {
    const { data, error } = await supabaseService
      .from('companies')
      .select('id, name, description, services');
    
    if (error) throw error;
    
    for (const company of data ?? []) {
      const text = [
        company.name,
        company.description,
        (company.services ?? []).join(', ')
      ].filter(Boolean).join('\n');
      
      rows.push({ 
        id: company.id, 
        content: text, 
        metadata: { 
          type: 'company', 
          company_id: company.id,
          source: 'companies'
        } 
      });
    }
    console.log(`✅ Fetched ${data?.length ?? 0} companies`);
  } catch (error) {
    console.warn('⚠️  Companies table not found or error:', error);
  }

  // 2) Services - service offerings and descriptions
  try {
    const { data, error } = await supabaseService
      .from('services')
      .select('id, title, summary');
    
    if (error) throw error;
    
    for (const service of data ?? []) {
      const text = [service.title, service.summary].filter(Boolean).join('\n');
      rows.push({ 
        id: service.id, 
        content: text, 
        metadata: { 
          type: 'service', 
          service_id: service.id,
          source: 'services'
        } 
      });
    }
    console.log(`✅ Fetched ${data?.length ?? 0} services`);
  } catch (error) {
    console.warn('⚠️  Services table not found or error:', error);
  }

  // 3) Reviews - user feedback and ratings
  try {
    const { data, error } = await supabaseService
      .from('reviews')
      .select('id, headline, body, rating, company_id');
    
    if (error) throw error;
    
    for (const review of data ?? []) {
      const text = [
        `Rating: ${review.rating}/5`,
        review.headline,
        review.body
      ].filter(Boolean).join('\n');
      
      rows.push({ 
        id: review.id, 
        content: text, 
        metadata: { 
          type: 'review', 
          company_id: review.company_id,
          rating: review.rating,
          source: 'reviews'
        } 
      });
    }
    console.log(`✅ Fetched ${data?.length ?? 0} reviews`);
  } catch (error) {
    console.warn('⚠️  Reviews table not found or error:', error);
  }

  // 4) FAQs - frequently asked questions
  try {
    const { data, error } = await supabaseService
      .from('faqs')
      .select('id, question, answer');
    
    if (error) throw error;
    
    for (const faq of data ?? []) {
      const text = [faq.question, faq.answer].filter(Boolean).join('\n');
      rows.push({ 
        id: faq.id, 
        content: text, 
        metadata: { 
          type: 'faq', 
          faq_id: faq.id,
          source: 'faqs'
        } 
      });
    }
    console.log(`✅ Fetched ${data?.length ?? 0} FAQs`);
  } catch (error) {
    console.warn('⚠️  FAQs table not found or error:', error);
  }

  return rows;
}

/**
 * Upsert a single chunk with embedding into ai_documents
 */
async function upsertChunk(
  content: string, 
  metadata: Record<string, any>
): Promise<void> {
  try {
    // Generate embedding for the chunk
    const embedding = await embedTextBGE(content, { isQuery: false });
    
    // Insert into ai_documents table
    const { error } = await supabaseService
      .from('ai_documents')
      .insert({ 
        content, 
        metadata, 
        embedding 
      });
    
    if (error) {
      throw new Error(`Database insert error: ${error.message}`);
    }
  } catch (error) {
    console.error('❌ Failed to upsert chunk:', error);
    throw error;
  }
}

/**
 * Main ingestion process
 */
async function main(): Promise<void> {
  console.log('🚀 Starting AI document ingestion...');
  
  try {
    // Fetch all domain data
    const rows = await fetchDomainRows();
    
    if (rows.length === 0) {
      console.log('ℹ️  No domain data found to ingest');
      return;
    }

    console.log(`📝 Processing ${rows.length} domain rows...`);
    
    let totalChunks = 0;
    
    // Process each row and chunk content
    for (const row of rows) {
      console.log(`🔄 Processing ${row.metadata.type}: ${row.id}`);
      
      // Split content into chunks
      const chunks = Array.from(splitIntoChunks(row.content, 1000));
      
      // Upsert each chunk
      for (const chunk of chunks) {
        await upsertChunk(chunk, row.metadata);
        totalChunks++;
      }
    }
    
    console.log(`✅ Successfully ingested ${totalChunks} chunks from ${rows.length} domain rows`);
    console.log('🎉 AI document ingestion complete!');
    
  } catch (error) {
    console.error('💥 Ingestion failed:', error);
    process.exit(1);
  }
}

// Run the ingestion
if (require.main === module) {
  main().catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
}
