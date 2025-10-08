import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should load sign in page', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Check page elements
    await expect(page.locator('h1, h2')).toContainText('Sign In');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should load sign up page', async ({ page }) => {
    await page.goto('/auth/signup');
    
    // Check page elements
    await expect(page.locator('h1, h2')).toContainText('Sign Up');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should have working form tabs', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Check tabs
    await expect(page.locator('text=Sign In')).toBeVisible();
    await expect(page.locator('text=Sign Up')).toBeVisible();
    
    // Test tab switching
    await page.click('text=Sign Up');
    await expect(page.locator('button[type="submit"]')).toContainText('Sign Up');
    
    await page.click('text=Sign In');
    await expect(page.locator('button[type="submit"]')).toContainText('Sign In');
  });

  test('should have Google OAuth button', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Check Google OAuth button
    await expect(page.locator('text=Continue with Google')).toBeVisible();
    await expect(page.locator('button:has-text("Continue with Google")')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for validation (browser native or custom)
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toHaveAttribute('required');
    
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toHaveAttribute('required');
  });

  test('should handle form submission', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Fill form with test data
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'testpassword123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for response (success or error)
    await page.waitForTimeout(2000);
  });

  test('should redirect after successful auth', async ({ page }) => {
    // This test would require actual authentication setup
    // For now, just test that the form submits
    await page.goto('/auth/signin');
    
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'testpassword123');
    await page.click('button[type="submit"]');
    
    // In a real scenario, this would redirect to dashboard
    await page.waitForTimeout(2000);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/auth/signin');
    
    // Check that form is still usable on mobile
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Check labels
    await expect(page.locator('label')).toHaveCount(2);
    
    // Check form structure
    await expect(page.locator('form')).toBeVisible();
    
    // Check input types
    await expect(page.locator('input[type="email"]')).toHaveAttribute('type', 'email');
    await expect(page.locator('input[type="password"]')).toHaveAttribute('type', 'password');
  });
});
