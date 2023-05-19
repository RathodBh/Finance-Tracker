// import React, { useEffect, useState } from "react";
// import { Button, Input, Popconfirm, Table } from "antd";
// import type { ColumnsType } from "antd/es/table";
// import Title from "antd/es/typography/Title";
// import Transaction from "../../Modals/transactions";
// import { columnDb } from "../../utils/columnLabel";
// import { Link } from "react-router-dom";
// import { RootState } from "../../store/Index";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteTransaction } from "../../store/Slices/transactionSlice";
// import Languages from "../../Modals/languages";
// import { UpCircleOutlined, DownCircleOutlined } from "@ant-design/icons";

// const ShowTransaction: React.FC = () => {
//     const [trans, setTrans] = useState<Transaction[]>([]);
//     const [sortMethod, setSortMethod] = useState<string>("normal");
//     const state = useSelector((state: RootState) => {
//         return state.transaction.value || [];
//     });
//     const lang = useSelector((state: RootState) => state.languages.value);

//     useEffect(() => {
//         setTrans([...state]);
//     }, [state]);

//     const dispatch = useDispatch();

//     const setSort = (event: React.MouseEvent<HTMLButtonElement>) => {
//         const target = (event.target as HTMLElement).innerText;
//         const getDbName: string = columnDb(target as keyof Transaction);
//         sortMethod === "normal"
//             ? setSortMethod("ASC")
//             : sortMethod === "ASC"
//             ? setSortMethod("DESC")
//             : setSortMethod("normal");
//         if (getDbName) {
//             let cloneData = [...trans];
//             if (sortMethod === "normal") {
//                 cloneData = cloneData.sort((a: Transaction, b: Transaction) =>
//                     (a[getDbName as keyof Transaction] || {}) >
//                     (b[getDbName as keyof Transaction] || {})
//                         ? 1
//                         : -1
//                 );
//                 setTrans([...cloneData]);
//             } else if (sortMethod === "ASC") {
//                 cloneData = cloneData.sort((a: Transaction, b: Transaction) =>
//                     (a[getDbName as keyof Transaction] || {}) <
//                     (b[getDbName as keyof Transaction] || {})
//                         ? 1
//                         : -1
//                 );
//                 setTrans([...cloneData]);
//             } else {
//                 cloneData = [...state];
//                 setTrans([...cloneData]);
//             }
//         }
//     };
//     const local: Transaction[] = [...trans];
//     const columnsArr =
//         local.length > 0
//             ? Object.keys(local[0]).filter((cur) => cur !== "id")
//             : [];
//     const localColumns: ColumnsType<Transaction> = columnsArr && [
//         ...columnsArr?.map((column, i) => {
//             let data = {
//                 title: (
//                     <>
//                         {sortMethod === "normal" ? (
//                             <UpCircleOutlined />
//                         ) : (
//                             sortMethod === "ASC" && <DownCircleOutlined />
//                         )}{" "}
//                         {lang[column as keyof Languages]}
//                     </>
//                 ),
//                 width: 100,
//                 dataIndex: column,
//                 key: i,
//                 render: (r: string) =>
//                     column === "receipt" ? (
//                         <img src={r as string} width={40} height={40} />
//                     ) : (
//                         <>{r}</>
//                     ),
//             };
//             return data;
//         }),
//         {
//             title: lang.action,
//             width: 120,
//             dataIndex: "id",
//             key: 0,
//             render: (r) => (
//                 <div style={{ display: "flex", gap: "5px" }}>
//                     <Button type="default">
//                         <Link to={`/${r}`}>{lang.edit}</Link>
//                     </Button>
//                     <Popconfirm
//                         placement="leftTop"
//                         title={lang.delete}
//                         description={lang.deleteConfirm}
//                         okText={lang.yes}
//                         cancelText={lang.no}
//                         onConfirm={() => deleteTrans(r)}
//                     >
//                         <Button type="primary" danger>
//                             {lang.delete}
//                         </Button>
//                     </Popconfirm>
//                 </div>
//             ),
//             fixed: "right",
//         },
//     ];
//     const localData: Transaction[] = local && [...local];

//     const deleteTrans = (id: string) => {
//         dispatch(deleteTransaction(id));
//     };

//     const search = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const data = e.target?.value;
//         const cloneData = [...state];
//         const filteredData = cloneData?.filter(
//             (cur) =>
//                 cur?.amount?.toString()?.includes(data) ||
//                 cur?.transDate?.toString()?.includes(data) ||
//                 cur?.transactionType?.toString()?.includes(data) ||
//                 cur?.notes?.toString()?.includes(data) ||
//                 cur?.fromAccount?.toString()?.includes(data) ||
//                 cur?.toAccount?.toString()?.includes(data) ||
//                 cur?.monthYear?.toString()?.includes(data)
//         );
//         setTrans(filteredData);
//     };
//     return (
//         <>
//             <div
//                 style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                 }}
//             >
//                 <Title level={4} style={{ margin: "10px 0px" }}>
//                     {lang?.showTransaction}
//                 </Title>
//                 <div>
//                     <Input type="text" placeholder="Search" onChange={search} />
//                 </div>
//             </div>
//             <Table
//                 onHeaderRow={() => {
//                     return {
//                         onClick: setSort,
//                     };
//                 }}
//                 columns={localColumns}
//                 dataSource={localData}
//                 scroll={{ x: 1500 }}
//                 pagination={false}
//                 bordered={true}
//             />
//         </>
//     );
// };

// export default ShowTransaction;
import React, { useEffect, useState } from "react";
import Table from "./Table";
import { Button, Select } from "antd";
import { groupBy } from "../../utils/Constants";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Index";
import Transaction from "../../Modals/transactions";
interface GroupInterface {
    [key: string]: Transaction[];
}

const ShowTransaction: React.FC = () => {
    const allData = useSelector((state: RootState) => state.transaction.value);
    const [group, setGroup] = useState<GroupInterface>({});
    const [column, setColumn] = useState<string>('');
    const state = useSelector((state: RootState) => {
        return state.transaction.value
    })
    console.log("🚀 ~ file: ShowTransaction.tsx:189 ~ state ~ state:", state)
    useEffect(() => {
        if (JSON.stringify(group) !== "{}") {
           groupData(column)
        }
    },[state])

    let initialGroup: GroupInterface = {};
    const groupData = (col: string) => {
        const groupByCategory =
        allData?.length > 0 &&
        allData?.reduce((group, product) => {
            const category = product[col as keyof Transaction];
            group[category as keyof Transaction] =
            group[category as keyof Transaction] ?? [];
            group[category as keyof Transaction].push(product);
            return group;
        }, initialGroup);
        setGroup(groupByCategory || {});
        setColumn(col)
    };
    const removeFilter = () => {
        setColumn("");
        setGroup(initialGroup)
    }
    return (
        <div>
            <label >Category</label>
            <Select
                value={column.length>0 && column || ""}
                style={{ width: "100%",margin:"15px 0" }}
                options={groupBy.map((select) => select)}
                onChange={groupData}
                placeholder={"Select category"}
            />
            {JSON.stringify(group) !== "{}" && (
                <Button type="default" onClick={removeFilter}>
                    Remove Filter
                </Button>
            )}
            {JSON.stringify(group) !== "{}" &&
                Object.keys(group)?.map((data, i) => {
                    return (
                        <Table
                            data={group[data as keyof Transaction]}
                            field={data as string}
                        />
                    );
                })}
            {JSON.stringify(group) === "{}" && (
                <Table data={[...state]} field={"ALL DATA"} />
            )}
        </div>
    );
};

export default ShowTransaction;
