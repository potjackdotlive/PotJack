export enum SupportedConnector {
  MetaMask = "MetaMask",
  WalletConnect = "WalletConnect",
  Phantom = "Phantom",
}

export interface PhantomProvider {
  isPhantom: boolean;
  publicKey: { toBase58(): string } | null;
  isConnected: boolean;

  connect(options?: { onlyIfTrusted?: boolean }): Promise<{ publicKey: { toBase58(): string } }>;

  disconnect(): Promise<void>;

  signTransaction(transaction: any): Promise<any>;

  signAllTransactions(transactions: any[]): Promise<any[]>;

  signMessage(message: Uint8Array, display?: string): Promise<{ signature: Uint8Array }>;

  on(event: string, callback: (...args: any[]) => void): void;

  removeListener(event: string, callback: (...args: any[]) => void): void;
}
