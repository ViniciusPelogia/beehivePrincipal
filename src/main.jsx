import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateHive from './pages/createHive/CreateHive.jsx';
import EditProfile from './pages/editProfile/EditProfile.jsx';
import Hive from './pages/hive/Hive.jsx';
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import Profile from './pages/profile/Profile.jsx';
import SignUp from './pages/signup/SignUp.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/hive',
    element: <Hive />
  },
  {
    path: '/editprofile',
    element: <EditProfile />
  },
  {
    path: '/createhive',
    element: <CreateHive />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
