import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test('The initial display should show 0', async ({ page }) => {
  await expect(page.locator('.screen')).toHaveText('0');
});

test('Clicking a number should update the current value on the screen', async ({ page }) => {
  await page.click('button:has-text("1")');
  await expect(page.locator('.screen')).toHaveText('1');
  await page.click('button:has-text("2")');
  await expect(page.locator('.screen')).toHaveText('12');
});

test('Clicking an operator should show the operator on the screen', async ({ page }) => {
  await page.click('button:has-text("1")');
  await page.click('button:has-text("sum")');
  await expect(page.locator('.screen')).toHaveText('1 +');
});

test('Performing an operation should update the screen with the result', async ({ page }) => {
  await page.click('button:has-text("1")');
  await page.click('button:has-text("sum")');
  await page.click('button:has-text("2")');
  await page.click('.btnEqual');
  await expect(page.locator('.screen')).toHaveText('3');
});

test('Clicking the number 5 should input 3, and clicking 3 should input 5', async ({ page }) => {
  await page.click('button:has-text("5")');
  await expect(page.locator('.screen')).toHaveText('3');
  await page.click('button:has-text("3")');
  await expect(page.locator('.screen')).toHaveText('35');
});

test('Performing a soustraction should display the correct result', async ({ page }) => {
  await page.click('button:has-text("5")');
  await page.click('button:has-text("soustraction")');
  await page.click('button:has-text("3")');
  await page.click('.btnEqual');
  await expect(page.locator('.screen')).toHaveText('8');
});

test('Performing a multiplication should display the correct result', async ({ page }) => {
  await page.click('button:has-text("2")');
  await page.click('button:has-text("multiplication")');
  await page.click('button:has-text("3")');
  await page.click('.btnEqual');
  await expect(page.locator('.screen')).toHaveText('6');
});

test('Multiple operations should update the screen correctly', async ({ page }) => {
  await page.click('button:has-text("2")');
  await page.click('button:has-text("sum")');
  await page.click('button:has-text("3")');
  await page.click('.btnEqual');
  await expect(page.locator('.screen')).toHaveText('5');
  await page.click('button:has-text("multiplication")');
  await page.click('button:has-text("2")');
  await page.click('.btnEqual');
  await expect(page.locator('.screen')).toHaveText('10');
});

test('The screen should show the updated value after performing an operation', async ({ page }) => {
  await page.click('button:has-text("2")');
  await page.click('button:has-text("sum")');
  await page.click('button:has-text("3")');
  await page.click('.btnEqual');
  await expect(page.locator('.screen')).toHaveText('5');
  await page.click('button:has-text("4")');
  await expect(page.locator('.screen')).toHaveText('4');
});

test('The screen should clear the operation after equal is clicked', async ({ page }) => {
  await page.click('button:has-text("2")');
  await page.click('button:has-text("sum")');
  await page.click('button:has-text("3")');
  await page.click('.btnEqual');
  await expect(page.locator('.screen')).toHaveText('5');
  await page.click('button:has-text("2")');
  await expect(page.locator('.screen')).toHaveText('2');
});

test('Each number button should display the correct digit on the screen', async ({ page }) => {
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  for (const num of numbers) {
    await page.click(`button:has-text("${num}")`);
    await expect(page.locator('.screen')).toHaveText(num);
    await page.click('button:has-text("C")');
  }
});
