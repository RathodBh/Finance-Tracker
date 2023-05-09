import React from "react";
import { columns } from "../../../../utils/Constants";

const InputField = ({
  field = "input",
  type = "text",
  name,
  arr = "",
  register,
  error,
}) => {
  const Field = () => {
    switch (field) {
      case "select":
        return (
          <>
            <select defaultValue={""} {...register(name)}>
              <option disabled value="">
                Select {columnLabel()}
              </option>
              {arr?.length > 0 &&
                arr?.map((t, i) => (
                  <option value={t} key={i}>
                    {t}
                  </option>
                ))}
            </select>
          </>
        );
      case "textarea":
        return (
            <>
            <textarea {...register(name)} />
          </>
        );
      default:
        return (
          <>
            <input type={type} {...register(name)} />
          </>
        );
    }
  };

  const columnLabel = () => {
    const findLabel = columns?.find((column) => column.db === name);
    return findLabel["show"];
  };

  return (
    <>
      <div>
        <label htmlFor={name}>{columnLabel()}</label>
        {Field()}
        {error && <span className="err">{error?.message}</span>}
      </div>
    </>
  );
};

export default InputField;
