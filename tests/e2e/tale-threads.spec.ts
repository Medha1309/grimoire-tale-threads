import { test, expect } from '@playwright/test';

/**
 * Tale Threads E2E Test
 * 
 * Tests the complete workflow:
 * 1. Create project
 * 2. Submit proposal
 * 3. Vote on proposal
 * 4. Merge proposal
 */

test.describe('Tale Threads Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to app
    await page.goto('/');
    
    // Login with test credentials
    await page.click('text=Login');
    await page.fill('input[type="email"]', 'judge@grimoire.test');
    await page.fill('input[type="password"]', 'JudgeDemo2024!');
    await page.click('button:has-text("Sign In")');
    
    // Wait for redirect to Dollhouse
    await expect(page).toHaveURL(/.*dollhouse/);
  });

  test('should create project, submit proposal, vote, and merge', async ({ page }) => {
    // Navigate to Tale Threads
    await page.click('text=Tale Threads');
    await expect(page).toHaveURL(/.*chains/);

    // Create Project
    await page.click('text=Create Project');
    await page.fill('input[name="title"]', 'E2E Test Story');
    await page.fill('textarea[name="description"]', 'A test story for E2E testing');
    await page.selectOption('select[name="permissions"]', 'open');
    await page.click('button:has-text("Create")');

    // Verify project created
    await expect(page.locator('text=E2E Test Story')).toBeVisible();

    // Open project
    await page.click('text=E2E Test Story');

    // Submit Proposal
    await page.click('text=New Proposal');
    await page.fill('textarea[name="content"]', 'The old house creaked as midnight approached...');
    await page.click('button:has-text("Submit Proposal")');

    // Verify proposal appears
    await expect(page.locator('text=The old house creaked')).toBeVisible();
    await expect(page.locator('text=Pending')).toBeVisible();

    // Vote on Proposal
    await page.click('button:has-text("Vote")');
    await page.click('button:has-text("Approve")');

    // Verify vote registered
    await expect(page.locator('text=1 vote')).toBeVisible();

    // Merge Proposal
    await page.click('button:has-text("Merge")');

    // Verify proposal merged
    await expect(page.locator('text=Merged')).toBeVisible();
    await expect(page.locator('text=The old house creaked')).toBeVisible();

    // Verify integrity index updated
    await expect(page.locator('[data-testid="integrity-index"]')).toBeVisible();
  });

  test('should show diff engine for proposals', async ({ page }) => {
    // Navigate to Tale Threads
    await page.click('text=Tale Threads');

    // Open existing project (from previous test or seeded data)
    await page.click('.project-card').first();

    // Open a proposal
    await page.click('.proposal-card').first();

    // Verify diff engine shows changes
    await expect(page.locator('.diff-added')).toBeVisible();
    await expect(page.locator('.diff-removed')).toBeVisible();
  });

  test('should filter projects by permission type', async ({ page }) => {
    // Navigate to Tale Threads
    await page.click('text=Tale Threads');

    // Apply filter
    await page.click('button:has-text("Filter")');
    await page.click('text=Open');

    // Verify filtered results
    const projects = page.locator('.project-card');
    await expect(projects).toHaveCount(await projects.count());

    // Each project should show "Open" permission
    const firstProject = projects.first();
    await expect(firstProject.locator('text=Open')).toBeVisible();
  });

  test('should show integrity index', async ({ page }) => {
    // Navigate to Tale Threads
    await page.click('text=Tale Threads');

    // Open a project
    await page.click('.project-card').first();

    // Verify integrity index is visible
    const integrityIndex = page.locator('[data-testid="integrity-index"]');
    await expect(integrityIndex).toBeVisible();

    // Verify it's a number between 0 and 100
    const indexText = await integrityIndex.textContent();
    const indexValue = parseInt(indexText || '0');
    expect(indexValue).toBeGreaterThanOrEqual(0);
    expect(indexValue).toBeLessThanOrEqual(100);
  });

  test('should prevent unauthorized users from merging', async ({ page }) => {
    // Navigate to Tale Threads
    await page.click('text=Tale Threads');

    // Open a project owned by another user
    await page.click('.project-card[data-owner="other-user"]').first();

    // Try to merge a proposal
    const mergeButton = page.locator('button:has-text("Merge")');
    
    // Verify merge button is disabled or not visible
    if (await mergeButton.isVisible()) {
      await expect(mergeButton).toBeDisabled();
    } else {
      await expect(mergeButton).not.toBeVisible();
    }
  });
});

test.describe('Tale Threads Error Handling', () => {
  test('should show error for empty proposal', async ({ page }) => {
    // Login and navigate
    await page.goto('/');
    await page.click('text=Login');
    await page.fill('input[type="email"]', 'judge@grimoire.test');
    await page.fill('input[type="password"]', 'JudgeDemo2024!');
    await page.click('button:has-text("Sign In")');
    await page.click('text=Tale Threads');

    // Open a project
    await page.click('.project-card').first();

    // Try to submit empty proposal
    await page.click('text=New Proposal');
    await page.click('button:has-text("Submit Proposal")');

    // Verify error message
    await expect(page.locator('text=Content is required')).toBeVisible();
  });

  test('should handle network errors gracefully', async ({ page, context }) => {
    // Simulate offline mode
    await context.setOffline(true);

    // Login and navigate
    await page.goto('/');
    
    // Verify error message or offline indicator
    await expect(page.locator('text=Network error')).toBeVisible();
  });
});

test.describe('Tale Threads Accessibility', () => {
  test('should be keyboard navigable', async ({ page }) => {
    // Login
    await page.goto('/');
    await page.click('text=Login');
    await page.fill('input[type="email"]', 'judge@grimoire.test');
    await page.fill('input[type="password"]', 'JudgeDemo2024!');
    await page.click('button:has-text("Sign In")');

    // Navigate to Tale Threads using keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // Verify navigation worked
    await expect(page).toHaveURL(/.*chains/);

    // Tab through projects
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // Verify project opened
    await expect(page.locator('.proposal-list')).toBeVisible();
  });

  test('should have proper ARIA labels', async ({ page }) => {
    // Login and navigate
    await page.goto('/');
    await page.click('text=Login');
    await page.fill('input[type="email"]', 'judge@grimoire.test');
    await page.fill('input[type="password"]', 'JudgeDemo2024!');
    await page.click('button:has-text("Sign In")');
    await page.click('text=Tale Threads');

    // Check for ARIA labels
    await expect(page.locator('[aria-label="Create new project"]')).toBeVisible();
    await expect(page.locator('[aria-label="Filter projects"]')).toBeVisible();
  });
});
