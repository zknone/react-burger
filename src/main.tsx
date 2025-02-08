import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/app';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/login';
import Layout from './components/layout/layout';
import RegisterPage from './pages/register/register';
import RestorePasswordPage from './pages/restore-password/restore-password';
import { useTokenMutation } from './services/api/authorization-api/authorization-api';
import ProfilePage from './pages/profile/profile';

const Root = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const [token] = useTokenMutation();

  useEffect(() => {
    if (!refreshToken) return;

    token(refreshToken)
      .unwrap()
      .then((data) => {
        localStorage.setItem('accessToken', data.accessToken);
      })
      .catch(() => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
      });
  }, [token]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<RestorePasswordPage />} />
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
