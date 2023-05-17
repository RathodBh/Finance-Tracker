import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Transaction from "../../Modals/transactions";
import FormField from "./FormField";
import {
    monthsNames,
    transactionTypes,
    accountData,
    MAX_FILE_SIZE,
} from "../../utils/Constants";
import { useParams } from "react-router-dom";
import toBase64 from "../../utils/toBase64";
import { Button, Typography } from "antd";
const { Title } = Typography;

const addSchema = Yup.object().shape(
    {
        transDate: Yup.string().required("Please select transaction date"),
        monthYear: Yup.string().required("Please select month year"),
        transactionType: Yup.string().required(
            "Please select transaction type"
        ),
        fromAccount: Yup.string().required("Please select from Account"),
        toAccount: Yup.string()
            .notOneOf([Yup.ref("fromAccount")])
            .required("Please select to Account"),
        amount: Yup.number()
            .min(1)
            .positive()
            .integer()
            .required("Please select amount"),
        receipt: Yup.mixed()
            .nullable()
            .notRequired()
            .when("receipt", {
                is: (value: FileList) => value?.length,
                then: (rule) =>
                    rule.test(
                        "valid-size",
                        "Max allowed size is 1MB",
                        (value) => {
                            if (value instanceof FileList) {
                                return value[0]?.size <= MAX_FILE_SIZE;
                            } else {
                                return true;
                            }
                        }
                    ),
            }),
        notes: Yup.string().required("Please select notes"),
    },
    [["receipt", "receipt"]]
);

const Form: React.FC = () => {
    const { id } = useParams<string>();
    const transId: number = parseInt(id as string);
    const [transaction,setTractions] = useState<Transaction | undefined>();

    useEffect(() => {
        if (id) {
            console.log("MILA")
            const local: Transaction[] =
                localStorage.getItem("TS") &&
                JSON.parse(localStorage.getItem("TS") as string);
    
            const temp = local.find((cur) => cur.id === transId);
            console.log("🚀 ~ file: Index.tsx:69 ~ useEffect ~ temp:", temp)
            // console.log("🚀 ~ file: Index.tsx:66 ~ transaction:", transaction);
            // transaction &&
           setTractions(temp)
            // if (transaction) {
            //     for (const [key, value] of Object.entries(transaction)) {
            //         console.log(key, value);
            //         // setValue && setValue(key, value);
            //     }
            // }
            // setValue && setValue()
        }
    },[id])
    const values: any = { ...transaction };
    console.log("🚀 ~ file: Index.tsx:84 ~ values:", values)
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm<Transaction>({
        values,
        resolver: yupResolver(addSchema),
    });
    const submitData = async (data: Transaction) => {
        if (data?.receipt) {
            const convertedFile = await toBase64(
                Object.values(data.receipt)[0]
            );
            data.receipt = convertedFile as string;
        }
        data.id = new Date().getTime();

        // if(localStorage.getItem("TS"))
        localStorage.setItem("TS", JSON.stringify([data]));
    };

    const allValues = { errors, register, setValue, getValues };

    return (
        <>
            <Title level={3}>{id ? "Edit" : "Add"} Transaction</Title>
            <div>
                <form onSubmit={handleSubmit(submitData)}>
                    <FormField name="transDate" type="date" {...allValues} />
                    <FormField
                        name="monthYear"
                        type="select"
                        arr={monthsNames}
                        {...allValues}
                    />
                    <FormField
                        name="transactionType"
                        type="select"
                        arr={transactionTypes}
                        {...allValues}
                    />
                    <FormField
                        name="fromAccount"
                        type="select"
                        arr={accountData}
                        {...allValues}
                    />
                    <FormField
                        name="toAccount"
                        type="select"
                        arr={accountData}
                        {...allValues}
                    />
                    <FormField name="amount" type="number" {...allValues} />
                    <FormField name="receipt" type="file" {...allValues} />

                    <FormField name="notes" type="textarea" {...allValues} />
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        style={{ marginTop: "20px" }}
                    >
                        Add
                    </Button>
                </form>
            </div>
        </>
    );
};

export default Form;
