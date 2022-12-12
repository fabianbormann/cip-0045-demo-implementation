import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Meerkat from '@fabianbormann/meerkat';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const meerkat = new Meerkat({
  identifier: 'bZqy8Big6pWTDeFTHz2Z6KLmuniqwRNXMT',
  announce: [
    'wss://tracker.files.fm:7073/announce',
    'wss://tracker.btorrent.xyz',
    'ws://tracker.files.fm:7072/announce',
    'wss://tracker.openwebtorrent.com:443/announce',
  ],
});

const logger = meerkat.logger;
logger.info(`The generated meerkat address is: ${meerkat.address()}`);

meerkat.on('server', function () {
  console.log('[info]: connected to server');
  meerkat.rpc(
    'bZqy8Big6pWTDeFTHz2Z6KLmuniqwRNXMT',
    'api',
    {
      api: {
        version: '1.0.3',
        name: 'boostwallet',
        methods: ['getRewardAddresses'],
      },
    },
    () => {}
  );
});

meerkat.register(
  'getRewardAddresses',
  (address: string, args: any, callback: Function) => {
    callback(['e1820506cb0ce54ae755b2512b6cf31856d7265e8792cb86afc94e0872']);
  }
);
