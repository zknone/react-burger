import { AppDispatch } from '../../store';
import { authorizationApi } from '../api/authorization-api/authorization-api';
import { setProfile, setHasAuthStatus } from '../slices/profile/reducers';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../../consts/error-messages';
import { logError } from '../../utils/logger';
import { clearTokens, getRefreshToken, setTokens } from '../../utils/tokens';

export const checkUserAuth = () => async (dispatch: AppDispatch) => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    dispatch(setHasAuthStatus(true));
    dispatch(
      setProfile({
        user: { name: '', email: '' },
        success: false,
      })
    );
    return;
  }

  try {
    const tokenResponse = await dispatch(
      authorizationApi.endpoints.token.initiate(refreshToken)
    ).unwrap();

    if (!tokenResponse?.success) {
      throw new Error('Invalid token refresh response');
    }

    setTokens(tokenResponse.accessToken, tokenResponse.refreshToken);

    const userResponse = await dispatch(
      authorizationApi.endpoints.getUser.initiate(undefined)
    ).unwrap();

    if (!userResponse?.success) {
      throw new Error('Invalid user profile response');
    }

    dispatch(setProfile(userResponse));
  } catch (error) {
    dispatch(setHasAuthStatus(false));
    toast.error(ERROR_MESSAGES.authError);
    logError('auth/check-user-auth', error);
    clearTokens();
  } finally {
    dispatch(setHasAuthStatus(true));
  }
};
