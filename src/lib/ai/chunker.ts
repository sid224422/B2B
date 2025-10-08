/**
 * Text chunking utilities for document processing
 * Splits large documents into smaller chunks for embedding and retrieval
 */

/**
 * Split text into chunks of specified maximum character length
 * 
 * @param input - Text to chunk
 * @param maxChars - Maximum characters per chunk (default: 1000)
 * @returns Generator yielding text chunks
 */
export function* splitIntoChunks(input: string, maxChars = 1000): Generator<string> {
  let start = 0;
  
  while (start < input.length) {
    const end = Math.min(start + maxChars, input.length);
    yield input.slice(start, end);
    start = end;
  }
}

/**
 * Split text into chunks with word boundary awareness
 * Attempts to break at word boundaries to preserve semantic meaning
 * 
 * @param input - Text to chunk
 * @param maxChars - Maximum characters per chunk (default: 1000)
 * @returns Generator yielding text chunks
 */
export function* splitIntoChunksWithWordBoundary(
  input: string, 
  maxChars = 1000
): Generator<string> {
  let start = 0;
  
  while (start < input.length) {
    let end = Math.min(start + maxChars, input.length);
    
    // If not at the end of the text, try to break at word boundary
    if (end < input.length) {
      const lastSpace = input.lastIndexOf(' ', end);
      if (lastSpace > start) {
        end = lastSpace;
      }
    }
    
    yield input.slice(start, end).trim();
    start = end;
  }
}
