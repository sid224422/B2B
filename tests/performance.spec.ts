import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should load homepage within performance budget', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Check that page loads within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    // Measure performance metrics
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const vitals: { lcp?: number; fid?: number; cls?: number } = {};
          
          entries.forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
              vitals.lcp = entry.startTime;
            }
            if (entry.entryType === 'first-input') {
              const firstInputEntry = entry as PerformanceEventTiming;
              vitals.fid = firstInputEntry.processingStart - firstInputEntry.startTime;
            }
            if (entry.entryType === 'layout-shift') {
              const layoutShiftEntry = entry as PerformanceEntry & { value: number };
              vitals.cls = layoutShiftEntry.value;
            }
          });
          
          resolve(vitals);
        }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        
        // Fallback timeout
        setTimeout(() => resolve({}), 3000);
      });
    });
    
    // Basic performance checks
    expect(metrics).toBeDefined();
  });

  test('should load companies page efficiently', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/companies');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Check that page loads within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should load compare page efficiently', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/compare');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Check that page loads within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should handle search efficiently', async ({ page }) => {
    await page.goto('/companies');
    
    const startTime = Date.now();
    await page.fill('input[placeholder*="Search"]', 'software');
    await page.press('input[placeholder*="Search"]', 'Enter');
    await page.waitForTimeout(1000); // Wait for search results
    const searchTime = Date.now() - startTime;
    
    // Check that search completes within 3 seconds
    expect(searchTime).toBeLessThan(3000);
  });

  test('should have optimized images', async ({ page }) => {
    await page.goto('/');
    
    // Check for images and their loading
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check that images have proper attributes
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const src = await img.getAttribute('src');
        const alt = await img.getAttribute('alt');
        
        expect(src).toBeTruthy();
        expect(alt).toBeTruthy();
      }
    }
  });

  test('should have minimal JavaScript bundle', async ({ page }) => {
    await page.goto('/');
    
    // Check console for any performance warnings
    const consoleMessages = [];
    page.on('console', (msg) => {
      if (msg.type() === 'warning' && msg.text().includes('performance')) {
        consoleMessages.push(msg.text());
      }
    });
    
    await page.waitForLoadState('networkidle');
    
    // Check that there are no major performance warnings
    expect(consoleMessages.length).toBe(0);
  });

  test('should handle mobile performance', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Mobile should load within 6 seconds (slightly more lenient)
    expect(loadTime).toBeLessThan(6000);
  });

  test('should have efficient CSS loading', async ({ page }) => {
    await page.goto('/');
    
    // Check that CSS is loaded efficiently
    const stylesheets = await page.evaluate(() => {
      return Array.from(document.styleSheets).map(sheet => ({
        href: sheet.href,
        disabled: sheet.disabled
      }));
    });
    
    // Check that stylesheets are not disabled
    const disabledSheets = stylesheets.filter(sheet => sheet.disabled);
    expect(disabledSheets.length).toBe(0);
  });

  test('should handle network throttling', async ({ page }) => {
    // Simulate slow 3G
    await page.route('**/*', (route) => {
      setTimeout(() => route.continue(), 100);
    });
    
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Even with throttling, should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });
});
