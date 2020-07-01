import { readFileSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';

const DATA_DIR = process.env.NODE_ENV === 'production' ? tmpdir() : process.env.PWD;
const DATA_FILE = `${DATA_DIR}/data.json`;

function readData() {
  try {
    const data = readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

function writeData(data: any) {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, '  '));
}

export function getVal(key: string, defaultVal: any = null) {
  const data = readData();
  return (data && data[key]) || defaultVal;
}

export function setVal(key: string, val: any) {
  const data = readData();
  writeData({ ...data, [key]: val });
}
