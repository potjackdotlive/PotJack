export const decodeBase64 = async (b64: string) => {
  // Decode base64 to binary
  const binaryString = atob(b64);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Handle different byte lengths
  if (bytes.length === 8) {
    const view = new DataView(bytes.buffer);
    return view.getBigInt64(0, true).toString();
  } else if (bytes.length < 8) {
    // Pad with zeros to make it 8 bytes (little-endian padding)
    const paddedBytes = new Uint8Array(8);
    paddedBytes.set(bytes); // Copies bytes to start, rest are zeros
    const view = new DataView(paddedBytes.buffer);
    return view.getBigInt64(0, true).toString();
  } else {
    // Handle larger byte arrays or return the hex representation
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(" ");
  }
};
