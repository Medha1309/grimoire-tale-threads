import { test, expect } from '@playwright/test';

test.describe('About Page Navigation Links', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to about page
    await page.goto('/about');
    // Wait for typewriter to complete or skip it
    await page.waitForTimeout(1000);
    const skipButton = page.getByRole('button', { name: /skip/i });
    if (await skipButton.isVisible()) {
      await skipButton.click();
    }
    // Wait for polaroids to appear
    await page.waitForTimeout(500);
  });

  test('Library polaroid navigates to /stories', async ({ page }) => {
    // Click the Library polaroid
    await page.locator('[data-polaroid="library"]').click();
    await expect(page).toHaveURL('/stories');
  });

  test('Tea Room polaroid navigates to /forum', async ({ page }) => {
    // Click the Tea Room polaroid
    await page.locator('[data-polaroid="tearoom"]').click();
    // Forum requires auth, so we should be redirected to login
    await expect(page).toHaveURL(/\/(forum|login)/);
  });

  test('Boudoir polaroid navigates to /diary', async ({ page }) => {
    // Click the Boudoir polaroid
    await page.locator('[data-polaroid="boudoir"]').click();
    // Diary requires auth, so we should be redirected to login
    await expect(page).toHaveURL(/\/(diary|login)/);
  });

  test('Tale Threads polaroid navigates to /chains', async ({ page }) => {
    // Click the Tale Threads polaroid
    await page.locator('[data-polaroid="chains"]').click();
    // Chains requires auth, so we should be redirected to login
    await expect(page).toHaveURL(/\/(chains|login)/);
  });

  test('All navigation polaroids are clickable', async ({ page }) => {
    const polaroids = [
      { id: 'library', hasRoute: true },
      { id: 'tearoom', hasRoute: true },
      { id: 'boudoir', hasRoute: true },
      { id: 'chains', hasRoute: true },
      { id: 'tech-react', hasRoute: false },
      { id: 'tech-firebase', hasRoute: false },
      { id: 'tech-framer', hasRoute: false },
      { id: 'tech-typescript', hasRoute: false },
      { id: 'filter', hasRoute: false },
    ];

    for (const polaroid of polaroids) {
      const element = page.locator(`[data-polaroid="${polaroid.id}"]`);
      if (polaroid.hasRoute) {
        await expect(element).toBeVisible();
        await expect(element).toHaveAttribute('style', /cursor-pointer/);
      }
    }
  });
});
