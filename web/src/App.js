import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from 'ui/components/PrivateRoute';

import HomePage from 'pages/HomePage';
import SearchPage from 'pages/SearchPage';
import DisclaimerPage from 'pages/DisclaimerPage';
import ScholarshipPage from 'pages/ScholarshipPage';

import LoginPage from 'pages/LoginPage';
import ResetPage from 'pages/ResetPage';
import RecoverPage from 'pages/RecoverPage';
import CompleteRegisterPage from 'pages/CompleteRegisterPage';

import AdminPage from 'pages/AdminPage';
import UsersPage from 'pages/UsersPage';
import ProfilePage from 'pages/ProfilePage';
import PendingScholarshipsPage from 'pages/PendingScholarshipsPage';
import PendingScholarshipDetailPage from 'pages/PendingScholarshipDetailPage';

import NotFoundPage from 'pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/buscar" element={<SearchPage />} />
      <Route path="/terminos" element={<DisclaimerPage />} />
      <Route path="/convocatoria/:id" element={<ScholarshipPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/recuperar" element={<RecoverPage />} />
      <Route path="/restablecer/:token" element={<ResetPage />} />
      <Route path="/registro/:token" element={<CompleteRegisterPage />} />

      <PrivateRoute path="/admin" element={<AdminPage />} />
      <PrivateRoute path="/admin/usuarios" element={<UsersPage />} />
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
  );
}

export default App;
