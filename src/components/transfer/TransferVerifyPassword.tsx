import { Row, Col, Input, Button, Form } from "antd";
import { useVerifyPasswordMutation } from "~/app/services/transferService";
import { useState, useEffect } from "react";
export default function TransferVerifyPassword({ doSubmit }: any) {
  const validateId = async (value: string) => {
    // if (!isVerify) {
    //   return Promise.reject(
    //     "The information provided is incorrect. Please try again"
    //   );
    // } else {
    //   return Promise.resolve();
    // }
  };
  return (
    <div>
      <Row>
        <Col span={8} offset={7} className="text-xl font-semibold">
          Enter Password
        </Col>
      </Row>
      <Form name="normal_login" className="login-form" onFinish={doSubmit}>
        <Row className="pt-6">
          <Col
            span={8}
            className="text-xl font-semibold text-right pr-4 flex items-center  p-2"
          >
            <div>
              Password <span className="pni-danger-text">&#0042;</span>
            </div>
          </Col>
          <Col span={8} className="text-xl  pl-4">
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter Password" },
                {
                  pattern:
                    /^((?=.*[A-Z])(?=.*[a-z])(?=.*[-_.+@?$\\\|\{\}\(\)\[\]\$%\&])).{8,}$/gim,
                  message:
                    "The information provided is incorrect. Please try again",
                },
                {
                  validator: (rule, value) => validateId(value),
                },
              ]}
            >
              <Input.Password placeholder="Enter password" className="" />
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
