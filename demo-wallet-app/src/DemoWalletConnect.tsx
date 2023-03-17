import {CardanoPeerConnect, ExperimentalContainer} from '@fabianbormann/cardano-peer-connect';
import type {
  Paginate,
  Cip30DataSignature, Cbor,
} from '@fabianbormann/cardano-peer-connect/types';
import {IWalletInfo} from "@fabianbormann/cardano-peer-connect/types";

export class DemoWalletConnect extends CardanoPeerConnect {
  apiVersion: string = '1.0.1';
  name: string = 'demoWallet';
  icon: string = 'data:image/png;base64,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';

  private syncTest = (paramA: string, paramB: number) => {

    return `Called test with ${paramA} and number ${paramB}`
  }

  private asyncTest<T>(arg: T): Promise<T> {

    return new Promise((resolve) => {

      console.log('asyncTest called with: ',arg);

      resolve(arg);
    });
  }
  constructor(walletInfo: IWalletInfo) {

    super(walletInfo);

    //these functions and properties will be available under window.cardano['walletname'].experimental
    this.setExperimentalApi(new ExperimentalContainer({

      ABasicDataType: 1.234, //you can add basic data types, numbers, string, etc.

      basicObject: { //more complex objects
        stringValue: 'A test string',
        numberValue: 'String',
        arrayA: ['A', 'B', 3],
        // Don't declare functions in here
        // this will not work as expected:
        // myfunc: () => { return  "ABC" }
      },
      //declare functions as first class properties. Notice they will always be transformed into async function on the dapp
      myfunc: () => { return  "ABC" },

      //or import them, they can be normal and asynchronous functions
      syncTest: this.syncTest,
      asyncTest: this.asyncTest
    }))

    //these functions and properties will be available under (await window.cardano['walletname'].enable()).experimental
    this.setEnableExperimentalApi(new ExperimentalContainer({

      property: "Property ABC",// just like in setExperimentalApi you can add most things in here

      anotherProperty: "Property 2",

      asyncTest: this.asyncTest,

      asyncAddition: (numA: number, numB: number): Promise<number> => {

        return new Promise((resolve) => {

          setTimeout(() => {

            resolve(numA + numB);
          }, 1000)
        });
      }
    }))
  }

  getRewardAddresses(): Promise<Cbor[]> {

    return new Promise((resolve, reject) => {

      const rewardAddresses = ['e1820506cb0ce54ae755b2512b6cf31856d7265e8792cb86afc94e0872']

      return resolve(rewardAddresses)
    })

  }

  getNetworkId(): Promise<number> {

    return new Promise((resolve, reject) => {

        return resolve(1)
    })
  }

  getUtxos(amount?: string | undefined, paginate?: Paginate | undefined): Promise<string[] | null> {

    return new Promise((resolve, reject) => {

      return resolve(['1111182012217928d1b72b4324fc274a0b26f3bfc96c00002df3da8c7118c858c7aa136fa7b2b1baa3e81ed1a03b795000', '....'])
    })
  }

  getCollateral(params?: { amount?: string | undefined } | undefined): Promise<string[] | null> {

    return new Promise((resolve, reject) => {

      return resolve(['aaaaaaa1e18de8b01f0790.....aa136fa7b2b1baa3e81ed1a004c4b40', '...'])
    })
  }

  getBalance(): Promise<string> {

    return new Promise((resolve, reject) => {

      return resolve('00')
    })
  }

  getUsedAddresses(): Promise<string[]> {

    return new Promise((resolve, reject) => {

      return resolve([])
    })
  }

  getUnusedAddresses(): Promise<string[]> {

    return new Promise((resolve, reject) => {

      return resolve([])
    })
  }

  getChangeAddress(): Promise<string> {

    return new Promise((resolve, reject) => {

      return resolve('123abc...00000')
    })
  }

  signTx(txParam: string, partialSign: boolean): Promise<string> {

    return new Promise(async (resolve, reject) => {

      // build tx witness set
      const witnessSet = ((txParams: string, partialSign: boolean) => {
        return 'aaa....bbb' //
      })(txParam, partialSign)

      if(witnessSet) {

        return resolve(witnessSet)

      } else {

        return reject(() => {
          throw new Error('No witness set created.')
        })
      }

    })
  }

  signData(addr: string, payload: string): Promise<Cip30DataSignature> {

    //similar error handling as in signTx
    return new Promise(async (resolve, reject) => {

      resolve({
        key: 'aaaa',
        signature: 'bbb'
      })
    })
  }

  submitTx(tx: Cbor): Promise<string> {

    return new Promise(async (resolve, reject) => {

      const txHash = ((cbor: string) => {
        //submit tx and return tx hash if submitted
        return 'aaaa'
      })(tx)

      if(!txHash) {

        return reject(() => {
          throw new Error('Tx not submitted.')
        })
      }

      return resolve(txHash)
    })
  }
}
