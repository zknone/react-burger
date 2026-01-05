import { AppDispatch } from '../../store';
import { authorizationApi } from '../api/authorization-api/authorization-api';
import { setProfile, setHasAuthStatus } from '../slices/profile/reducers';
import { profileResponseModel, tokenResponseModel } from '../../types/types';
import { toast } from 'react-toastify';
import validateDataWithZod from '../../utils/validation';

export const checkUserAuth = () => async (dispatch: AppDispatch) => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    dispatch(setHasAuthStatus(true));
    dispatch(
      setProfile({
        user: { name: '', email: '' },
        success: false,
      })
    );
    toast.error('Token not found, please log in again');
    return;
  }

  try {
    const tokenResponse = await dispatch(
      authorizationApi.endpoints.token.initiate(refreshToken)
    ).unwrap();

    validateDataWithZod(
      tokenResponseModel,
      tokenResponse,
      'Invalid token refresh response'
    );
    const tokenParseResult = tokenResponseModel.parse(tokenResponse);

    localStorage.setItem('accessToken', tokenParseResult.accessToken);
    localStorage.setItem('refreshToken', tokenParseResult.refreshToken);

    const userResponse = await dispatch(
      authorizationApi.endpoints.getUser.initiate(undefined)
    ).unwrap();

    validateDataWithZod(
      profileResponseModel,
      userResponse,
      'Invalid user profile response'
    );
    const userParseResult = profileResponseModel.parse(userResponse);

    dispatch(setProfile(userParseResult));
  } catch (error) {
    dispatch(setHasAuthStatus(false));
    toast.error('Authorization error, please sign in again');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } finally {
    dispatch(setHasAuthStatus(true));
  }
};
