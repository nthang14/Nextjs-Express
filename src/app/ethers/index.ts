import { ContractInterface, ethers } from "ethers";
import { encrypted, decrypted } from "~/utils/helpers";
import { readPassword, readMnemonic } from "~/utils/storage";
import pniABI from "./abi/pni.json";
import { PNI_ADDRESS } from "~/enums/web3Enum";
import { RPC_URL } from "~/utils/constants";
export const generateWallet = async (option?: any) => {
  try {
    const create = await ethers.Wallet.createRandom();
    return {
      success: true,
      address: create.address,
      mnemonic: create.mnemonic?.phrase,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
export const getSignatureWithMnemonic = async (mnemonic: string) => {
  const password = readPassword() || "";
  const mnemonic_encrypted = encrypted(mnemonic, password);
  const signature = await ethers.Wallet.fromMnemonic(mnemonic).signMessage(
    mnemonic_encrypted
  );

  return `${mnemonic_encrypted}:${signature}`;
};

// get signature
export const getSignatureWithNone = async (nonce: string) => {
  const password = readPassword() || "";
  const mnemonic_encrypted = readMnemonic() || "";
  const mnemonic = decrypted(mnemonic_encrypted, password);

  return await ethers.Wallet.fromMnemonic(mnemonic).signMessage(nonce);
};

// get signature
export const getSignature = async () => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const password = readPassword() || "";
  const mnemonic_encrypted = readMnemonic() || "";
  const mnemonic = decrypted(mnemonic_encrypted, password);

  return await ethers.Wallet.fromMnemonic(mnemonic).connect(provider);
};

// validate address
export const validAddressWallet = async (address: string = "") => {
  return await ethers.utils.isAddress(address);
};

// connect contract
export const connectContract = async (
  tokenAddress: string,
  abi: ContractInterface
) => {
  const signer = await getSignature();

  return new ethers.Contract(tokenAddress, abi, signer);
};

// transfer NFT
export const transferFromBatch = async (
  fromAddress: string,
  toAddress: string,
  tokenIds: string[] | number[],
  gasPrice: number = 0
) => {
  const contract = await connectContract(PNI_ADDRESS, pniABI);

  return await contract.transferBatch(fromAddress, toAddress, tokenIds, {
    gasPrice: gasPrice,
  });
};
