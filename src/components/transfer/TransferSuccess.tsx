import { Typography } from "antd";
import Image from "next/image";
import checked from "~/assets/images/checked.png";
import Link from "next/link";
export default function TransferSuccess() {
  const { Title } = Typography;

  return (
    <div>
      <div>
        <Title level={3} className="text-center">
          Transaction is created!
        </Title>
        <div className="text-center py-4">
          <Image src={checked} alt="checked" />
        </div>
        <div className="text-xl font-normal text-center">
          Click{" "}
          <Link
            href="/transaction-history"
            className="font-semibold underline hover:underline decoration-1 hover:decoration-1"
          >
            here
          </Link>{" "}
          to see Transaction History
        </div>
      </div>
    </div>
  );
}
