import React, { useEffect, useRef, useState } from 'react';

import { DAppPeerConnect } from '@fabianbormann/cardano-peer-connect';
import {
  IDAppInfos,
  IWalletInfo
} from '@fabianbormann/cardano-peer-connect/types';

import {
  ConnectWalletButton,
  useCardano,
} from '@cardano-foundation/cardano-connect-with-wallet';

const App = () => {

  const copyButton = useRef<HTMLDivElement | null>(null);
  const shutdownButton = useRef<HTMLDivElement | null>(null);
  const txSubmitInput = useRef<HTMLInputElement | null>(null);
  const txSignInput = useRef<HTMLInputElement | null>(null);
  const qrCodeField = useRef<HTMLDivElement | null>(null);
  const dAppConnect = useRef<DAppPeerConnect | null>(null);
  const [meerkatAddress, setMeerkatAddress] = useState('');
  const clientConnected = useRef<boolean>(false)
  const clientAddress = useRef<string | null>(null)
  const connectedWallet = useRef<IWalletInfo | null>(null)
  const apiInjected = useRef<boolean>(false)
  const [supportedWallets, setSupportedWallets] = useState([
    'eternl',
  ]);
  const sendButton = useRef<HTMLDivElement | null>(null);
  const signButton = useRef<HTMLDivElement | null>(null);

  const cardano = useCardano();

  useEffect(() => {

    window.addEventListener('beforeunload',  (event:any) => {

      if(dAppConnect.current) {

        dAppConnect.current?.shutdownServer()
      }
    })

    if (dAppConnect.current === null) {
      const verifyConnection = (
        walletInfo: IWalletInfo,
        callback: (granted: boolean) => void
      ) => {
        callback(
          window.confirm(`Do you want to connect to wallet ${walletInfo.name} (${walletInfo.address})?`)
        );
        connectedWallet.current = walletInfo
      };

      const onApiInject = (name: string, address: string) => {

        setSupportedWallets([...supportedWallets, name]);
        cardano.connect(name);

        apiInjected.current = true
      };

      const onApiEject = (name: string, address: string) => {

        cardano.disconnect();
        setSupportedWallets(
          supportedWallets.filter((supportedWallet) => supportedWallet !== name)
        );
        apiInjected.current = false
      };

      const dAppInfo: IDAppInfos = {
        name: 'Test Dapp 1',
        url: 'http://localhost:3001/'
      }

      dAppConnect.current = new DAppPeerConnect({
        dAppInfo: dAppInfo,
        verifyConnection: verifyConnection,
        onApiInject: onApiInject,
        onApiEject: onApiEject,
        onConnect: (address: string) => {
          clientConnected.current = true
          clientAddress.current = address
        },
        onDisconnect: () => {
          clientConnected.current = false
          clientAddress.current = null
        }
      });

      setMeerkatAddress(dAppConnect.current.getAddress());

      if (qrCodeField.current !== null) {
        dAppConnect.current.generateQRCode(qrCodeField.current);
      }
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: 64,
          color: 'white',
          backgroundColor: '#3BA5A5',
          padding: '0 16px 0 16px',
        }}
      >
        <h3>Example dApp connecting to Eternl</h3>
        <div style={{ flexGrow: 1 }} />
        <ConnectWalletButton
          supportedWallets={supportedWallets}
          borderRadius={6}
          primaryColor="#297373"
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: 'calc(100vh - 64px - 32px)',
          backgroundColor: '#f5f5f5',
          padding: 16,
        }}
      >
        <h3>
          Please scan the QR code or share the address below with your wallet
          app.
        </h3>
        <div
          style={{ marginTop: 16, marginBottom: 16 }}
          ref={qrCodeField}
        ></div>

        <span>For method results check the console.</span>

        <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center',marginTop: 16, width: "70%"}}>

          <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center', backgroundColor: "lightblue", width:"100%", clear: "both"}}>

            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16,}}>

              <div>
                <span style={{ paddingLeft: "4px", textDecoration: 'underline' }}>{meerkatAddress}</span>
              </div>

              <div
                ref={copyButton}
                style={{
                  textAlign: "right",
                  padding: 10,
                  marginTop: 12,
                  backgroundColor: '#39393A',
                  color: 'white',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigator.clipboard.writeText(meerkatAddress).then(() => {
                    if (copyButton.current) {
                      copyButton.current.innerText = 'Successfully copied!';
                      setTimeout(() => {
                        if (copyButton.current) {
                          copyButton.current.innerText = 'Copy';
                        }
                      }, 500);
                    }
                  });
                }}>
                Copy
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'row'}}>

              <div ref={ shutdownButton }
                   style={{padding: 10, marginTop: 12, backgroundColor: '#39393A', color: 'white', cursor: 'pointer'}}
                   onClick={() => {

                     if(dAppConnect.current) {

                       clientAddress.current = null
                       clientConnected.current = false

                       dAppConnect.current?.shutdownServer()
                     }
                   }}>
                Shutdown Server
              </div>

            </div>

            <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center',marginTop: 16, width: "70%"}}>
              Connected: { clientConnected.current ? "yes " + `( ${clientAddress.current} )`: "no" }
            </div>

            { clientConnected.current && connectedWallet.current &&
              <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center',marginTop: 16, width: "70%"}}>
                Wallet name: { `${connectedWallet.current?.name} (version: ${connectedWallet.current?.version} )` }
              </div>
            }

            <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center',marginTop: 16, width: "70%"}}>
              API injected: { apiInjected.current ? "yes ": "no" }
            </div>


          </div>




          <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginTop: 16, width: "100%"}}>
          <input
                ref={txSubmitInput}
                placeholder='signed tx cbor'
                width='100%'
                style={{
                    width: '100%',
                }} type="text"/>

            <div
                ref={sendButton}
                style={{
                    padding: 10,
                    marginTop: 12,
                    backgroundColor: '#39393A',
                    color: 'white',
                    cursor: 'pointer',
                  width: '220px'
                }}
                onClick={async () => {

                    // @ts-ignore
                    if(window.cardanop2p !== undefined) {

                        // @ts-ignore
                        const api = window.cardanop2p!.eternl!

                        if(api) {

                          (await api.enable()).submitTx(txSubmitInput.current?.value)

                        } else {

                            console.log('No Eternl api is given')
                        }
                    } else {
                        console.log('No cardano p2p api found.')
                    }
                }}
            >
                Submit signed TX
            </div>

            <hr />

          </div>

          <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginTop: 16, width: "100%"}}>

          <input
              ref={txSignInput}
              placeholder='unsigend tx cbor'
              style={{
              width: '100%',
          }} type="text"/>
            <div
                ref={signButton}
                style={{
                  padding: 10,
                  marginTop: 12,
                  backgroundColor: '#39393A',
                  color: 'white',
                  cursor: 'pointer',
                  width: '220px'
                }}
                onClick={async () => {
                    console.log('input', txSignInput.current?.value)

                    // @ts-ignore
                    if(window.cardanop2p2 !== undefined) {

                        // @ts-ignore
                        const api = window.cardanop2p!.eternl!

                        if(api) {

                            console.log('api is', api)

                            const func = await api.enable()

                            console.log('funcs are', func)

                            console.log('sign tx', txSignInput.current?.value)

                            const res = await func.signTx(txSignInput.current?.value, false, "abc")

                          console.log('res for sign', res)

                        } else {

                            console.log('No Eternl API is given')
                        }
                    } else {
                        console.log('No cardano api found.')
                    }
                }}
            >
                Sign TX
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
