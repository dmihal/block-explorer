export let network = 'unspecified'; // process.env.NETWORK;

// const hostRegex = /^(\w+)\.(?:\w+\.)?fuel\.sh$/i;

export function setupEnv(request: any) {
  // if (hostRegex.test(request.headers.host)) {
  /*
  network = String(request.headers.host).indexOf('rinkeby') !== -1
    ? 'rinkeby'
    : 'unspecified';
    */

    // network = hostRegex.exec(request.headers.host)![1];
  // }
  console.log(request.headers.host);
  network = network;
}

export function getNetwork() {
  return network;
}
