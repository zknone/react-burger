import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/app';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/login/login';
import Layout from './components/layout/layout';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  </React.StrictMode>
);
