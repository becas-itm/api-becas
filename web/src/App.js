import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('pages/HomePage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" redirectTo="/" />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
