import React from 'react';
import { Route, Navigate, Routes, BrowserRouter } from 'react-router-dom';

const PrivateRoute = ({ element: Component, isLoggedIn, ...rest }) => {
  return (

    <BrowserRouter>
      <Routes>
    <Route
      {...rest}
      element={isLoggedIn ? <Component /> : <Navigate to="/" replace />}
    />
    </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoute;
