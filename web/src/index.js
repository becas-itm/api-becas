import './styles.css';
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SplashScreen from 'ui/components/SplashScreen';

const App = lazy(() => import('./App'));

ReactDOM.render(
  <Suspense fallback={<SplashScreen />}>
    <App />
  </Suspense>,
  document.getElementById('root'),
);
