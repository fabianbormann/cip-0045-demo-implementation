# CIP-0045 Demo Implementation

This is a demo implementation of [CIP-0045](https://github.com/cardano-foundation/CIPs/pull/395) that uses [cardano-peer-connect](https://github.com/fabianbormann/cardano-peer-connect).

<img src="https://user-images.githubusercontent.com/1525818/209772566-54ac650b-efb2-4f84-8f7b-eaeedb6f5f90.gif" width="600" />

## Getting Started

### Run the Server (aka the dApp)

Open the [dApp.html](./dApp.html) file and your dev tools to see the console log outputs.

### Explanation

The server (dApp) is just a blank VSCode HTML5 template with the following changes:

1. Import cardano-peer-connect in the header

```html
<script src="https://fabianbormann.github.io/cardano-peer-connect/latest/index.js"></script>
```

2. Create a new DAppPeerConnect instance, plot the QR code and print the address (identifier)

```html
<script>
  const dAppInfo = {
    name: 'My awesome DApp',
    url: 'http://my-awesome-dapp-url.tld/'
  }

  // Define a function that will be called when the client tries to connect to your DApp.
  const verifyConnection = (
    walletInfo,
    callback
  ) => {
    callback(
      window.confirm(`Do you want to connect to wallet ${walletInfo.name} (${walletInfo.address})?`)
    );
  }

  const onApiInject = (api) => {
    console.log('API injected:', api);
  };

  const onApiEject = () => {
    console.log('API ejected');
  };

  const dAppConnect = new CardanoPeerConnect.DAppPeerConnect({
    dAppInfo: dAppInfo,
    verifyConnection: verifyConnection,
    onApiInject: onApiInject, // will be call when api was successfully injected
    onApiEject: onApiEject,   // will be call when api was ejected
  });
  
  dAppConnect.generateQRCode(document.getElementById('qr-code'));
  document.getElementById('address').innerText = dAppConnect.getAddress();
</script>
```

The DAppPeerConnect instance is now waiting for clients to connect. It provides api rpc methods under the hood to allow a client to connect and inject it's api to the global window object.

## Client (aka Wallet App)

### Run the Client

```zsh
cd demo-wallet-app
npm i
npm start
```

#### Testing (PoC)

Once you have the server and client running you should see something like

```js
[info] [Meerkat]: injected api of boostwallet into window.cardano
```

in your dApp logs. Now you can issue

```js
window.cardano.boostwallet
  .getRewardAddresses()
  .then((result) => console.log(result));
```

to execute the remote call and get the reward address from your Wallet (dApp.html).

### Explanation

The wallet app is actually the result of:

1. The blank ionic react template with cardano-peer-connect as an additional npm package

```zsh
ionic start demo-wallet-app blank --type react
cd demo-wallet-app
npm i @fabianbormann/cardano-peer-connect
```

2. An Implementation of the abstract class `CardanoPeerConnect` within [BoostPeerConnect.tsx](./demo-wallet-app/src/BoostPeerConnect.tsx) (feel free to adjust the name to e.g. `[MyWalletName]PeerConnect`)

3. BoostPeerConnect is now ready to use. Please see the example usage in [Home.tsx](./demo-wallet-app/src/pages/Home.tsx)

```ts
import { BoostPeerConnect } from '../BoostPeerConnect';

...

const connectWithDApp = () => {
  const seed = boostPeerConnect.current.connect(
    dAppIdentifier,
    [
      'wss://dev.btt.cf-identity-wallet.metadata.dev.cf-deployments.org',
      'wss://tracker.files.fm:7073/announce',
      'wss://tracker.btorrent.xyz',
      'ws://tracker.files.fm:7072/announce',
      'wss://tracker.openwebtorrent.com:443/announce',
    ],
    localStorage.getItem('meerkat-boostwallet-seed')
  );
  localStorage.setItem('meerkat-boostwallet-seed', seed);
};

return (
...
  <IonInput
    onIonChange={(event) =>
      setDAppIdentifier(`${event.target.value}`)
    }
    placeholder="dApp identifier"
  ></IonInput>
  ...
  <IonButton onClick={connectWithDApp} fill="solid">
    Connect
  </IonButton>
...
)

```
