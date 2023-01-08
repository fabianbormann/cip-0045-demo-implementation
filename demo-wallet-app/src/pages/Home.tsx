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
import { BoostPeerConnect } from '../BoostPeerConnect';
import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

const Home: React.FC = () => {
  const boostPeerConnect = useRef<BoostPeerConnect>(new BoostPeerConnect());
  const [dAppIdentifier, setDAppIdentifier] = useState('');
  const videoElement = useRef<HTMLVideoElement | null>(null);
  const qrScanner = useRef<QrScanner | undefined>();
  const [qrOverlayVisible, setQrOverlayVisible] = useState(false);

  useEffect(() => {
    if (videoElement.current) {
      qrScanner.current = new QrScanner(
        videoElement.current,
        (result) => {
          console.log('decoded qr code:', result);
          if (qrScanner.current) {
            qrScanner.current.stop();
          }
        },
        {
          returnDetailedScanResult: true,
        }
      );
    }
  }, []);

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
              <a
                style={{ cursor: 'pointer' }}
                role="button"
                onClick={startQrScanner}
              >
                scan the QR code.
              </a>
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
              ) : (
                <IonButton onClick={connectWithDApp} fill="solid">
                  Connect
                </IonButton>
              )}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
