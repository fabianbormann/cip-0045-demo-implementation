import { CardanoPeerConnect } from '@fabianbormann/cardano-peer-connect';
import type {
  Paginate,
  Cip30DataSignature, Cbor,
} from '@fabianbormann/cardano-peer-connect/types';

export class DemoWalletConnect extends CardanoPeerConnect {
  apiVersion: string = '1.0.1';
  name: string = 'demoWallet';
  icon: string =
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20version%3D%221.1%22%20id%3D%22Layer_1%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%20122.88%20101.33%22%20style%3D%22enable-background%3Anew%200%200%20122.88%20101.33%22%20xml%3Aspace%3D%22preserve%22%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E.st0%7Bfill-rule%3Aevenodd%3Bclip-rule%3Aevenodd%3B%7D%3C%2Fstyle%3E%3Cg%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M90.62%2C33.32h18.4v-2.79c-2.88-10.73-10.2-10.66-19.25-10.57c-1.49%2C0.02-2.84%2C0.03-2.92%2C0.03H18.07%20c-1.58%2C0-2.86-1.28-2.86-2.86c0-1.58%2C1.28-2.86%2C2.86-2.86h68.78c2.03%2C0%2C2.46%2C0%2C2.87-0.01c7.74-0.08%2C14.5-0.15%2C19.3%2C4.38v-1.31%20c0-3.2-1.31-6.1-3.42-8.21c-2.11-2.11-5.02-3.42-8.21-3.42H17.34c-3.2%2C0-6.1%2C1.31-8.21%2C3.42c-2.11%2C2.11-3.42%2C5.02-3.42%2C8.21v66.64%20c0%2C3.2%2C1.31%2C6.1%2C3.42%2C8.21c2.11%2C2.11%2C5.02%2C3.42%2C8.21%2C3.42h80.04c3.2%2C0%2C6.1-1.31%2C8.21-3.42c2.11-2.11%2C3.42-5.02%2C3.42-8.21v-9.46%20h-18.4c-5.55%2C0-10.6-2.27-14.25-5.92c-3.65-3.65-5.92-8.7-5.92-14.25v-0.87c0-5.55%2C2.27-10.6%2C5.92-14.25%20C80.02%2C35.59%2C85.06%2C33.32%2C90.62%2C33.32L90.62%2C33.32z%20M114.73%2C33.43c2.07%2C0.31%2C3.92%2C1.29%2C5.33%2C2.71c1.74%2C1.74%2C2.81%2C4.14%2C2.81%2C6.78%20v21.6c0%2C2.76-1.12%2C5.26-2.93%2C7.07c-1.39%2C1.39-3.2%2C2.38-5.21%2C2.76v9.63c0%2C4.77-1.95%2C9.11-5.09%2C12.25%20c-3.14%2C3.14-7.48%2C5.09-12.25%2C5.09H17.34c-4.77%2C0-9.11-1.95-12.25-5.09C1.95%2C93.1%2C0%2C88.76%2C0%2C83.99V17.34%20c0-4.77%2C1.95-9.11%2C5.09-12.25C8.23%2C1.95%2C12.57%2C0%2C17.34%2C0h80.04c4.77%2C0%2C9.11%2C1.95%2C12.25%2C5.09c3.14%2C3.14%2C5.09%2C7.48%2C5.09%2C12.25V33.43%20L114.73%2C33.43z%20M88.14%2C46.11c4.05%2C0%2C7.33%2C3.28%2C7.33%2C7.33c0%2C4.05-3.28%2C7.33-7.33%2C7.33c-4.05%2C0-7.33-3.28-7.33-7.33%20C80.81%2C49.39%2C84.09%2C46.11%2C88.14%2C46.11L88.14%2C46.11z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';

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
