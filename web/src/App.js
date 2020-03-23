import React from 'react';
import { Provider } from 'use-http';
import { FirebaseAppProvider } from 'reactfire';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from 'ui/components/PrivateRoute';

import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import SearchPage from 'pages/SearchPage';
import ScholarshipPage from 'pages/ScholarshipPage';
import NotFoundPage from 'pages/NotFoundPage';
import DisclaimerPage from 'pages/DisclaimerPage';
import PendingScholarshipsPage from 'pages/PendingScholarshipsPage';
import PendingScholarshipDetailPage from 'pages/PendingScholarshipDetailPage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};

function App() {
  return (
    <Provider options={{ cachePolicy: 'no-cache' }}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buscar" element={<SearchPage />} />
            <Route path="/terminos" element={<DisclaimerPage />} />
            <Route path="/convocatoria/:id" element={<ScholarshipPage />} />
            <Route path="/login" element={<LoginPage />} />
            <PrivateRoute
              path="/admin/pendientes"
              element={<PendingScholarshipsPage />}
            />
            <PrivateRoute
              path="/admin/pendientes/:id"
              element={<PendingScholarshipDetailPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </FirebaseAppProvider>
    </Provider>
  );
}

export default App;
