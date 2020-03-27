import React from 'react';
import { ReactQueryConfigProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAppToken } from 'utils/hooks';
import PrivateRoute from 'ui/components/PrivateRoute';

import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import AdminPage from 'pages/AdminPage';
import SearchPage from 'pages/SearchPage';
import ProfilePage from 'pages/ProfilePage';
import ScholarshipPage from 'pages/ScholarshipPage';
import NotFoundPage from 'pages/NotFoundPage';
import DisclaimerPage from 'pages/DisclaimerPage';
import PendingScholarshipsPage from 'pages/PendingScholarshipsPage';
import PendingScholarshipDetailPage from 'pages/PendingScholarshipDetailPage';

const queryConfig = { refetchAllOnWindowFocus: false };

function App() {
  useAppToken();
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buscar" element={<SearchPage />} />
          <Route path="/terminos" element={<DisclaimerPage />} />
          <Route path="/convocatoria/:id" element={<ScholarshipPage />} />
          <Route path="/login" element={<LoginPage />} />
          <PrivateRoute path="/admin" element={<AdminPage />} />
          <PrivateRoute path="/admin/perfil" element={<ProfilePage />} />
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
    </ReactQueryConfigProvider>
  );
}

export default App;
