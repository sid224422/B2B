/**
 * Simple in-memory search cache to improve performance
 * Reduces redundant API calls and improves response times
 */

interface CacheEntry {
  data: any
  timestamp: number
  ttl: number // Time to live in milliseconds
}

class SearchCache {
  private cache = new Map<string, CacheEntry>()
  private readonly DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes

  /**
   * Get cached result if available and not expired
   */
  get(key: string): any | null {
    const entry = this.cache.get(key)
    
    if (!entry) {
      return null
    }

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  /**
   * Store result in cache
   */
  set(key: string, data: any, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  /**
   * Generate cache key from search parameters
   */
  generateKey(query: string, searchType: string): string {
    return `${searchType}:${query.toLowerCase().trim()}`
  }

  /**
   * Clear expired entries
   */
  cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }
  }
}

// Export singleton instance
export const searchCache = new SearchCache()

// Cleanup expired entries every 10 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    searchCache.cleanup()
  }, 10 * 60 * 1000)
}
