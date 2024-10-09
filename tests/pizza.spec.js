import { test, expect } from 'playwright-test-coverage';

test('home page', async ({ page }) => {
    await page.goto('/');

    expect(await page.title()).toBe('JWT Pizza');
});

test('purchase with login', async ({ page }) => {
    await page.route('*/**/api/order/menu', async (route) => {
      const menuRes = [
        { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
        { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
      ];
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: menuRes });
    });
  
    await page.route('*/**/api/franchise', async (route) => {
      const franchiseRes = [
        {
          id: 2,
          name: 'LotaPizza',
          stores: [
            { id: 4, name: 'Lehi' },
            { id: 5, name: 'Springville' },
            { id: 6, name: 'American Fork' },
          ],
        },
        { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
        { id: 4, name: 'topSpot', stores: [] },
      ];
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: franchiseRes });
    });
  
    await page.route('*/**/api/auth', async (route) => {
      const loginReq = { email: 'd@jwt.com', password: 'a' };
      const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
      expect(route.request().method()).toBe('PUT');
      expect(route.request().postDataJSON()).toMatchObject(loginReq);
      await route.fulfill({ json: loginRes });
    });
  
    await page.route('*/**/api/order', async (route) => {
      const orderReq = {
        items: [
          { menuId: 1, description: 'Veggie', price: 0.0038 },
          { menuId: 2, description: 'Pepperoni', price: 0.0042 },
        ],
        storeId: '4',
        franchiseId: 2,
      };
      const orderRes = {
        order: {
          items: [
            { menuId: 1, description: 'Veggie', price: 0.0038 },
            { menuId: 2, description: 'Pepperoni', price: 0.0042 },
          ],
          storeId: '4',
          franchiseId: 2,
          id: 23,
        },
        jwt: 'eyJpYXQ',
      };
      expect(route.request().method()).toBe('POST');
      expect(route.request().postDataJSON()).toMatchObject(orderReq);
      await route.fulfill({ json: orderRes });
    });
  
    await page.goto('/');
  
    // Go to order page
    await page.getByRole('button', { name: 'Order now' }).click();
  
    // Create order
    await expect(page.locator('h2')).toContainText('Awesome is a click away');
    await page.getByRole('combobox').selectOption('4');
    await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
    await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
    await expect(page.locator('form')).toContainText('Selected pizzas: 2');
    await page.getByRole('button', { name: 'Checkout' }).click();
  
    // Login
    await page.getByPlaceholder('Email address').click();
    await page.getByPlaceholder('Email address').fill('d@jwt.com');
    await page.getByPlaceholder('Email address').press('Tab');
    await page.getByPlaceholder('Password').fill('a');
    await page.getByRole('button', { name: 'Login' }).click();
  
    // Pay
    await expect(page.getByRole('main')).toContainText('Send me those 2 pizzas right now!');
    await expect(page.locator('tbody')).toContainText('Veggie');
    await expect(page.locator('tbody')).toContainText('Pepperoni');
    await expect(page.locator('tfoot')).toContainText('0.008 ₿');
    await page.getByRole('button', { name: 'Pay now' }).click();
  
    // Check balance
    await expect(page.getByText('0.008')).toBeVisible();
  });

  test('register', async ({ page }) => {await page.goto('/');
  await page.getByRole('link', { name: 'Register' }).click();
  await expect(page.getByRole('heading')).toContainText('Welcome to the party');
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  await page.getByPlaceholder('Full name').click();
  await page.getByPlaceholder('Full name').fill('c');
  await page.getByPlaceholder('Full name').press('Tab');
  await page.getByPlaceholder('Email address').fill('c@gmail.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('c');
  await page.getByRole('button', { name: 'Register' }).click();});

test('order appears in user account', async ({ page }) => {

    
await page.goto('/');
await page.getByRole('button', { name: 'Order now' }).click();
await page.getByRole('link', { name: 'Image Description asbvjjyczf' }).click();
await page.getByRole('link', { name: 'Image Description bzyb1i27xd' }).click();
await page.getByRole('link', { name: 'Image Description 577py3hpxt' }).click();
await page.getByRole('combobox').selectOption('13');
await page.getByRole('button', { name: 'Checkout' }).click();
await page.getByPlaceholder('Email address').fill('d@gmail.com');
await page.getByPlaceholder('Email address').press('Tab');
await page.getByPlaceholder('Password').fill('d');
await page.getByPlaceholder('Password').press('Enter');
await page.getByRole('button', { name: 'Pay now' }).click();
await page.getByRole('link', { name: 'd', exact: true }).click();
await expect(page.locator('tbody')).toContainText('3 ₿');});

test('user logs out', async ({ page }) => {await page.goto('/'); await page.getByRole('link', { name: 'Login' }).click();
await page.getByPlaceholder('Email address').fill('c@gmail.com');
await page.getByPlaceholder('Email address').press('Tab');
await page.getByPlaceholder('Password').fill('c');
await page.getByRole('button', { name: 'Login' }).click();
await page.getByRole('link', { name: 'Logout' }).click();
await expect(page.locator('#navbar-dark')).toContainText('Login');});

test('admin logs in', async ({ page }) => {await page.goto('/'); await page.getByRole('link', { name: 'Login' }).click();
await page.getByPlaceholder('Email address').fill('a@jwt.com');
await page.getByPlaceholder('Password').click();
await page.getByPlaceholder('Password').fill('admin');
await page.getByPlaceholder('Password').press('Enter');
await expect(page.locator('#navbar-dark')).toContainText('Admin');
await page.getByRole('link', { name: 'Admin' }).click();
await expect(page.getByRole('main')).toContainText('Keep the dough rolling and the franchises signing up.');
await expect(page.getByRole('button', { name: 'Add Franchise' })).toBeVisible();
await page.getByRole('button', { name: 'Add Franchise' }).click();
await page.getByPlaceholder('franchise name').click();
await page.getByPlaceholder('franchise name').fill('test');
await page.getByPlaceholder('franchise name').press('Tab');
await page.getByPlaceholder('franchisee admin email').fill('test@jwt.com');
await page.getByRole('button', { name: 'Create' }).click();
await expect(page.getByRole('heading')).toContainText('Create franchise');});

test('franchisee adds a store', async ({ page }) => {await page.goto('/'); await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
await page.getByRole('link', { name: 'login', exact: true }).click();
await page.getByPlaceholder('Email address').fill('e@jwt.com');
await page.getByPlaceholder('Password').click();
await page.getByPlaceholder('Password').fill('e');
await page.getByRole('button', { name: 'Login' }).click();
await expect(page.getByRole('heading')).toContainText('e'); await page.getByRole('button', { name: 'Create store' }).click();
await page.getByPlaceholder('store name').click();
await page.getByPlaceholder('store name').fill('test');
await page.getByRole('button', { name: 'Create' }).click();
await expect(page.locator('tbody')).toContainText('test');
await expect(page.locator('tbody')).toContainText('0 ₿');
await page.getByRole('button', { name: 'Close' }).click();
await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
await page.getByRole('button', { name: 'Close' }).click();});