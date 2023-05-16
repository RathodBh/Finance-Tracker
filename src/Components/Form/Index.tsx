import React from "react";
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
                            console.log("VAL", value);
                            if (value instanceof FileList) {
                                console.log("Yes");
                                return value[0]?.size <= MAX_FILE_SIZE;
                            } else {
                                console.log("No");
                                return true;
                            }
                        }
                    ),
            }),
        notes: Yup.string().required("Please select notes"),
    },
    [["receipt", "receipt"]]
);

const Form = () => {
    const { id } = useParams<string>();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm<Transaction>({
        resolver: yupResolver(addSchema),
    });

    const submitData = async (data: Transaction) => {
        
        if (data?.receipt) {
            const convertedFile = await toBase64(Object.values(data.receipt)[0]);
            data.receipt = convertedFile as string;
        }
        // console.log(data);

        localStorage.setItem("TS", JSON.stringify([data]));
    };

    return (
        <>
            {id ? "Edit" : "Add"} Transaction
            <div>
                <form onSubmit={handleSubmit(submitData)}>
                    <FormField
                        name="transDate"
                        type="date"
                        register={register}
                        errors={errors}
                    />
                    <FormField
                        name="monthYear"
                        type="select"
                        arr={monthsNames}
                        register={register}
                        errors={errors}
                    />
                    <FormField
                        name="transactionType"
                        type="select"
                        arr={transactionTypes}
                        register={register}
                        errors={errors}
                    />
                    <FormField
                        name="fromAccount"
                        type="select"
                        arr={accountData}
                        register={register}
                        errors={errors}
                    />
                    <FormField
                        name="toAccount"
                        type="select"
                        arr={accountData}
                        register={register}
                        errors={errors}
                    />
                    <FormField
                        name="amount"
                        type="number"
                        register={register}
                        errors={errors}
                    />
                    <FormField
                        name="receipt"
                        type="file"
                        register={register}
                        errors={errors}
                    />

                    <FormField
                        name="notes"
                        type="textarea"
                        register={register}
                        errors={errors}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        </>
    );
};

export default Form;
