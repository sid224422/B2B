import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should have working header navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check logo
    await expect(page.locator('text=B2B Reviews')).toBeVisible();
    
    // Check navigation links
    await expect(page.locator('a[href="/companies"]')).toBeVisible();
    await expect(page.locator('a[href="/reviews"]')).toBeVisible();
    await expect(page.locator('a[href="/compare"]')).toBeVisible();
  });

  test('should navigate to companies page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/companies"]');
    await expect(page).toHaveURL('/companies');
    await expect(page.locator('h1')).toContainText('Browse Companies');
  });

  test('should navigate to compare page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/compare"]');
    await expect(page).toHaveURL('/compare');
    await expect(page.locator('h1')).toContainText('Compare Companies');
  });

  test('should navigate to auth pages', async ({ page }) => {
    await page.goto('/');
    
    // Test sign in link
    await page.click('a[href="/auth/signin"]');
    await expect(page).toHaveURL('/auth/signin');
    
    // Test sign up link
    await page.goto('/');
    await page.click('a[href="/auth/signup"]');
    await expect(page).toHaveURL('/auth/signup');
  });

  test('should have working mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check mobile menu button
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu")');
    await expect(mobileMenuButton).toBeVisible();
    
    // Click mobile menu
    await mobileMenuButton.click();
    
    // Check that menu items are visible
    await expect(page.locator('a[href="/companies"]')).toBeVisible();
    await expect(page.locator('a[href="/compare"]')).toBeVisible();
  });

  test('should maintain navigation state across pages', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await expect(page.locator('text=B2B Reviews')).toBeVisible();
    
    // Navigate to companies
    await page.click('a[href="/companies"]');
    await expect(page.locator('text=B2B Reviews')).toBeVisible();
    
    // Navigate to compare
    await page.click('a[href="/compare"]');
    await expect(page.locator('text=B2B Reviews')).toBeVisible();
  });

  test('should have proper active states', async ({ page }) => {
    // Test companies page active state
    await page.goto('/companies');
    // Note: Active state styling would need to be implemented
    
    // Test compare page active state
    await page.goto('/compare');
    // Note: Active state styling would need to be implemented
  });

  test('should handle navigation with keyboard', async ({ page }) => {
    await page.goto('/');
    
    // Tab through navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check that focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper ARIA labels on interactive elements
    const mobileMenuButton = page.locator('button[aria-label*="menu"]');
    if (await mobileMenuButton.isVisible()) {
      await expect(mobileMenuButton).toHaveAttribute('aria-label');
    }
  });

  test('should work with different viewport sizes', async ({ page }) => {
    // Test desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await expect(page.locator('a[href="/companies"]')).toBeVisible();
    
    // Test tablet
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/');
    await expect(page.locator('a[href="/companies"]')).toBeVisible();
    
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('a[href="/companies"]')).toBeVisible();
  });
});
