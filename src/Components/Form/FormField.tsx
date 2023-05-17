import React, { useState } from "react";
import Transaction from "../../Modals/transactions";
import {
    FieldErrors,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";
import columnLabel from "../../utils/columnLabel";
import toBase64 from "../../utils/toBase64";
// import Input from "antd/es/input/Input";
import { DatePickerProps, Select, DatePicker, Space, Button } from "antd";
import { Input } from "antd";
import { Typography } from "antd";
const { TextArea } = Input;
const { Title } = Typography;

interface Props {
    type?: string;
    name:
        | "transDate"
        | "monthYear"
        | "transactionType"
        | "fromAccount"
        | "toAccount"
        | "amount"
        | "notes"
        | "receipt";
    register: UseFormRegister<Transaction>;
    arr?: string[];
    errors: FieldErrors<Transaction>;
    getValues?: UseFormGetValues<Transaction> | undefined;
    setValue?: UseFormSetValue<Transaction> | undefined;
}

const FormField = (props: Props) => {
    const { type, name, register, arr, errors, getValues, setValue } = props;
    const [preview, setPreview] = useState("");

    const previewImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const convertedFile = await toBase64(file);
            if (setValue) setValue(name, file);
            setPreview(convertedFile as string);
        }
    };
    const removePreview = () => {
        setValue && setValue(name, "");
        setPreview("");
    };
    const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
        setValue && setValue(name, dateString as string);
    };
    const onSelectChange = (value: string) => {
        setValue && setValue(name, value as string);
        // console.log(`selected ${value}`);
    };
    const onDefaultChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setValue && setValue(name, e.target.value as string);
        // console.log(`selected ${e.target.value}`);
    };

    // const onSelectSearch = (value: string) => {
    //     // console.log("search:", value);
    // };

    const Field = () => {
        switch (type) {
            case "date":
                return (
                    <>
                        <DatePicker
                            size="large"
                            {...register(name)}
                            // name={name}
                            onChange={onDateChange}
                            style={{ width: "100%" }}
                            placeholder={"Enter " + columnLabel(name)}
                        />
                    </>
                );
            case "select":
                return (
                    <>
                        <Select
                            {...register(name)}
                            showSearch
                            placeholder={"Select " + columnLabel(name)}
                            optionFilterProp="children"
                            onChange={onSelectChange}
                            // onSearch={onSelectSearch}
                            filterOption={(input, option) =>
                                (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            options={arr?.map((cur) => {
                                return {
                                    value: cur,
                                    label: cur,
                                };
                            })}
                            size="large"
                            style={{ width: "100%" }}
                        />
                    </>
                );
            case "textarea":
                return (
                    <>
                        <TextArea
                            size="large"
                            {...register(name)}
                            style={{ width: "100%" }}
                            onChange={onDefaultChange}
                            autoSize={{ minRows: 2, maxRows: 4 }}
                            placeholder={"Enter " + columnLabel(name)}
                        />
                    </>
                );
            case "number":
                return (
                    <Input
                        size="large"
                        type="number"
                        // name={name}
                        {...register(name)}
                        onChange={onDefaultChange}
                        // style={{ width: "100%" }}
                        placeholder={"Enter " + columnLabel(name)}
                    />
                );
            case "file":
                return (
                    <>
                        <Input
                            type="file"
                            {...register(name)}
                            style={{
                                width: "100%",
                                border: "1px solid gainsboro",
                                padding: " 10px",
                            }}
                            onChange={(e) => previewImg(e)}
                        />
                        {preview && (
                            <>
                                <img
                                    src={preview}
                                    style={{
                                        height: "100px",
                                        width: "100px",
                                        margin: "20px 0",
                                    }}
                                />
                                <Button
                                    type="primary"
                                    onClick={(e) => removePreview()}
                                >
                                    Remove
                                </Button>
                            </>
                        )}
                    </>
                );
            default:
                return (
                    <Input
                        size="large"
                        {...register(name)}
                        style={{ width: "100%" }}
                        placeholder={"Enter " + columnLabel(name)}
                    />
                );
        }
    };

    return (
        <>
            <div>
                <Title level={5}>Enter {columnLabel(name)}</Title>
                {Field()}
                {errors[name] && (
                    <span style={{ color: "red" }}>
                        {errors[name]?.message}
                    </span>
                )}
            </div>
        </>
    );
};

export default FormField;
