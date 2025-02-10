import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/app';
import './index.css';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/login';
import Layout from './components/layout/layout';
import RegisterPage from './pages/register/register';
import RestorePasswordPage from './pages/restore-password/restore-password';
import ProfilePage from './pages/profile/profile';
import IngredientPage from './pages/ingredient/ingredient';
import { checkUserAuth } from './services/auth/check-user-auth';
import {
  OnlyAuth,
  OnlyUnAuth,
} from './components/protected-route/protected-route';

const Root = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/login"
            element={<OnlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path="/profile"
            element={<OnlyAuth component={<ProfilePage />} />}
          />
          <Route
            path="/register"
            element={<OnlyUnAuth component={<RegisterPage />} />}
          />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<RestorePasswordPage />} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);
