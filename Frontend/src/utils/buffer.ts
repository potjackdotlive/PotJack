export const u32ToLittleEndianBuffer = (num: number, bufferSize: undefined | number = 4) => {
  const buf = Buffer.alloc(bufferSize);
  buf.writeUInt32LE(num, 0);
  return buf;
};
