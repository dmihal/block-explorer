export let network = process.env.NETWORK;

const hostRegex = /^(\w+)\.(?:\w+\.)?fuel\.sh$/i;

export function setupEnv(request: any) {
  if (hostRegex.test(request.headers.host)) {
    network = hostRegex.exec(request.headers.host)![1];
  }
}

export function getNetwork() {
  return network;
}
