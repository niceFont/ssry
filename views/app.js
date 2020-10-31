import React from 'react';
import { hydrate } from 'react-dom';

const path = window.location.pathname;
const Page = require(`./pages${path}`).default;
const App = require('./pages/_app').default;

const props = window.__INITIAL_PROPS__;

hydrate(<App {...{ Component: Page, pageProps: props }} />, document.getElementById('root'));
