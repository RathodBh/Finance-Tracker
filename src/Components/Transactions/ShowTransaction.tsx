import React from "react";
import { Button, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import Transaction from "../../Modals/transactions";
import columnLabel from "../../utils/columnLabel";
import { Link } from "react-router-dom";
import { RootState } from "../../store/Index";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../store/Slices/transactionSlice";

const ShowTransaction: React.FC = () => {
    // const [trans,setTrans] = useState<Transaction[]>([])
    const state = useSelector((state:RootState) => {
        return state.transaction.value || []
    })
    console.log(state);
    
    
    const dispatch = useDispatch()

    // useEffect(() => {
    //     setTrans([...state])
    // },[state]);
    const local: Transaction[] = [...state];
    console.log("🚀 ~ file: ShowTransaction.tsx:21 ~ local:", local,state)
    const columnsArr = local.length > 0 ? Object.keys(local[0]).filter((cur) => cur !== "id"): [];
    const localColumns: ColumnsType<Transaction> = columnsArr && [
        ...columnsArr?.map((column, i) => {
            let data = {
                title: columnLabel(column),
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
            title: "Actions",
            width: 100,
            dataIndex: "id",
            key: 0,
            render: (r) => (
                <div style={{ display: "flex", gap: "5px" }}>
                    <Button type="default">
                        <Link to={`/${r}`}>Edit</Link>
                    </Button>
                    <Popconfirm
                        placement="leftTop"
                        title="Delete"
                        description="Are you sure to delete this transaction?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteTrans(r)}
                    >
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            ),
            fixed: "right",
        },
    ];
    const localData: Transaction[] = local && [...local];

    const deleteTrans = (id: string) => {
        dispatch(deleteTransaction(id))
        // const newData = localData.filter(
        //     (cur) => cur.id === parseInt(id as string)
        // );
        // localStorage.setItem("TS", JSON.stringify([...newData]));
    };
    return (
        <>
            <Title level={4}>Show Transactions</Title>
            <Table
                columns={localColumns}
                dataSource={localData}
                scroll={{ x: 1500 }}
                pagination={false}
                bordered={true}
            />
        </>
    );
};

export default ShowTransaction;
