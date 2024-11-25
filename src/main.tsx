import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";

import HomePage from "@/pages/HomePage.tsx";
import ProfilePage from "@/pages/ProfilePage.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";

import MoviesPage from "@/pages/MoviesPage.tsx";
import MoviePage from "@/pages/MoviePage.tsx";
import SearchPage from "@/pages/SearchPage.tsx";
import {ProtectedRoute} from "@/components/ProtectedRoute.tsx";
import WatchList from "@/components/WatchList.tsx";
import Ratings from "@/components/Ratings.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                path: '',
                element: <HomePage/>
            },
            {
                path: '/profile',
                element: <ProtectedRoute><ProfilePage/></ProtectedRoute>,
                children: [
                    {
                        index: true,
                        element: <Navigate to={'watchlist'} replace/>
                    },
                    {
                        path: 'watchlist',
                        element: <WatchList/>
                    },
                    {
                        path: 'ratings',
                        element: <Ratings/>
                    }
                ]
            },
            {
                path: '/search',
                element: <SearchPage/>
            },
            {
                path: '/movie',
                element: <MoviesPage/>
            },
            {
                path: '/movie/:movieId',
                element: <MoviePage/>
            },
            {
                path: '/tv',
                element: <MoviesPage/>
            },
            {
                path: '/tv/:movieId',
                element: <MoviePage/>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
