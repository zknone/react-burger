import fetchMock from 'fetch-mock';
import { BASE_API_URL } from './authorization-api';

const user = {
  email: 'test@example.com',
  name: 'Test User',
};

const success = true;

export const mockAuthApi = () => {
  fetchMock.post(`${BASE_API_URL}/auth/login`, {
    body: {
      success,
      accessToken: 'Bearer some-access-token',
      refreshToken: 'some-refresh-token',
      user,
    },
    status: 200,
  });

  fetchMock.post(`${BASE_API_URL}/auth/register`, {
    body: {
      success,
      user,
      accessToken: 'Bearer some-access-token',
      refreshToken: 'some-refresh-token',
    },
    status: 200,
  });

  fetchMock.patch(`${BASE_API_URL}/auth/user`, {
    body: {
      success,
      user,
    },
    status: 200,
  });

  fetchMock.post(`${BASE_API_URL}/auth/logout`, {
    body: {
      success,
      message: 'Successful logout',
    },
    status: 200,
  });

  fetchMock.post(`${BASE_API_URL}/auth/token`, {
    body: {
      success,
      accessToken: 'Bearer new-access-token',
      refreshToken: 'new-refresh-token',
    },
    status: 200,
  });

  fetchMock.get(`${BASE_API_URL}/auth/user`, {
    body: {
      success,
      user,
    },
    status: 200,
  });

  fetchMock.post(`${BASE_API_URL}/password-reset/reset`, {
    body: {
      success,
      message: 'Password successfully reset',
    },
    status: 200,
  });

  fetchMock.post(`${BASE_API_URL}/password-reset`, {
    body: {
      success,
      message: 'Reset email sent',
    },
    status: 200,
  });
};
