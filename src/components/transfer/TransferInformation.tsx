import { Row, Col, Input, Select, Button, Form, Tag } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { readAddressWallet } from "~/utils/storage";
import { debounce, joinArray } from "~/utils/helpers";
import { useEffect, useState } from "react";
import { useGetUserByAddressQuery } from "~/app/services/userService";
export default function TransferInformation({ doSubmit, optionsNFT }: any) {
  const address = readAddressWallet();
  const [toAddress, setToAddress] = useState("");
  const getUserByAddress = useGetUserByAddressQuery({
    address: toAddress,
  });
  const handleChangeAddress = (value: any) => {
    setToAddress(value);
  };
  const debounceHandleChangeAddress = debounce(handleChangeAddress, 300);

  const tagRender = (props: any) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={true}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };
  const [isAddress, setIsAddress] = useState(false);

  useEffect(() => {
    setIsAddress(getUserByAddress?.data?.data === null);
  }, [getUserByAddress]);

  const addressExists = (_: any, value: string) => {
    return new Promise((resolve, reject) => {
      value !== "" || !isAddress ? reject() : resolve(value);
    });
  };
  const handleSubmit = (value: any) => {};
  return (
    <div>
      <Row>
        <Col span={8} offset={7} className="text-xl font-semibold">
          Transfer Information
        </Col>
      </Row>
      <Form name="useForm" className="login-form" onFinish={handleSubmit}>
        <Row className="pt-6">
          <Col
            span={8}
            className="text-xl font-semibold text-right pr-4 flex items-center  p-2"
          >
            <div>From</div>
          </Col>
          <Col span={8} className="text-xl font-semibold pl-4">
            <div className="transfer-bg px-2 py-1 flex items-center justify-between">
              <div className="text-base">{address}</div>
            </div>
          </Col>
        </Row>
        <Row className="pt-6">
          <Col
            span={8}
            className="text-xl font-semibold text-right pr-4 flex items-center  p-2"
          >
            <div>
              To <span className="pni-danger-text">&#0042;</span>
            </div>
          </Col>
          <Col span={8} className="text-xl pl-4">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter recipient’s public address ",
                },
                {
                  validator: addressExists,
                  message:
                    "The address provided is incorrect. Your transaction will not be completed",
                },
              ]}
            >
              <Input
                placeholder="Enter recipient’s public address"
                className=""
                onChange={(e) => debounceHandleChangeAddress(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="pt-6">
          <Col
            span={8}
            className="text-xl font-semibold text-right pr-4 flex items-center  p-2"
          >
            <div>Wallet Information</div>
          </Col>
          <Col span={8} className="text-xl font-semibold pl-4">
            <div className="transfer-bg px-2 py-1 flex items-center justify-between">
              <div className="text-base">
                {getUserByAddress?.data?.data?.username || "N/A"}
              </div>
            </div>
          </Col>
        </Row>
        <Row className="pt-6">
          <Col
            span={8}
            className="text-xl font-semibold text-right pr-4 flex items-center  p-2"
          >
            <div>
              NFT <span className="pni-danger-text">&#0042;</span>
            </div>
          </Col>
          <Col span={8} className="text-xl pl-4 pni-select">
            <Form.Item
              name="token_ids"
              rules={[{ required: true, message: "Please select NFT" }]}
            >
              <Select
                mode="multiple"
                suffixIcon={
                  <CaretDownOutlined style={{ color: "#343943" }} size={16} />
                }
                style={{ width: "100%" }}
                placeholder="select one country"
                optionLabelProp="label"
                tagRender={tagRender}
              >
                {optionsNFT.map((opt: any) => {
                  const label = joinArray(opt.metadata.attributes, "value");
                  return (
                    <Select.Option
                      value={opt.token_id}
                      label={label}
                      key={opt.token_id}
                    >
                      <div className="flex items-center">
                        <img
                          src={opt?.metadata?.image}
                          alt="image-nft"
                          width={40}
                          height={40}
                        />
                        <div className="pl-2">{label}</div>
                      </div>
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row className="pt-6">
          <Col
            span={10}
            offset={7}
            className="text-xl font-semibold pl-4 pni-select"
          >
            <Button
              className="mt-6 pni-button text-2xl w-full"
              type="primary"
              size="large"
              htmlType="submit"
            >
              <div className="font-semibold px-5">Continue</div>
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
