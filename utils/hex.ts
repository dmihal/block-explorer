import createKeccakHash from 'keccak';

export const randomHex = (len: number) => {
  let str = '';
  while (str.length < len) {
    str += Math.floor(Math.random() * 12).toString(16);
  }
  return '0x' + str.substr(0, len);
};

export const toChecksumAddress = (address: string) => {
  address = address.toLowerCase().replace('0x', '');
  const hash = createKeccakHash('keccak256').update(address).digest('hex');
  let ret = '0x';

  for (let i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  return ret;
}

export const randomAddress = () => toChecksumAddress(randomHex(40));
