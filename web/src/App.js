import React from 'react';
import { Provider } from 'use-http';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from 'pages/HomePage';
import SearchPage from 'pages/SearchPage';
import ScholarshipPage from 'pages/ScholarshipPage';

function App() {
  return (
    <Provider options={{ cachePolicy: 'no-cache' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buscar" element={<SearchPage />} />
          <Route path="/convocatoria/:id" element={<ScholarshipPage />} />
          <Route path="*" redirectTo="/" />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
