import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import CreateHive from './pages/createHive/CreateHive.jsx';
import EditProfile from './pages/editProfile/EditProfile.jsx';
import Hive from './pages/hive/Hive.jsx';
import Home from './pages/home/Home.jsx';
import AllHivesPage from './pages/AllHives-Page/AllHivesPage.jsx'
import Login from './pages/login/Login.jsx';
import Profile from './pages/profile/Profile.jsx';
import SignUp from './pages/signup/SignUp.jsx';
import Settings from './pages/userSettings/Settings.jsx';
import { AuthProvider } from './AuthContext.jsx';  // Importe o AuthProvider

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/hives',
        element: <AllHivesPage />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/hive/:id',
        element: <Hive />
      },
      {
        path: '/editprofile',
        element: <EditProfile />
      },
      {
        path: '/createhive',
        element: <CreateHive />
      },
      {
        path: '/settings',
        element: <Settings />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>  {/* Envolva o RouterProvider com AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
