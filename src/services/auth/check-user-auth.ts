import { AppDispatch } from '../../store';
import { authorizationApi } from '../api/authorization-api/authorization-api';
import { getProfile, setIsAuthChecked } from '../slices/profile/reducers';

export const checkUserAuth = () => async (dispatch: AppDispatch) => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    dispatch(setIsAuthChecked(true));
    dispatch(
      getProfile({
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

    localStorage.setItem('accessToken', tokenResponse.accessToken);
    localStorage.setItem('refreshToken', tokenResponse.refreshToken);

    const userResponse = await dispatch(
      authorizationApi.endpoints.getUser.initiate(undefined)
    ).unwrap();

    dispatch(getProfile(userResponse));
  } catch (error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } finally {
    dispatch(setIsAuthChecked(true));
  }
};
