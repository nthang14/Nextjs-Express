import "./style.scss";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useAuthLogoutMutation } from "~/app/services/authService";
import { logout } from "~/app/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Tag from "~/components/common/Tag";
export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [logoutApi] = useAuthLogoutMutation();
  const handleLogout = async () => {
    const result: any = await logoutApi({});
    dispatch(logout());
    router.push("/auth/login");
  };
  return (
    <div className="flex items-center justify-between">
      <Tag color="#343943">
        <div className="font-semibold text-[24px]">PNI23064</div>
      </Tag>
      <div className="flex items-center justify-around">
        <Avatar size="large" icon={<UserOutlined />} />
        <div className="font-bold px-2 pr-3">Name</div>
        <DownOutlined />
      </div>
    </div>
  );
}
