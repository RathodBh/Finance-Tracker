const useTable = ({ setErr }) => {
  const checkVal = (
    condition,
    errName,
    msg,
    condition2 = false,
    msg2 = "",
    condition3 = false,
    msg3 = ""
  ) => {
    if (condition) {
      setErr((err) => ({
        ...err,
        [errName]: msg,
      }));
    } else if (condition2) {
      setErr((err) => ({
        ...err,
        [errName]: msg2,
      }));
    } else if (condition3) {
      setErr((err) => ({
        ...err,
        [errName]: msg3,
      }));
    } else {
      setErr((err) => ({
        ...err,
        [errName]: "",
      }));
      return true;
    }
    return false;
  };

  return { checkVal };
};

export default useTable;
