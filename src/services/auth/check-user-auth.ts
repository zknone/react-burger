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
    toast.error('Токен не найден, пожалуйста войдите заново');
    return;
  }

  try {
    const tokenResponse = await dispatch(
      authorizationApi.endpoints.token.initiate(refreshToken)
    ).unwrap();

    validateDataWithZod(
      tokenResponseModel,
      tokenResponse,
      'Невалидный ответ при обновлении токена'
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
      'Невалидный ответ профиля пользователя'
    );
    const userParseResult = profileResponseModel.parse(userResponse);

    dispatch(setProfile(userParseResult));
  } catch (error) {
    dispatch(setHasAuthStatus(false));
    toast.error('Ошибка авторизации, пожалуйста войдите снова');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } finally {
    dispatch(setHasAuthStatus(true));
  }
};
