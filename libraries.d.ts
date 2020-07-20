declare module 'ethjs-unit' {
  export function fromWei(value: string, unit: string): string;
}

declare module '*.svg' {
  const path: string;
  export default path;
}

declare module '*.png' {
  const path: string;
  export default path;
}

declare module '@fuel-js/api' {
  interface Struct {
    keccak256Packed: string;
    sizePacked: number;
    properties: any;
    addon: {
      decoded: Struct;
    };
  }

  export default class FuelAPI {
    constructor(network?: string, base?: string);

    getAccount(owner?: string): Promise<any>;
    getToken(address: string): Promise<string>;
    getAddressId(address: string): Promise<string>;
    getBlockByHeight(height: number): Promise<Struct>;
    getState(): Promise<Struct>;
    getRootByHash(hash: string): Promise<Struct>;
    getTransactions(blockHeight: number, rootIndex: number): Promise<any>;
    getTransactionByHash(hash: string): Promise<any>
  }
}
