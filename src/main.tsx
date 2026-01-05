import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
import Root from './components/root/root';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function prepareApp() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser');
    console.log('Starting Mock Service Worker...');
    await worker.start({
      serviceWorker: { url: '/mockServiceWorker.js' },
      onUnhandledRequest: 'warn',
    });
  }
}

prepareApp().then(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Root />
        <ToastContainer position="top-right" autoClose={5000} />
      </Provider>
    </React.StrictMode>
  );
});
