import { columns } from "./Constants";

const columnLabel = (name: string) => {
    const findLabel: { show: string; db: string } | undefined = columns?.find(
        (column) => column.db === name
    );

    if (findLabel) {
        return findLabel["show"];
    }
};

export default columnLabel;
