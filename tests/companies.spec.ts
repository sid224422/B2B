import { test, expect } from '@playwright/test';

test.describe('Companies Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/companies');
  });

  test('should display company cards', async ({ page }) => {
    // Wait for the page to load
    await page.waitForSelector('[data-testid="company-card"]', { timeout: 10000 });
    
    // Check that company cards are displayed
    const companyCards = await page.locator('[data-testid="company-card"]');
    await expect(await companyCards.count()).toBeGreaterThan(0);
  });

  test('should filter companies by rating', async ({ page }) => {
    // Open the rating filter
    await page.click('[data-testid="rating-filter"]');
    
    // Set minimum rating to 4 stars
    await page.fill('[data-testid="rating-min"]', '4');
    
    // Apply filter
    await page.click('[data-testid="apply-filters"]');
    
    // Wait for results to update
    await page.waitForTimeout(1000);
    
    // Check that all visible companies have rating >= 4
    const ratings = await page.locator('[data-testid="company-rating"]').allTextContents();
    for (const rating of ratings) {
      const ratingValue = parseFloat(rating);
      expect(ratingValue).toBeGreaterThanOrEqual(4);
    }
  });

  test('should search for companies', async ({ page }) => {
    // Type in search box
    await page.fill('[data-testid="search-input"]', 'TechCorp');
    
    // Press Enter to search
    await page.press('[data-testid="search-input"]', 'Enter');
    
    // Wait for results to update
    await page.waitForTimeout(1000);
    
    // Check that search results contain the search term
    const companyNames = await page.locator('[data-testid="company-name"]').allTextContents();
    const hasSearchResult = companyNames.some(name => 
      name.toLowerCase().includes('techcorp')
    );
    expect(hasSearchResult).toBeTruthy();
  });

  test('should add company to compare', async ({ page }) => {
    // Click add to compare button on first company card
    await page.click('[data-testid="company-card"]:first-child [data-testid="add-to-compare"]');
    
    // Check that compare bar appears
    await expect(page.locator('[data-testid="compare-bar"]')).toBeVisible();
    
    // Check that company is added to compare
    await expect(page.locator('[data-testid="compare-item"]')).toHaveCount(1);
  });

  test('should navigate to company detail page', async ({ page }) => {
    // Click on first company card
    await page.click('[data-testid="company-card"]:first-child');
    
    // Check that we're on company detail page
    await expect(page).toHaveURL(/\/companies\/[^\/]+/);
    
    // Check that company details are displayed
    await expect(page.locator('[data-testid="company-hero"]')).toBeVisible();
  });
});

test.describe('Company Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/companies/techcorp-solutions');
  });

  test('should display company information', async ({ page }) => {
    // Check that company hero is displayed
    await expect(page.locator('[data-testid="company-hero"]')).toBeVisible();
    
    // Check that company name is displayed
    await expect(page.locator('[data-testid="company-name"]')).toContainText('TechCorp Solutions');
    
    // Check that rating is displayed
    await expect(page.locator('[data-testid="company-rating"]')).toBeVisible();
  });

  test('should display reviews tab', async ({ page }) => {
    // Click on reviews tab
    await page.click('[data-testid="reviews-tab"]');
    
    // Check that reviews are displayed
    await expect(page.locator('[data-testid="reviews-list"]')).toBeVisible();
  });

  test('should display case studies tab', async ({ page }) => {
    // Click on case studies tab
    await page.click('[data-testid="case-studies-tab"]');
    
    // Check that case studies are displayed
    await expect(page.locator('[data-testid="case-studies-list"]')).toBeVisible();
  });
});

test.describe('Compare Page', () => {
  test.beforeEach(async ({ page }) => {
    // Add companies to compare first
    await page.goto('/companies');
    await page.click('[data-testid="company-card"]:first-child [data-testid="add-to-compare"]');
    await page.click('[data-testid="company-card"]:nth-child(2) [data-testid="add-to-compare"]');
    
    // Navigate to compare page
    await page.click('[data-testid="compare-button"]');
  });

  test('should display comparison table', async ({ page }) => {
    // Check that compare table is displayed
    await expect(page.locator('[data-testid="compare-table"]')).toBeVisible();
    
    // Check that both companies are in the comparison
    await expect(page.locator('[data-testid="compare-company"]')).toHaveCount(2);
  });

  test('should remove company from comparison', async ({ page }) => {
    // Click remove button on first company
    await page.click('[data-testid="compare-company"]:first-child [data-testid="remove-company"]');
    
    // Check that company is removed
    await expect(page.locator('[data-testid="compare-company"]')).toHaveCount(1);
  });
});