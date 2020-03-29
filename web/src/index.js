import '@reach/listbox/styles.css';
import 'ui/components/Listbox/Listbox.css';

import '@reach/dialog/styles.css';
import 'ui/components/Dialog/Dialog.css';

import '@reach/combobox/styles.css';
import 'ui/styles/combobox.css';

import './styles.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import SplashScreen from 'ui/components/SplashScreen';
import AuthProvider from './AuthProvider';

const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <React.Suspense fallback={<SplashScreen />}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.Suspense>,
  document.getElementById('root'),
);
