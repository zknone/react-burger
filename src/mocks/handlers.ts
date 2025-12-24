import { http, HttpResponse } from 'msw';
import { mockIngredients } from './data';
import { createPendingOrder } from './mock-order-utils';

const BASE_API_URL = '*/api';

export const handlers = [
  http.get(/\/api\/ingredients$/, () => {
    console.log('🍔 MSW: INTERCEPTED SUCCESSFULLY!');
    return HttpResponse.json({ success: true, data: mockIngredients });
  }),
  http.post(`${BASE_API_URL}/orders`, async ({ request }) => {
    const body = await request.json().catch(() => ({}));
    const order = createPendingOrder(body);
    return HttpResponse.json({
      success: true,
      name: order.name,
      order: { number: order.number },
    });
  }),
  http.post(`${BASE_API_URL}/auth/login`, () => {
    return HttpResponse.json({
      success: true,
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user: { email: 'test@test.com', name: 'Test User' },
    });
  }),
  http.post(`${BASE_API_URL}/auth/register`, () => {
    return HttpResponse.json({
      success: true,
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      user: { email: 'test@test.com', name: 'Test User' },
    });
  }),
  http.get(`${BASE_API_URL}/auth/user`, () => {
    return HttpResponse.json({
      success: true,
      user: { email: 'test@test.com', name: 'Test User' },
    });
  }),
  http.post(`${BASE_API_URL}/auth/logout`, () => {
    return HttpResponse.json({ success: true, message: 'Successful logout' });
  }),
  http.post(`${BASE_API_URL}/auth/token`, () => {
    return HttpResponse.json({
      success: true,
      accessToken: 'new-mock-access-token',
      refreshToken: 'new-mock-refresh-token',
    });
  }),
  http.post(`${BASE_API_URL}/password-reset/reset`, () => {
    return HttpResponse.json({
      success: true,
      message: 'Password successfully reset',
    });
  }),
  http.post(`${BASE_API_URL}/password-reset`, () => {
    return HttpResponse.json({ success: true, message: 'Reset email sent' });
  }),
];
