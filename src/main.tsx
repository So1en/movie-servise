import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from "@/pages/HomePage.tsx";
import ProfilePage from "@/pages/ProfilePage.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import FilmsCatalog from "@/pages/FilmsCatalog.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFoundPage/>,
        children: [
            {
                path: '',
                element:  <HomePage/>
            },
            {
                path: '/profile',
                element: <ProfilePage/>
            },
            {
                path: '/catalog',
                element: <FilmsCatalog/>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
