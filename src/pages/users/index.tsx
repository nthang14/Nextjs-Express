import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "~/app/services/userService";
import { Space, Table, Tag, Button } from "antd";
export default function Users() {
  const [deleteUser] = useDeleteUserMutation();
  const fetchUser = useGetUsersQuery({});
  const handleDelete = async (data: any) => {
    const result = await deleteUser(data._id);
    if (result) {
      fetchUser.refetch();
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      render: (_: any, record: any) => (
        <img width={60} height={60} alt="avatar" src={record.avatar} />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (_: any, record: any) => <div>{record.username}</div>,
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button>Edit</Button>
          <Button onClick={(e) => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };
  return (
    <div className={``}>
      {fetchUser?.isSuccess && (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={fetchUser.data.data || []}
          rowKey="_id"
        />
      )}
    </div>
  );
}
