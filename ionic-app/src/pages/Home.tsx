import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import { BoostPeerConnect } from '../BoostPeerConnect';
import { useEffect, useRef, useState } from 'react';

const Home: React.FC = () => {
  const boostPeerConnect = useRef<BoostPeerConnect>(new BoostPeerConnect());
  const [dAppIdentifier, setDAppIdentifier] = useState('');

  const connectWithDApp = () => {
    const seed = boostPeerConnect.current.connect(
      dAppIdentifier,
      [
        'https://pro.passwordchaos.gimbalabs.io',
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
          <div style={{ width: 300 }}>
            <IonItem className="address-container">
              <IonInput
                onIonChange={(event) =>
                  setDAppIdentifier(`${event.target.value}`)
                }
                placeholder="dApp identifier"
              ></IonInput>
            </IonItem>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginRight: 16,
              }}
            >
              <IonButton onClick={connectWithDApp} fill="solid">
                Connect
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
