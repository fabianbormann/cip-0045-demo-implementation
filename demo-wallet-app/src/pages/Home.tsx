import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import { DemoWalletConnect } from '../DemoWalletConnect';
import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { IConnectMessage } from '@fabianbormann/cardano-peer-connect/types';
import { icon } from '../common';

const Home = () => {

  const [meerkatAddress, setMeerkatAddress] = useState('');

  let walletInfo = {
    address: "http://localhost:3002/home",
    name: "demo_wallet",
    icon: icon,
    version: "0.0.1",
    requestAutoconnect: true
  };

  let announce = [
    'https://pro.passwordchaos.gimbalabs.io',
    'wss://tracker.files.fm:7073/announce',
    'wss://tracker.btorrent.xyz',
    'ws://tracker.files.fm:7072/announce',
    'wss://tracker.openwebtorrent.com:443/announce',
  ];

  const [boostPeerConnect, setBoostPeerConnect] = React.useState(
    () => new DemoWalletConnect(walletInfo, localStorage.getItem('meerkat-boostwallet-seed'), announce)
  );

  window.addEventListener('beforeunload', (event: any) => {

    if (boostPeerConnect) {

      boostPeerConnect?.disconnect(dAppIdentifier)
    }
  })

  boostPeerConnect.setOnConnect((connectMessage: IConnectMessage) => {
    console.log('connect', connectMessage);

    identicon.current = boostPeerConnect.getIdenticon();

    setConnected(
      'Connected to ' +
      connectMessage.dApp.name +
      ' (' +
      connectMessage.dApp.address +
      ' at: ' +
      connectMessage.dApp.url +
      ')'
    );
  });

  boostPeerConnect.setOnDisconnect(
    (connectMessage: IConnectMessage) => {
      console.log('disconnect', connectMessage);

      identicon.current = null;
      setConnected('Disconnected');
    }
  );

  boostPeerConnect.setOnServerShutdown(
    (connectMessage: IConnectMessage) => {
      console.log('server shutdown', connectMessage);

      identicon.current = null;
      setConnected('Disconnected');
    }
  );

  boostPeerConnect.setOnApiInject((connectMessage: IConnectMessage) => {
    console.log('on api inject message', connectMessage);
  });

  const [dAppIdentifier, setDAppIdentifier] = useState('');
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const qrScanner = useRef<QrScanner | undefined>();
  const [qrOverlayVisible, setQrOverlayVisible] = useState(false);
  const identicon = useRef<string | null>(null);
  const [connected, setConnected] = useState('Disconnected');

  useEffect(() => {
    if (videoElement.current) {
      qrScanner.current = new QrScanner(
        videoElement.current,
        (result) => {
          if (qrScanner.current) {
            setDAppIdentifier(result.data.split(':')[0]);
            qrScanner.current.stop();
            setQrOverlayVisible(false);
          }
        },
        {
          returnDetailedScanResult: true,
        }
      );
    }
  }, []);
  const connectWithDApp = () => {

    console.log('connect with dapp')

    if(boostPeerConnect) {
      const seed = boostPeerConnect.connect(dAppIdentifier);
      localStorage.setItem('meerkat-boostwallet-seed', seed);
    }

    // setMeerkatAddress(boostPeerConnect.current.getAddress());
  };

  const disconnectDApp = () => {

    if(boostPeerConnect) {

      boostPeerConnect.disconnect(dAppIdentifier);
    }
  };

  const startQrScanner = () => {
    if (qrScanner.current) {
      qrScanner.current.start();
      setQrOverlayVisible(true);
    }
  };

  const stopQrScanner = () => {
    if (qrScanner.current) {
      qrScanner.current.stop();
      setQrOverlayVisible(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Example Wallet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="primary">
            <IonTitle size="large">Example Wallet</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: 600, width: '80%' }}>
            <p>
              Paste the dapp identifier into this input field and click the
              connect button, or{' '}
              <span
                style={{
                  cursor: 'pointer',
                  color: 'var(--ion-color-primary, #3880ff)',
                }}
                onClick={startQrScanner}
              >
                scan the QR code.
              </span>
            </p>
            <video
              style={{
                width: '100%',
                height: qrOverlayVisible ? 'unset' : '0px',
              }}
              ref={videoElement}
            ></video>

            {!qrOverlayVisible && (
              <IonItem className="address-container">
                <IonInput
                  value={dAppIdentifier}
                  onIonChange={(event) =>
                    setDAppIdentifier(`${event.target.value}`)
                  }
                  placeholder="dApp identifier"
                ></IonInput>
              </IonItem>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginRight: 16,
              }}
            >
              {qrOverlayVisible ? (
                <IonButton onClick={stopQrScanner} fill="solid">
                  Stop Scanner
                </IonButton>
              ) :  connected === 'Disconnected' ? (
                <IonButton onClick={connectWithDApp} fill="solid">
                  Connect
                </IonButton>
              ) : <IonButton onClick={disconnectDApp} fill="solid">
                Disconnect
              </IonButton>
              }
            </div>

            <div>
              <span style={{ paddingLeft: "4px", textDecoration: 'underline' }}>meerkatAddress: { meerkatAddress }</span>
            </div>

            <div>
              { connected }
            </div>

            { identicon.current &&
                <div>

                  <img src={ identicon.current } alt={ 'identicon' }/>

                </div>
            }

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
