import React, { Dispatch, SetStateAction } from "react";
import Transaction from "../../Modals/transactions";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import {
    Control,
    Controller,
    FieldErrors,
    UseFormSetValue,
} from "react-hook-form";
import columnLabel from "../../utils/columnLabel";
import toBase64 from "../../utils/toBase64";
// import Input from "antd/es/input/Input";
import { DatePickerProps, Select, DatePicker, Button } from "antd";
import { Input } from "antd";
const { TextArea } = Input;

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
    // register: UseFormRegister<Transaction>;
    arr?: string[];
    errors: FieldErrors<Transaction>;
    // getValues?: UseFormGetValues<Transaction> | undefined;
    setValue?: UseFormSetValue<Transaction> | undefined;
    control: Control<Transaction>;
    preview?:string | undefined;
    setPreview?: Dispatch<SetStateAction<string>> | undefined;
}

const FormField = (props: Props) => {
    const { type, name, arr, errors, setValue, control, preview, setPreview } = props;
    // const [preview, setPreview] = useState<string>("");

   

    const previewImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const convertedFile = await toBase64(file);
            // if (setValue) setValue(name, convertedFile as string);
            setPreview && setPreview(convertedFile as string);
        }
    };
    const removePreview = () => {
        setValue && setValue(name, "");
        setPreview && setPreview("");
    };
    const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
        setValue && setValue(name, dateString as string);
    };
    const Field = () => {
        switch (type) {
            case "date":
                return (
                    <>
                        <Controller
                            name={name}
                            control={control}
                            render={({ field }) => {
                                return field.value !== "" ? (
                                    <DatePicker
                                        value={dayjs(
                                            field.value as string,
                                            "YYYY-MM-DD"
                                        )}
                                        onChange={onDateChange}
                                        style={{ width: "100%" }}
                                    />
                                ) : (
                                    <DatePicker
                                        onChange={onDateChange}
                                        style={{ width: "100%" }}
                                    />
                                );
                            }}
                        />
                    </>
                );
            case "select":
                return (
                    <>
                        <Controller
                            name={name}
                            control={control}
                            render={({ field }) => {
                                const newField = {
                                    ...field,
                                    value: field.value as string,
                                };
                                return (
                                    <Select
                                        showSearch
                                        placeholder={
                                            "Select " + columnLabel(name)
                                        }
                                        optionFilterProp="children"
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
                                        style={{ width: "100%" }}
                                        {...newField}
                                    />
                                );
                            }}
                        />
                    </>
                );
            case "textarea":
                return (
                    <>
                        <Controller
                            name={name}
                            control={control}
                            render={({ field }) => {
                                const newField = {
                                    ...field,
                                    value: field.value as string,
                                };
                                return (
                                    <TextArea
                                        placeholder={
                                            "Enter " + columnLabel(name)
                                        }
                                        autoSize={{ minRows: 2, maxRows: 4 }}
                                        {...newField}
                                    />
                                );
                            }}
                        />
                    </>
                );
            case "number":
                return (
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => {
                            const newField = {
                                ...field,
                                value: field.value as number,
                            };
                            return <Input type="number" {...newField} />;
                        }}
                    />
                );
            case "file":
                return (
                    <>
                        <Controller
                            name={name}
                            control={control}
                            // onChange={(e) => {previewImg()}}
                            render={({ field }) => {
                                const newField = {
                                    ...field,
                                    value: "",
                                };
                                return (
                                    <Input
                                        type="file"
                                        {...newField}
                                        onChange={previewImg}
                                    />
                                );
                            }}
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
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => {
                            const newField = {
                                ...field,
                                value: field.value as string,
                            };
                            return <Input type="text" {...newField} />;
                        }}
                    />
                );
        }
    };

    return (
        <>
            <div style={{ margin: "20px 0" }}>
                Enter {columnLabel(name)}
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
