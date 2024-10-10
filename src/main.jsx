import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import CreateHive from './pages/createHive/CreateHive.jsx';
import EditProfile from './pages/editProfile/EditProfile.jsx';
import Hive from './pages/hive/Hive.jsx';
import Home from './pages/home/Home.jsx';
import AllHivesPage from './pages/AllHives-Page/AllHivesPage.jsx';
import Login from './pages/login/Login.jsx';
import Profile from './pages/profile/Profile.jsx';
import SignUp from './pages/signup/SignUp.jsx';
import Settings from './pages/userSettings/Settings.jsx';

function Main() {
  const [userId, setUserId] = useState(null);

  // Recupera o userId do localStorage ao carregar
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login setUserId={setUserId} />  // Passa setUserId para o Login
    },
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      element: <PrivateRoute />,  // Uso direto do PrivateRoute para proteger rotas
      children: [
        {
          path: '/home',
          element: <Home userId={userId} />  // Passa userId para Home
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
  
  

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
