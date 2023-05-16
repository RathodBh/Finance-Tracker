import React, { useState } from "react";
import Transaction from "../../Modals/transactions";
import {
    FieldErrors,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
} from "react-hook-form";
import { columns } from "../../utils/Constants";
import toBase64 from "../../utils/toBase64";

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
    const Field = () => {
        switch (type) {
            case "date":
                return (
                    <input
                        type="date"
                        {...register(name)}
                        placeholder={"Enter " + columnLabel()}
                    ></input>
                );
            case "select":
                return (
                    <>
                        <select defaultValue={""} {...register(name)}>
                            <option value={""} disabled>
                                Select {columnLabel()}
                            </option>
                            {arr?.map((cur) => {
                                return (
                                    <option value={cur} key={cur}>
                                        {cur}
                                    </option>
                                );
                            })}
                        </select>
                    </>
                );
            case "textarea":
                return (
                    <>
                        <textarea
                            {...register(name)}
                            style={{ resize: "none" }}
                            placeholder={"Enter " + columnLabel()}
                        />
                    </>
                );
            case "number":
                return (
                    <input
                        type="number"
                        {...register(name)}
                        placeholder={"Enter " + columnLabel()}
                    />
                );
            case "file":
                return (
                    <>
                        <input
                            type="file"
                            {...register(name)}
                            onChange={(e) => previewImg(e)}
                        />
                        {preview && (
                            <>
                                <img
                                    src={preview}
                                    style={{ height: "100px", width: "100px" }}
                                />
                                <button
                                    type="button"
                                    onClick={(e) => removePreview()}
                                >
                                    Remove
                                </button>
                            </>
                        )}
                    </>
                );
            default:
                return (
                    <input
                        type="text"
                        {...register(name)}
                        placeholder={"Enter " + columnLabel()}
                    />
                );
        }
    };

    const columnLabel = () => {
        const findLabel: { show: string; db: string } | undefined =
            columns?.find((column) => column.db === name);

        if (findLabel) {
            return findLabel["show"];
        }
    };

    return (
        <>
            <div>
                Enter {columnLabel()}
                {Field()}
                {errors[name] && (
                    <span className="err">{errors[name]?.message}</span>
                )}
            </div>
        </>
    );
};

export default FormField;
