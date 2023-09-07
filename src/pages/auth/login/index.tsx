import { Button, Col, Form, Row, Typography, Input, notification } from "antd";
import { useAuthLoginMutation } from "~/app/services/authService";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import loginBackground from "~/assets/images/login_background.png";
import Tag from "~/components/common/Tag";
import Image from "next/image";
import {
  saveOTP,
  savePassword,
  saveMnemonic,
  saveAddressWallet,
} from "~/utils/storage";
export default function Login() {
  const [form] = Form.useForm();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { Text } = Typography;
  const [error, setError] = useState(false);
  const router = useRouter();
  const [login, { isLoading }] = useAuthLoginMutation();
  const handleLogin = async (value: any) => {
    const result: any = await login(value);

    if (!!result && result.data) {
      savePassword(value.password);
      notification.success({
        message: "Login successfully!",
        duration: 3000,
      });
      let url = "/";
      if (typeof result.data.data === "string") {
        saveOTP(result.data.data);
        url = "/generate-wallet";
      } else {
        saveAddressWallet(result.data.data.address);
        saveMnemonic(result.data.data.mnemonic);
      }
      router.push(url);
      return;
    }
    setError(true);
    notification.error({
      message: "Login successfully!",
      duration: 3000,
    });
  };

  return (
    <article id="login-page">
      <div className="login-page container mx-auto h-screen py-20">
        <Row justify="center" className="w-100 h-100">
          <Col span={24}>
            <Tag color="#343943">
              <div className="font-semibold text-[24px]">PNI23064</div>
            </Tag>
          </Col>
          <Col span={24} className="gutter-row">
            <div className="font-semibold text-6xl text-center py-16">
              Login to continue
            </div>
          </Col>
          <Col md={8} sm={10} xs={12}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{}}
              onFinish={handleLogin}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please enter Name/ ID" },
                  {
                    pattern: /^[a-zA-Z0-9]{8,}$/gim,
                    message:
                      "The information provided is incorrect. Please try again",
                  },
                ]}
              >
                <Input
                  placeholder="Name/ ID"
                  className="pni-input-login"
                ></Input>
              </Form.Item>
              {/* <Text type="danger" hidden={!error}>
                  The information provided is incorrect. Please try again
                </Text> */}
              <Form.Item
                name="password"
                className="pni-input-password"
                rules={[
                  { required: true, message: "Please enter Password" },
                  {
                    pattern:
                      /^((?=.*[A-Z])(?=.*[a-z])(?=.*[-_.+@?$\\\|\{\}\(\)\[\]\$%\&])).{8,}$/gim,
                    message:
                      "The information provided is incorrect. Please try again",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  className="pni-input-login"
                />
              </Form.Item>

              <Form.Item className="text-center" noStyle>
                <Button
                  size="large"
                  className="mt-6 pni-button text-2xl"
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isLoading}
                >
                  <div className="text-xl">Login</div>
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <div className="fixed bottom-0 right-0">
          <Image src={loginBackground} alt="image-background" width={300} />
        </div>
      </div>
    </article>
  );
}
