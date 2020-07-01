import { readFileSync, writeFileSync } from 'fs';

const DATA_FILE = `${process.env.PWD}/data.json`;

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
