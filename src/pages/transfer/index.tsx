import "./style.scss";
import { Typography } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import TransferInformation from "~/components/transfer/TransferInformation";
import TransferVerifyPassword from "~/components/transfer/TransferVerifyPassword";
import TransferSuccess from "~/components/transfer/TransferSuccess";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useGetNFTOwnQuery } from "~/app/services/transferService";
import { useDispatch } from "react-redux";
import { setListNFT } from "~/app/slices/transferSlice";
import { transferFromBatch } from "~/app/ethers/index";
const step = {
  verify: "verify-password",
  success: "success",
};
export default function Transfer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { Title } = Typography;

  const fetNFTOwn = useGetNFTOwnQuery({ page: 1, limit: 100 });

  const handleContinueVerify = async (value: any) => {
    router.push("/transfer?step=verify-password");
  };
  const handleContinueSuccess = () => {
    router.push("/transfer?step=success");
  };
  const stepComponent =
    searchParams?.has("step") && searchParams.get("step") === step.verify ? (
      <TransferVerifyPassword doSubmit={handleContinueSuccess} />
    ) : searchParams?.has("step") &&
      searchParams.get("step") === step.success ? (
      <TransferSuccess />
    ) : (
      <TransferInformation
        optionsNFT={fetNFTOwn?.data?.data}
        doSubmit={handleContinueVerify}
      />
    );
  const handleBackStep = () => {
    router.back();
  };
  return (
    <div>
      <Title level={3}>Transfer NFT 1:1</Title>
      {fetNFTOwn.isSuccess ? (
        <div className="mt-6 bg-white py-4 pb-8">
          {searchParams?.has("step") && (
            <div
              className="px-8 flex justify-start items-center cursor-pointer"
              onClick={handleBackStep}
            >
              <ArrowLeftOutlined />
              <div className="pl-2 hover:underline text-base font-normal">
                Back
              </div>
            </div>
          )}

          {stepComponent}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
