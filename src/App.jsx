import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeRoute from './routes/home/home.component';
import ErrorRoute from './routes/error/error.component';
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoute />,
    errorElement: <ErrorRoute />
  }
]);

function App() {
  return(
    <RouterProvider router={router} />
  )
}

export default App
