import { columns } from "./Constants";

const columnLabel = (name: string) => {
    const findLabel: { show: string; db: string } | undefined = columns?.find(
        (column) => column.db === name
    );

    if (findLabel) {
        return findLabel["show"];
    }
};

export const columnDb = (name: string) => {
    const findDbName: { show: string; db: string } | undefined = columns?.find(
        (column) => column.show === name
    );

    if (findDbName) {
        return findDbName["db"];
    }else{
        return "0"
    }
};

export default columnLabel;


