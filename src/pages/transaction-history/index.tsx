import { Typography, Table, Tag, Pagination, Skeleton } from "antd";
import { useGetTransactionHistoryQuery } from "~/app/services/transactionService";
import { useState } from "react";
import Link from "next/link";
export default function TransactionHistory() {
  const [paginator, setPaginator] = useState({
    page: 1,
    limit: 10,
  });
  const { Title } = Typography;
  const fetchTransaction = useGetTransactionHistoryQuery(paginator);

  const dataSource = [
    {
      id: 1,
      hash: "0xb7cff8568a791a321ee76...",
      time: "2023-06-07 16:33:54",
      status: "pending",
      gas: "0.00",
      from: "Admin Name 1",
      type: "out",
      to: "David",
      nft: "Jelly, Jelly",
    },
    {
      id: 2,
      hash: "0xb7cff8568a791a321ee76...",
      time: "2023-06-07 16:33:54",
      status: "error",
      gas: "0.00",
      from: "Admin Name 1",
      type: "in",
      to: "David",
      nft: "Jelly, Jelly",
    },
    {
      id: 3,
      hash: "0xb7cff8568a791a321ee76...",
      time: "2023-06-07 16:33:54",
      status: "completed",
      gas: "0.00",
      from: "Admin Name 1",
      type: "in",
      to: "David",
      nft: "Jelly, Jelly",
    },
  ];

  const columns = [
    {
      title: "Txn Hash",
      dataIndex: "hash",
      key: "hash",
      render: (_: any, record: any) => (
        <>
          <Link href="/" className="hover:underline">
            {record.hash}
          </Link>
        </>
      ),
    },
    {
      title: "Date Time (JST)",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: any) => (
        <div
          className={`py-1 px-3 uppercase ${
            record.status === "error"
              ? "pni-danger-text"
              : record.status === "completed"
              ? "pni-success-text"
              : ""
          }`}
        >
          {record.status}
        </div>
      ),
    },
    {
      title: "Gas Fee",
      dataIndex: "gas",
      key: "gas",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "",
      dataIndex: "type",
      key: "type",
      render: (_: any, record: any) => (
        <Tag color={record.type === "out" ? "#D9D9D9" : "#343943"}>
          <div className="py-1 px-3 font-semibold uppercase">{record.type}</div>
        </Tag>
      ),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "Transfered NFT",
      dataIndex: "nft",
      key: "nft",
    },
  ];

  const handleChangePage = (e: any) => {
    setPaginator((prevState) => ({
      ...prevState,
      page: e,
    }));
  };
  return (
    <div className={``}>
      <Title level={3} className="pb-5">
        Transaction History
      </Title>
      {!fetchTransaction.isLoading && (
        <div>
          {fetchTransaction.data.data && fetchTransaction.data.data.length ? (
            <div>
              <Table
                rowKey="id"
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
              <div className="flex justify-end pt-5">
                <Pagination
                  size="small"
                  onChange={(e) => handleChangePage(e)}
                  total={50}
                  defaultCurrent={paginator.page}
                  showTotal={(total, range) =>
                    `${range[0]} to ${range[1]} out of ${total} items`
                  }
                />
              </div>
            </div>
          ) : (
            <div className="bg-white py-10">
              <div className="text-base font-semibold text-center">
                No data to display
              </div>
            </div>
          )}
        </div>
      )}

      {/* {fetchTransaction.isLoading ? (
        <Skeleton avatar paragraph={{ rows: 4 }} />
      ) : (
        <div>
          <Table
            rowKey="id"
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
          <div className="flex justify-end pt-5">
            <Pagination
              size="small"
              onChange={(e) => handleChangePage(e)}
              total={50}
              defaultCurrent={paginator.page}
              showTotal={(total, range) =>
                `${range[0]} to ${range[1]} out of ${total} items`
              }
            />
          </div>
        </div>
      )} */}
    </div>
  );
}
