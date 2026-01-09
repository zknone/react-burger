import { describe, jest } from '@jest/globals';
import type {
  ForgotResetPasswordLogoutResponseType,
  LoginResponse,
  ProfileResponse,
  RegisterAuthorizationResponse,
  TokenResponse,
} from '../../../types/types';
import {
  testError,
  testFallback,
  testParsedResponse,
} from '../../../utils/testing';
import {
  emptyLoginResponse,
  emptyLogoutResponse,
  emptyProfileResponse,
  emptyRegisterResponse,
  emptyTokenResponse,
  transformChangeProfileResponse,
  transformGetUserResponse,
  transformLoginResponse,
  transformLogoutResponse,
  transformRegisterResponse,
  transformResetPasswordResponse,
  transformRestorePasswordResponse,
  transformTokenResponse,
} from './authorisation-api';

jest.mock('../../../utils/validation', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../utils/logger', () => ({
  logError: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('authorization api login transform', () => {
  const validResponse: LoginResponse = {
    success: true,
    accessToken: 'access',
    refreshToken: 'refresh',
    user: { email: 'test@example.com', name: 'Test User' },
  };

  testParsedResponse(
    'returns parsed response when validation succeeds',
    validResponse,
    transformLoginResponse
  );

  testFallback(
    'returns fallback when validation returns null',
    validResponse,
    emptyLoginResponse,
    transformLoginResponse
  );

  testError(
    'logs error and returns fallback when validation throws',
    validResponse,
    emptyLoginResponse,
    transformLoginResponse,
    'Invalid login data received from server'
  );
});

describe('authorization api register transform', () => {
  const validRegisterResponse: RegisterAuthorizationResponse = {
    success: true,
    accessToken: 'access',
    refreshToken: 'refresh',
    user: { email: 'test@example.com', name: 'Test User' },
  };

  testParsedResponse(
    'returns parsed response when validation succeeds',
    validRegisterResponse,
    transformRegisterResponse
  );

  testFallback(
    'returns fallback when validation returns null',
    validRegisterResponse,
    emptyRegisterResponse,
    transformRegisterResponse
  );

  testError(
    'logs error and returns fallback when validation throws',
    validRegisterResponse,
    emptyRegisterResponse,
    transformRegisterResponse,
    'Invalid registration data received from server'
  );
});

describe('authorization api profile transform', () => {
  const validProfileResponse: ProfileResponse = {
    success: true,
    user: { email: 'test@example.com', name: 'Test User' },
  };

  testParsedResponse(
    'returns parsed response when validation succeeds',
    validProfileResponse,
    transformChangeProfileResponse
  );

  testFallback(
    'returns fallback when validation returns null',
    validProfileResponse,
    emptyProfileResponse,
    transformChangeProfileResponse
  );

  testError(
    'logs error and returns fallback when validation throws',
    validProfileResponse,
    emptyProfileResponse,
    transformChangeProfileResponse,
    'Invalid change profile data received from server'
  );
});

describe('authorization api get user transform', () => {
  const validProfileResponse: ProfileResponse = {
    success: true,
    user: { email: 'test@example.com', name: 'Test User' },
  };

  testParsedResponse(
    'returns parsed response when validation succeeds',
    validProfileResponse,
    transformGetUserResponse
  );

  testFallback(
    'returns fallback when validation returns null',
    validProfileResponse,
    emptyProfileResponse,
    transformGetUserResponse
  );

  testError(
    'logs error and returns fallback when validation throws',
    validProfileResponse,
    emptyProfileResponse,
    transformGetUserResponse,
    'Invalid profile data received from server'
  );
});

describe('authorization api logout transform', () => {
  const validLogoutResponse: ForgotResetPasswordLogoutResponseType = {
    success: true,
    message: 'ok',
  };

  testParsedResponse(
    'returns parsed response when validation succeeds',
    validLogoutResponse,
    transformLogoutResponse
  );

  testFallback(
    'returns fallback when validation returns null',
    validLogoutResponse,
    emptyLogoutResponse,
    transformLogoutResponse
  );

  testError(
    'logs error and returns fallback when validation throws',
    validLogoutResponse,
    emptyLogoutResponse,
    transformLogoutResponse,
    'Invalid logout data received from server'
  );
});

describe('authorization api token transform', () => {
  const validTokenResponse: TokenResponse = {
    success: true,
    accessToken: 'access',
    refreshToken: 'refresh',
  };

  testParsedResponse(
    'returns parsed response when validation succeeds',
    validTokenResponse,
    transformTokenResponse
  );

  testFallback(
    'returns fallback when validation returns null',
    validTokenResponse,
    emptyTokenResponse,
    transformTokenResponse
  );

  testError(
    'logs error and returns fallback when validation throws',
    validTokenResponse,
    emptyTokenResponse,
    transformTokenResponse,
    'Invalid token data received from server'
  );
});

describe('authorization api reset password transform', () => {
  const validResetResponse: ForgotResetPasswordLogoutResponseType = {
    success: true,
    message: 'reset',
  };

  testParsedResponse(
    'returns parsed response when validation succeeds',
    validResetResponse,
    transformResetPasswordResponse
  );

  testFallback(
    'returns fallback when validation returns null',
    validResetResponse,
    emptyLogoutResponse,
    transformResetPasswordResponse
  );

  testError(
    'logs error and returns fallback when validation throws',
    validResetResponse,
    emptyLogoutResponse,
    transformResetPasswordResponse,
    'Invalid reset password data received from server'
  );
});

describe('authorization api restore password transform', () => {
  const validRestoreResponse: ForgotResetPasswordLogoutResponseType = {
    success: true,
    message: 'restored',
  };

  testParsedResponse(
    'returns parsed response when validation succeeds',
    validRestoreResponse,
    transformRestorePasswordResponse
  );

  testFallback(
    'returns fallback when validation returns null',
    validRestoreResponse,
    emptyLogoutResponse,
    transformRestorePasswordResponse
  );

  testError(
    'logs error and returns fallback when validation throws',
    validRestoreResponse,
    emptyLogoutResponse,
    transformRestorePasswordResponse,
    'Invalid restore password data received from server'
  );
});
