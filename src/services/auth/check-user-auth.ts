import { AppDispatch } from '../../store';
import { authorizationApi } from '../api/authorization-api/authorization-api';
import { setProfile, setIsAuthChecked } from '../slices/profile/reducers';
import { profileResponseModel, tokenResponseModel } from '../../types/types';
import { toast } from 'react-toastify';

export const checkUserAuth = () => async (dispatch: AppDispatch) => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    dispatch(setIsAuthChecked(true));
    dispatch(
      setProfile({
        user: { name: '', email: '' },
        success: false,
      })
    );
    toast.error('Токен не найден, пожалуйста войдите заново');
    return;
  }

  try {
    const tokenResponse = await dispatch(
      authorizationApi.endpoints.token.initiate(refreshToken)
    ).unwrap();

    const tokenParseResult = tokenResponseModel.safeParse(tokenResponse);
    if (!tokenParseResult.success) {
      toast.error('Невалидный ответ при обновлении токена');
      throw new Error('Invalid token response');
    }

    localStorage.setItem('accessToken', tokenParseResult.data.accessToken);
    localStorage.setItem('refreshToken', tokenParseResult.data.refreshToken);

    const userResponse = await dispatch(
      authorizationApi.endpoints.getUser.initiate(undefined)
    ).unwrap();

    const userParseResult = profileResponseModel.safeParse(userResponse);
    if (!userParseResult.success) {
      toast.error('Невалидный ответ профиля пользователя');
      throw new Error('Invalid user profile response');
    }

    dispatch(setProfile(userParseResult.data));
  } catch (error) {
    toast.error('Ошибка авторизации, пожалуйста войдите снова');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } finally {
    dispatch(setIsAuthChecked(true));
  }
};
