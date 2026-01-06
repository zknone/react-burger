import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import Layout from '../layout/layout';
import { Modal } from '../modal/modal';
import { IngredientPopupDetails } from '../burger-ingredients/ingredient-popup-details/ingredient-popup-details';
import OrderDetails from '../order-details/order-details';
import App from '../../pages/app';
import { OnlyUnAuth, OnlyAuth } from '../protected-route/protected-route';
import LoginPage from '../../pages/login/login';
import FeedPage from '../../pages/feed/feed';
import ProfilePage from '../../pages/profile/profile';
import RegisterPage from '../../pages/register/register';
import IngredientPage from '../../pages/ingredient/ingredient';
import OrderPage from '../../pages/order/order';
import RestorePasswordPage from '../../pages/restore-password/restore-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

const LayoutWithLocation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as { backgroundLocation?: Location }) || {};

  return (
    <Layout>
      {state.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                title="Детали ингредиента"
                onClose={() => {
                  navigate(state.backgroundLocation?.pathname || '/');
                }}
              >
                <IngredientPopupDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:number"
            element={
              <Modal
                onClose={() => {
                  navigate(state.backgroundLocation?.pathname || '/');
                }}
              >
                <OrderDetails />
              </Modal>
            }
          />
          <Route
            path="profile/orders/:number"
            element={
              <Modal
                onClose={() => {
                  navigate(state.backgroundLocation?.pathname || '/');
                }}
              >
                <OrderDetails isPrivateOrders />
              </Modal>
            }
          />
        </Routes>
      )}

      <Routes location={state.backgroundLocation || location}>
        <Route path="/" element={<App />} />
        <Route
          path="/login"
          element={<OnlyUnAuth component={<LoginPage />} />}
        />

        <Route path="/feed" element={<OnlyAuth component={<FeedPage />} />} />
        <Route
          path="/profile"
          element={<OnlyAuth component={<ProfilePage />} />}
        >
          <Route path="orders" element={<OnlyAuth component={<></>} />} />
        </Route>
        <Route
          path="/register"
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="profile/orders/:number" element={<OrderPage />} />
        <Route path="/feed/:number" element={<OrderPage />} />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<RestorePasswordPage />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default LayoutWithLocation;
