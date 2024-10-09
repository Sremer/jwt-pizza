import { test, expect } from 'playwright-test-coverage';

test('home page', async ({ page }) => {
    await page.goto('/');

    expect(await page.title()).toBe('JWT Pizza');
});

test('buy pizza with login', async ({ page }) => {await page.goto('http://localhost:5173/');
await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
await page.getByRole('button', { name: 'Order now' }).click();
await expect(page.locator('h2')).toContainText('Awesome is a click away');
await page.getByRole('combobox').selectOption('1');
await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
await page.getByRole('link', { name: 'Image Description Margarita' }).click();
await expect(page.locator('form')).toContainText('Selected pizzas: 2');
await page.getByRole('button', { name: 'Checkout' }).click();
await page.getByPlaceholder('Email address').fill('a@gmail.com');
await page.getByPlaceholder('Email address').press('Tab');
await page.getByPlaceholder('Password').fill('a');
await page.getByPlaceholder('Password').press('Enter');
await expect(page.getByRole('main')).toContainText('{"code":404,"message":"unknown user"}');
await page.getByRole('main').getByText('Register').click();
await page.getByPlaceholder('Full name').fill('s');
await page.getByPlaceholder('Email address').click();
await page.getByPlaceholder('Email address').fill('s@gmail.com');
await page.getByPlaceholder('Email address').press('Tab');
await page.getByPlaceholder('Password').fill('a');
await page.getByRole('button', { name: 'Register' }).click();
await expect(page.locator('tfoot')).toContainText('2 pies');
await page.getByRole('button', { name: 'Pay now' }).click();
`await expect(page.getByRole('main')).toContainText('0.005 ₿');`});