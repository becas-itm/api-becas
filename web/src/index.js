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
import { FirebaseAppProvider } from 'reactfire';
import SplashScreen from 'ui/components/SplashScreen';

const App = React.lazy(() => import('./App'));

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};

ReactDOM.render(
  <React.Suspense fallback={<SplashScreen />}>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.Suspense>,
  document.getElementById('root'),
);
