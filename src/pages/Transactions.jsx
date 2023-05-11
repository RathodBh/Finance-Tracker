import React from "react";

import MaterialTable from "./common/MaterialTable";
import { useSelector } from "react-redux";

const ShowData = () => {
    // const { trans: data, group } = useFinanceContext();

    const {trans:data,group} = useSelector((state) => state.finance);
    // console.log(
    //     "🚀 ~ file: Transactions.jsx:11 ~ ShowData ~ state:",
    //     data,
    //     group,
    //     JSON.stringify(group) !== "{}"
    // );
    // const dispatch = useDispatch();

    return (
        <>
            {/* if group by data is not found => show normal table  */}
            {JSON.stringify(group) === "{}" && (
                <>
                    <MaterialTable arr={data} />
                </>
            )}

            {/* if group by data  => show group table  */}
            {JSON.stringify(group) !== "{}" && (
                <>
                    {Object.keys(group)?.map((curKey, index) => {
                        return (
                            <MaterialTable
                                key={index}
                                title={curKey}
                                arr={group[curKey]}
                            />
                        );
                    })}
                </>
            )}
        </>
    );
};

export default ShowData;
