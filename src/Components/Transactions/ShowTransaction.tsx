import React from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import Transaction from "../../Modals/transactions";
import columnLabel from "../../utils/columnLabel";
import { Link } from "react-router-dom";

const ShowTransaction: React.FC = () => {
    const local: Transaction[] =
        localStorage.getItem("TS") &&
        JSON.parse(localStorage.getItem("TS") as string);

    const columnsArr = Object.keys(local[0]);
    const localColumns: ColumnsType<Transaction> = [
        ...columnsArr.map((column) => {
            if (column === "receipt") {
                return {
                    title: columnLabel(column),
                    width: 100,
                    dataIndex: column,
                    key: column,
                    render: (r: string) => (
                        <img src={r as string} width={40} height={40} />
                    ),
                };
            }
            return {
                title: columnLabel(column),
                // width: 100,
                dataIndex: column,
                key: column,
            };
        }),
        {
            title: "Actions",
            width: 100,
            dataIndex: "id",
            key: "0",
            render: (r) => (
                <div style={{display:"flex",gap:"5px"}}>
                    <Button type="primary" >
                        <Link to={`/${r}`}>Edit</Link>
                    </Button>
                    <Button type="primary" danger>Delete</Button>
                </div>
            ),
        },
    ];
    const localData: Transaction[] = [...local];

    return (
        <>
            <Title level={4}>Show Transactions</Title>
            <Table
                columns={localColumns}
                dataSource={localData}
                // scroll={{ x: 1500, y: 400 }}
                pagination={false}
            />
        </>
    );
};

export default ShowTransaction;
