import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '../components/app/app';
import { Error } from '../components/error/error';
import { Login } from '../components/login/login';
import { isProduction } from '../utils/is-production/is-production';
import packageJson from '../../package.json';
import { Splash } from '../components/splash/splash';
import { Test } from '../components/test/test';

const basename = isProduction() ? `/${packageJson.name}` : '';

export const ROUTER = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <Splash /> },
        { path: 'login', element: <Login /> },
        { path: 'test', element: <Test /> },
        { path: '*', element: <Error /> },
      ],
    },
  ],
  { basename }
);
