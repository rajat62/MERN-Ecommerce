import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, redirect } from 'react-router-dom';

import Home from "./components/Home"

import Login from './components/Login';
import Register from './components/Register';
import Admin from "./components/Admin"
import { ProtectedRoute } from './features/ProtectedRoute';
import { useSelector } from 'react-redux';
import { PreventLogout } from './features/PreventLogout';
const AppRouter = () => {


  const isAdmin = useSelector(state => state.auth.isAdmin);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
          element={ 
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
        <Route path="/login" element={
          <PreventLogout>
            <Login/>
          </PreventLogout>
        } />
        <Route path="/register" element={
          <PreventLogout>
            <Register />
          </PreventLogout>
        }/>
        <Route path="/admin" element={ 
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>


    </BrowserRouter>
  );
};

export default AppRouter;
