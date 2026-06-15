import { expect, test } from '@playwright/test';

test('slides beads across wires and resets the abacus', async ({ page }) => {
  await page.goto('/');

  const readout = page.locator('output[aria-live="polite"]');
  await expect(readout).toContainText('0');

  await page.locator('[data-wire-index="0"] [data-bead-index="2"]').click();
  await expect(readout).toContainText('3');

  await page.locator('[data-wire-index="1"] [data-bead-index="3"]').click();
  await expect(readout).toContainText('43');

  await page.locator('[data-wire-index="2"] [data-bead-index="1"]').hover();
  await page.mouse.down();
  await expect(readout).toContainText('243');

  await page.locator('[data-wire-index="2"] [data-bead-index="4"]').hover();
  await page.mouse.up();
  await expect(readout).toContainText('543');

  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(readout).toContainText('0');
});
