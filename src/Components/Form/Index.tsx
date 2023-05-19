import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Transaction from "../../Modals/transactions";
import success from "../../utils/generateMessage";
import FormField from "./FormField";
import {
    monthsNames,
    transactionTypes,
    accountData,
    MAX_FILE_SIZE,
} from "../../utils/Constants";
import { useParams } from "react-router-dom";
import { Button, Typography, message } from "antd";
import { RootState } from "../../store/Index";
import { useDispatch, useSelector } from "react-redux";
import {
    addTransaction,
    updateTransaction,
} from "../../store/Slices/transactionSlice";

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
const initialVal: Transaction = {
    transDate: "",
    monthYear: "",
    transactionType: "",
    fromAccount: "",
    toAccount: "",
    amount: 0,
    notes: "",
    receipt: "",
};

const Form: React.FC = () => {
    const { id } = useParams<string>();
    const [transaction, setTransaction] = useState<Transaction | undefined>(
        initialVal
    );
    const [preview, setPreview] = useState<string>("");
    const state = useSelector((state: RootState) => state.transaction.value);
    const lang = useSelector((state: RootState) => state.languages.value);
    const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        if (id) {
            const local: Transaction[] = [...state];
            const temp =
                local &&
                local?.find((cur) => cur?.id === parseInt(id as string));
            setTransaction(temp);
            setPreview(temp?.receipt as string);
        } else {
            setTransaction(initialVal);
            setPreview("");
        }
        // eslint-disable-next-line
    }, [id]);

    const values: any = { ...transaction };
    const {
        handleSubmit,
        formState: { errors },
        setValue,
        control,
    } = useForm<Transaction>({
        values,
        resolver: yupResolver(addSchema),
    });

    const dispatch = useDispatch();

    const submitData = async (data: Transaction) => {
        if (preview) data.receipt = preview;
        if (id) {
            dispatch(updateTransaction(data));
            success(messageApi,"Data Updated successfully");
        } else {
            dispatch(addTransaction(data));
            success(messageApi,"Data Inserted successfully");
        }
    };

    const allValues = { errors, setValue, control };

    return (
        <>
            {contextHolder}
            <Title level={3}>{id ? lang.edit : lang.add}</Title>
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
                    <FormField
                        name="receipt"
                        type="file"
                        {...allValues}
                        preview={preview}
                        setPreview={setPreview}
                    />

                    <FormField name="notes" type="textarea" {...allValues} />
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        style={{ marginTop: "20px" }}
                    >
                        {id ? lang.editTitle : lang.add}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default Form;
