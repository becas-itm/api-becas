import '@reach/listbox/styles.css';
import 'ui/components/Listbox/Listbox.css';

import '@reach/dialog/styles.css';
import 'ui/components/Dialog/Dialog.css';

import './styles.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import SplashScreen from 'ui/components/SplashScreen';

const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <React.Suspense fallback={<SplashScreen />}>
    <App />
  </React.Suspense>,
  document.getElementById('root'),
);
