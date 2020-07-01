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
