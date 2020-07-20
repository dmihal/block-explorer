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
  export default class FuelAPI {
    constructor(network?: string, base?: string);

    getAccount(owner?: string): Promise<any>;
    getToken(address: string): Promise<string>;
    getAddressId(address: string): Promise<string>;
    getBlockByHeight(height: number): Promise<any>;
    getState(): Promise<any>;
    getRootByHash(hash: string): Promise<any>;
  }
}
