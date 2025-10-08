import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page loads
    await expect(page).toHaveTitle(/B2B Reviews/);
    
    // Check hero section
    await expect(page.locator('h1')).toContainText('Find the Perfect');
    await expect(page.locator('h1')).toContainText('B2B Partner');
    
    // Check CTA buttons
    await expect(page.locator('a[href="/companies"]')).toBeVisible();
    await expect(page.locator('a[href="/auth/signup"]')).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await page.goto('/');
    
    // Check features section
    await expect(page.locator('h2')).toContainText('Why Choose B2B Reviews?');
    
    // Check feature cards
    const featureCards = page.locator('[data-testid="feature-card"]');
    await expect(featureCards).toHaveCount(6);
    
    // Check specific features
    await expect(page.locator('text=Verified Reviews')).toBeVisible();
    await expect(page.locator('text=AI-Powered Matching')).toBeVisible();
    await expect(page.locator('text=Smart Comparison')).toBeVisible();
  });

  test('should display stats section', async ({ page }) => {
    await page.goto('/');
    
    // Check stats section
    await expect(page.locator('text=500+')).toBeVisible();
    await expect(page.locator('text=2,500+')).toBeVisible();
    await expect(page.locator('text=50+')).toBeVisible();
    await expect(page.locator('text=98%')).toBeVisible();
  });

  test('should display how it works section', async ({ page }) => {
    await page.goto('/');
    
    // Check how it works section
    await expect(page.locator('h2')).toContainText('How It Works');
    
    // Check steps
    await expect(page.locator('text=Search & Discover')).toBeVisible();
    await expect(page.locator('text=Compare & Review')).toBeVisible();
    await expect(page.locator('text=Make Decision')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation links
    await page.click('a[href="/companies"]');
    await expect(page).toHaveURL('/companies');
    
    await page.goto('/');
    await page.click('a[href="/compare"]');
    await expect(page).toHaveURL('/compare');
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check mobile menu button
    await expect(page.locator('button[aria-label*="menu"]')).toBeVisible();
    
    // Check that content is still visible
    await expect(page.locator('h1')).toBeVisible();
  });
});
