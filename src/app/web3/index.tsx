import { notification } from "antd";
import Web3 from "web3";

export const connectWeb3 = async () => {
  let web3 = null;

  if (window.ethereum) {
    // Sử dụng MetaMask hoặc trình duyệt có hỗ trợ Web3
    web3 = new Web3(window.ethereum);
    try {
      // Yêu cầu quyền truy cập tài khoản
      await window.ethereum.enable();
    } catch (e) {
      notification.error({
        message: "Không thể kết nối với MetaMask",
      });
    }
  } else if (window.web3) {
    // Sử dụng Web3 đã được khởi tạo trước đó (cũ)
    web3 = new Web3(window.web3.currentProvider);
  } else {
    notification.error({
      message:
        "Trình duyệt của bạn không hỗ trợ Web3. Vui lòng cài đặt MetaMask.",
    });
  }

  return web3;
};

export const withoutAuthContract = async (
  contractABI: any,
  contractAddress: string
) => {
  try {
    const web3 = new Web3(window.ethereum);
    return new web3.eth.Contract(contractABI, contractAddress);
  } catch (e) {
    return false;
  }
};

export const withAuthContract = async (
  contractABI: any,
  contractAddress: string
) => {
  try {
    const web3 = await connectWeb3();
    if (web3) {
      return new web3.eth.Contract(contractABI, contractAddress);
    }

    return false;
  } catch (error) {
    return false;
  }
};

export const generateWallet = async () => {
  try {
    const web3 = new Web3(window.ethereum);
    return await web3.eth.accounts.wallet.create(1);
  } catch (e) {
    return false;
  }
};
