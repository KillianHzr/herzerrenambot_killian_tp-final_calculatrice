import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test('L\'affichage initial doit montrer 0 sur la calculatrice', async ({ page }) => {
  await expect(page.locator('.screen')).toHaveText('0');
});

test('Cliquer sur un chiffre doit mettre à jour la calculatrice avec le chiffre cliqué', async ({ page }) => {
  await page.click('button:has-text("1")');
  await expect(page.locator('.screen')).toHaveText('1');
  await page.click('button:has-text("2")');
  await expect(page.locator('.screen')).toHaveText('12');
});

test('Cliquer sur un opérateur doit l\'ajouter sur la calculatrice après le chiffre', async ({ page }) => {
  await page.click('button:has-text("1")');
  await page.click('button:has-text("sum")');
  await expect(page.locator('.screen')).toHaveText('1 +');
});

test('Cliquer sur le bouton 0 doit entrer 0', async ({ page }) => {
  await page.click('button:has-text("0")');
  await expect(page.locator('.screen')).toHaveText('0');
});

test('Cliquer sur le bouton 1 doit entrer 1', async ({ page }) => {
  await page.click('button:has-text("1")');
  await expect(page.locator('.screen')).toHaveText('1');
});

test('Cliquer sur le bouton 2 doit entrer 2', async ({ page }) => {
  await page.click('button:has-text("2")');
  await expect(page.locator('.screen')).toHaveText('2');
});

// Ce test ne fonctionne pas car le bouton 3 renvoie 5
test('Cliquer sur le bouton 3 doit entrer 3', async ({ page }) => {
  await page.click('button:has-text("3")');
  await expect(page.locator('.screen')).toHaveText('3');
});

test('Cliquer sur le bouton 4 doit entrer 4', async ({ page }) => {
  await page.click('button:has-text("4")');
  await expect(page.locator('.screen')).toHaveText('4');
});

// Ce test ne fonctionne pas car le bouton 5 renvoie 3
test('Cliquer sur le bouton 5 doit entrer 5', async ({ page }) => {
  await page.click('button:has-text("5")');
  await expect(page.locator('.screen')).toHaveText('5');
});

test('Cliquer sur le bouton 6 doit entrer 6', async ({ page }) => {
  await page.click('button:has-text("6")');
  await expect(page.locator('.screen')).toHaveText('6');
});

test('Cliquer sur le bouton 7 doit entrer 7', async ({ page }) => {
  await page.click('button:has-text("7")');
  await expect(page.locator('.screen')).toHaveText('7');
});

test('Cliquer sur le bouton 8 doit entrer 8', async ({ page }) => {
  await page.click('button:has-text("8")');
  await expect(page.locator('.screen')).toHaveText('8');
});

test('Cliquer sur le bouton 9 doit entrer 9', async ({ page }) => {
  await page.click('button:has-text("9")');
  await expect(page.locator('.screen')).toHaveText('9');
});

// Ce test ne fonctionne pas car sum effectue une soustraction au lieu d'une addition
test('Faire une addition doit afficher le résultat correct sur la calculatrice', async ({ page }) => {
  await page.click('button:has-text("1")');
  await page.click('button:has-text("sum")');
  await page.click('button:has-text("2")');
  await page.click('.btnEqual');
  await expect(page.locator('.screen')).toHaveText('3');
});

// Ce test ne fonctionne pas car soustraction effectue une addition au lieu d'une soustraction
test('Faire une soustraction doit afficher le résultat correct sur la calculatrice', async ({ page }) => {
  await page.click('button:has-text("6")');
  await page.click('button:has-text("soustraction")');
  await page.click('button:has-text("4")');
  await page.click('.btnEqual');
  await expect(page.locator('.screen')).toHaveText('2');
});

test('Faire une multiplication doit afficher le résultat correct sur la calculatrice', async ({ page }) => {
  await page.click('button:has-text("2")');
  await page.click('button:has-text("multiplication")');
  await page.click('button:has-text("4")');
  await page.click('.btnEqual');
  await expect(page.locator('.screen')).toHaveText('8');
});

test('Faire plusieurs calculs doit mettre à jour la calculatrice avec le résultat correct après chaque opération', async ({ page }) => {
  await page.click('button:has-text("2")');
  await page.click('button:has-text("sum")');
  await page.click('button:has-text("4")');
  await page.click('.btnEqual');
  await expect(page.locator('.screen')).toHaveText('6');
  await page.click('button:has-text("multiplication")');
  await page.click('button:has-text("2")');
  await page.click('.btnEqual');
  await expect(page.locator('.screen')).toHaveText('12');
});

test('Cliquer sur le bouton C doit réinitialiser la calculatrice', async ({ page }) => {
  await page.click('button:has-text("2")');
  await page.click('button:has-text("sum")');
  await page.click('button:has-text("3")');
  await page.click('.btnReset');
  await expect(page.locator('.screen')).toHaveText('0');
});

test('Le fond du bouton = doit être rouge', async ({ page }) => {
  const buttonColor = await page.locator('.btnEqual').evaluate((button) => {
    return window.getComputedStyle(button).backgroundColor;
  });
  expect(buttonColor).toBe('rgb(255, 0, 0)');
});
