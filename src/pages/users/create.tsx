import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "~/app/services/userService";
import { Button, Checkbox, Form, Input, InputNumber } from "antd";
export default function CreateUser() {
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [form] = Form.useForm();
  const handleCreateUser = async () => {
    const payload = form.getFieldsValue();
    // console.log("create user");
    // const payload = {
    //   fullName: "Nguyễn Văn C",
    //   avatar:
    //     "https://png.pngtree.com/png-clipart/20220130/original/pngtree-uncle-cartoon-avatar-png-image_7246616.png",
    //   username: "nguyenvanb",
    //   password: "12345689",
    //   level: 2,
    // };
    const result = await createUser(payload);
    console.log("result", result);
  };
  const handleUpdateUser = async () => {
    // const payload = {
    //   fullName: "Nguyễn Văn C edit",
    //   avatar:
    //     "https://png.pngtree.com/png-clipart/20220130/original/pngtree-uncle-cartoon-avatar-png-image_7246616.png",
    //   username: "nguyenvanb",
    //   password: "12345689",
    //   level: 2,
    // };
    // const result = await updateUser({
    //   id: "64fed4cabbe646f6eab20fbf",
    //   payload: payload,
    // });
    // console.log("result updated", result);
  };
  return (
    <div>
      <Form
        form={form}
        name="control-hooks"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="avatar" label="Avatar">
          <Input />
        </Form.Item>

        <Form.Item name="username" label="Username">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input />
        </Form.Item>
        <Form.Item name="level" label="Level">
          <InputNumber />
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 16, span: 4 }}
          className="flex items-center"
        >
          <Button type="primary" htmlType="button" onClick={handleCreateUser}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
