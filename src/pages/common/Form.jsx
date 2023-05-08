import React, { useEffect, useState } from "react";
import { NAME } from "../../utils/Constants";
import { getData, setData } from "../../services/LocalStorageService";
//MUI
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate, useParams } from "react-router-dom";
import {
  MAX_FILE_SIZE,
  monthsNames,
  transactionTypes,
  accountData,
} from "../../utils/Constants";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const initialValues = {
  transDate: "",
  monthYear: "",
  transactionType: "",
  fromAccount: "",
  toAccount: "",
  amount: "",
  notes: "",
  receipt: "",
};

const formSchema = yup.object().shape(
  {
    transDate: yup.string().required("Please select transaction date"),
    monthYear: yup.string().required("Please select month year"),
    transactionType: yup.string().required("Please select transaction type"),
    fromAccount: yup.string().required("Please select from Account"),
    toAccount: yup
      .string()
      .notOneOf([yup.ref("fromAccount")])
      .required("Please select to Account"),
    amount: yup
      .number()
      .min(1)
      .positive()
      .integer()
      .required("Please select amount"),
    receipt: yup
      .mixed()
      .nullable()
      .notRequired()
      .when("receipt", {
        is: (value) => value?.length,
        then: (rule) =>
          rule.test(
            "valid-size",
            "Max allowed size is 1MB",
            (value) => value && value.size <= MAX_FILE_SIZE
          ),
      }),
    notes: yup.string().required("Please select notes"),
  },
  [["receipt","receipt"]]
);

const Form = () => {
  const [val, setVal] = useState(initialValues);

  const { id } = useParams();
  const values = val;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    values,
    resolver: yupResolver(formSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) checkMode();

    // eslint-disable-next-line
  }, [id]);
  const checkMode = () => {
    if (id) {
      const allData = getData();
      const thisData = allData?.find(
        (user) => parseInt(user.id) === parseInt(id)
      );
      setVal(thisData);
    }
  };

  const submitData = async (data) => {
    const {
      transDate,
      monthYear,
      transactionType,
      fromAccount,
      toAccount,
      amount,
      notes,
    } = data;

    const receipt = val?.receipt;

    const uniqueId = new Date().getTime();
    const newData = {
      id: !!id ? parseInt(id) : uniqueId,
      transDate,
      monthYear,
      transactionType,
      fromAccount,
      toAccount,
      amount,
      notes,
      receipt,
    };
    if (!!id) {
      const allData = getData();
      const updatedData = allData.map((data) => {
        if (parseInt(data.id) === parseInt(id)) {
          return { ...newData };
        }
        return data;
      });
      localStorage.setItem(NAME, JSON.stringify([...updatedData]));
      toast.success("Data updated successfully");
      // toggleModal();
    } else {
      // toggleModal();
      toast.success("Data added successfully");

      setData(newData);
      setVal(initialValues);

      navigate("/transactions");
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const previewImg = async (e) => {
    const img = e.target.files[0];
    const keyName = e.target.name;

    const keyValue = await toBase64(img);
    setVal({
      ...val,
      [keyName]: keyValue,
    });
  };

  const removeImg = () => {
    //using useForm we can remove the value of receipt input
    setValue("receipt", "");

    //set state
    setVal({ ...val, receipt: "" });
  };

  return (
    <>
      <div className="allCenter m-2">
        <h1>{id ? "Edit data" : "Add data"}</h1>
        <form onSubmit={handleSubmit(submitData)}>
          <div>
            <label htmlFor="">Transaction date</label>
            <input type="date" {...register("transDate")} />
            {errors?.transDate && (
              <span className="err">{errors?.transDate?.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="">Month Year</label>
            <select defaultValue={""} {...register("monthYear")}>
              <option hidden disabled value="">
                Select Month year
              </option>
              {monthsNames?.length > 0 &&
                monthsNames?.map((month, i) => (
                  <option value={month} key={i}>
                    {month}
                  </option>
                ))}
            </select>
            {errors?.monthYear && (
              <span className="err">{errors?.monthYear?.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="">Transaction Type</label>
            <select defaultValue={""} {...register("transactionType")}>
              <option disabled value="">
                Select Transaction type
              </option>
              {transactionTypes.length > 0 &&
                transactionTypes?.map((t, i) => (
                  <option value={t} key={i}>
                    {t}
                  </option>
                ))}
            </select>
            {errors?.transactionType && (
              <span className="err">{errors?.transactionType?.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="">Transaction: From Account</label>
            <select defaultValue={""} {...register("fromAccount")}>
              <option disabled value="">
                From Account
              </option>
              {accountData.map((a, i) => (
                <option value={a} key={i}>
                  {a}
                </option>
              ))}
            </select>
            {errors?.fromAccount && (
              <span className="err">{errors?.fromAccount?.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="">Transaction: To Account</label>
            <select defaultValue={""} {...register("toAccount")}>
              <option disabled value="">
                To Account
              </option>
              {accountData.map((a, i) => (
                <option value={a} key={i}>
                  {a}
                </option>
              ))}
            </select>
            {errors?.toAccount && (
              <span className="err">{errors?.toAccount?.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="">Amount:</label>
            <input type="number" {...register("amount")} />
            {errors?.amount && (
              <span className="err">{errors?.amount?.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="">Receipt:</label>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg, image/jpg"
              {...register("receipt", { onChange: previewImg })}
              style={{ border: "1px solid gray" }}
              className="m-2"
            />
            {val?.receipt && (
              <>
                <img
                  src={val?.receipt}
                  style={{
                    height: "150px",
                    width: "150px",
                    objectFit: "cover",
                  }}
                  alt={"a"}
                />
                <span
                  className="allCenter"
                  style={{
                    display: "inline-block",
                    width: "auto",
                    padding: "10px",
                    margin: "10px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    border: "1px solid gainsboro",
                  }}
                  onClick={removeImg}
                >
                  <DeleteIcon />
                </span>
              </>
            )}
            {errors?.receipt && (
              <span className="err">{errors?.receipt?.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="">Notes:</label>
            <textarea {...register("notes")} />
            {errors?.notes && (
              <span className="err">{errors?.notes?.message}</span>
            )}
          </div>

          <div>
            <Button variant="contained" type="submit">
              {id ? "UPDATE" : "ADD DATA"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
