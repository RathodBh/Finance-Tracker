import React, { useEffect, useState } from "react";
import { Button, Input, Pagination, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import Transaction from "../../Modals/transactions";
import PaginationInterface from "../../Modals/pagination";
import { columnDb } from "../../utils/columnLabel";
import { Link } from "react-router-dom";
import { RootState } from "../../store/Index";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../store/Slices/transactionSlice";
import Languages from "../../Modals/languages";
import { UpCircleOutlined, DownCircleOutlined } from "@ant-design/icons";
interface Props {
    data: Transaction[];
    field: string;
}
const TableComponent = ({ data, field }: Props) => {
    const [trans, setTrans] = useState<Transaction[]>([]);
    const [sortMethod, setSortMethod] = useState<string>("normal");
    const [pagination, setPagination] = useState<PaginationInterface>({
        start: 0,
        limit: 3,
        page: 1,
    });
    const state = useSelector((state: RootState) => {
        return state.transaction.value || [];
    });
    const lang = useSelector((state: RootState) => state.languages.value);

    useEffect(() => {
        if (data) setTrans([...data]);
    }, [data, state]);

    const dispatch = useDispatch();
    const mainData = data;

    const setSort = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = (event.target as HTMLElement).innerText;
        const getDbName: string = columnDb(target as keyof Transaction);
        sortMethod === "normal"
            ? setSortMethod("ASC")
            : sortMethod === "ASC"
            ? setSortMethod("DESC")
            : setSortMethod("normal");
        if (getDbName) {
            let cloneData = [...trans];
            if (sortMethod === "normal") {
                cloneData = cloneData.sort((a: Transaction, b: Transaction) =>
                    (a[getDbName as keyof Transaction] || {}) >
                    (b[getDbName as keyof Transaction] || {})
                        ? 1
                        : -1
                );
                setTrans([...cloneData]);
            } else if (sortMethod === "ASC") {
                cloneData = cloneData.sort((a: Transaction, b: Transaction) =>
                    (a[getDbName as keyof Transaction] || {}) <
                    (b[getDbName as keyof Transaction] || {})
                        ? 1
                        : -1
                );
                setTrans([...cloneData]);
            } else {
                setTrans([...trans]);
            }
        }
    };

    const local: Transaction[] = [...trans];
    const columnsArr =
        local.length > 0
            ? Object.keys(local[0]).filter((cur) => cur !== "id")
            : [];
    const localColumns: ColumnsType<Transaction> = columnsArr && [
        ...columnsArr?.map((column, i) => {
            let data = {
                title: (
                    <>
                        {sortMethod === "normal" ? (
                            <UpCircleOutlined />
                        ) : (
                            sortMethod === "ASC" && <DownCircleOutlined />
                        )}{" "}
                        {lang[column as keyof Languages]}
                    </>
                ),
                width: 100,
                dataIndex: column,
                key: i,
                render: (r: string) =>
                    column === "receipt" ? (
                        <img src={r as string} width={40} height={40} />
                    ) : (
                        <>{r}</>
                    ),
            };
            return data;
        }),
        {
            title: lang.action,
            width: 120,
            dataIndex: "id",
            key: 0,
            render: (r) => (
                <div style={{ display: "flex", gap: "5px" }}>
                    <Button type="default">
                        <Link to={`/transaction/${r}`}>{lang.edit}</Link>
                    </Button>
                    <Popconfirm
                        placement="leftTop"
                        title={lang.delete}
                        description={lang.deleteConfirm}
                        okText={lang.yes}
                        cancelText={lang.no}
                        onConfirm={() => deleteTrans(r)}
                    >
                        <Button type="primary" danger>
                            {lang.delete}
                        </Button>
                    </Popconfirm>
                </div>
            ),
            fixed: "right",
        },
    ];
    const localData: Transaction[] =
        local &&
        [...local].splice(
            (pagination?.page - 1) * pagination?.limit,
            pagination?.limit
        );

    const deleteTrans = (id: string) => {
        dispatch(deleteTransaction(id));
    };

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        const src = e.target?.value;
        const cloneData = [...mainData];
        const filteredData = cloneData?.filter(
            (cur) =>
                cur?.amount?.toString()?.includes(src) ||
                cur?.transDate?.toString()?.includes(src) ||
                cur?.transactionType?.toString()?.includes(src) ||
                cur?.notes?.toString()?.includes(src) ||
                cur?.fromAccount?.toString()?.includes(src) ||
                cur?.toAccount?.toString()?.includes(src) ||
                cur?.monthYear?.toString()?.includes(src)
        );
        setTrans(filteredData);
    };

    const setPage = (page: number, limit: number) => {
        console.log(page, limit);
        setPagination({
            ...pagination,
            page,
            limit,
        });
    };
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Title level={4} style={{ margin: "10px 0px" }}>
                    {field.length > 0 && field}
                </Title>
                <div>
                    <Input type="text" placeholder="Search" onChange={search} />
                </div>
            </div>
            <Table
                onHeaderRow={() => {
                    return {
                        onClick: setSort,
                    };
                }}
                columns={localColumns}
                dataSource={localData}
                scroll={{ x: 1500 }}
                pagination={false}
                bordered={true}
            />
            <Pagination defaultCurrent={1} total={mainData.length} onChange={setPage} />
        </>
    );
};

export default TableComponent;
