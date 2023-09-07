import { useState, useEffect } from "react";
import { generateWallet, getSignatureWithMnemonic } from "~/app/ethers/index";
import { Typography, Button, Row, Col } from "antd";
import Image from "next/image";
import copyIcon from "~/assets/images/copy.png";
import "./style.scss";
import ClipBoard from "~/components/common/Button/ClipBoard";
import { IGenerateWallet } from "~/types/generateWallet";
import { useCreateWalletMutation } from "~/app/services/generateWalletService";
import { readOTP } from "~/utils/storage";

export default function GenerateWallet() {
  const [createWallet, { isLoading }] = useCreateWalletMutation();
  const { Title } = Typography;
  const [payload, setPayload] = useState<IGenerateWallet>({
    address: "",
    mnemonic: "",
    verify_code: readOTP() || "",
    signature_payload: "",
  });
  useEffect(() => {
    handleGenerate();
  }, []);
  const handleGenerate = async () => {
    const account: any = await generateWallet();
    const signaturePayload = await getSignatureWithMnemonic(account.mnemonic);
    setPayload((pre) => {
      const newState = {
        ...pre,
        address: account.address,
        mnemonic: account.mnemonic,
        signature_payload: signaturePayload,
      };
      return newState;
    });
  };
  const handleSubmit = async () => {
    const payloadWallet = {
      signature_payload: payload.signature_payload,
      verify_code: payload.verify_code,
    };
    const result = await createWallet(payloadWallet);
  };

  return (
    <div className={``}>
      <Title level={3}>Generate address</Title>
      <Button
        className="mt-6 pni-button text-2xl"
        type="primary"
        size="large"
        onClick={handleGenerate}
      >
        <div className="font-semibold">Generate address</div>
      </Button>
      <div className="pni-danger-text text-base pt-2">
        You will be logged out if not click Submit after{" "}
        <span>
          <strong>1 minute </strong>
        </span>
        since generating address
      </div>

      {/* Generate address */}
      <div className="mt-8">
        <Row className="">
          <Col
            span={12}
            className="p-3 bg-generate-wallet text-center wallet-item wallet-item-left"
          >
            <div className="font-semibold text-base">Address</div>
          </Col>
          <Col
            span={12}
            className="p-3 bg-generate-wallet text-center wallet-item wallet-item-right"
          >
            <div className="font-semibold text-base">Mnemonic</div>
          </Col>
        </Row>
        <Row className="">
          <Col
            span={12}
            className="flex items-center justify-center px-8 py-6 wallet-item wallet-item__value wallet-item-right"
          >
            <div className="wallet-item__value__generate p-2 flex items-center justify-between">
              <div className="text-base">{payload.address}</div>
              <div>
                <ClipBoard text={payload.address}>
                  <Image
                    src={copyIcon}
                    alt="image-background"
                    className="cursor-pointer"
                  />
                </ClipBoard>
              </div>
            </div>
          </Col>
          <Col
            span={12}
            className="flex items-center justify-center px-8 py-6 wallet-item wallet-item__value wallet-item-right"
          >
            <div className="wallet-item__value__generate p-2 flex items-center justify-between">
              <div className="text-base">{payload.mnemonic}</div>
              <div>
                <ClipBoard text={payload.mnemonic}>
                  <Image
                    src={copyIcon}
                    alt="image-background"
                    className="cursor-pointer"
                  />
                </ClipBoard>
              </div>
            </div>
            <div className="pni-danger-text font-semibold pt-2">
              Please write down your Mnemonic and store in a safe place!
            </div>
          </Col>
        </Row>
      </div>
      {/* submit */}
      <div className="flex justify-center">
        <Button
          className="mt-6 pni-button text-2xl"
          type="primary"
          size="large"
          loading={isLoading}
          onClick={handleSubmit}
        >
          <div className="font-semibold px-5">Submit</div>
        </Button>
      </div>
    </div>
  );
}
