import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { columns } from "../../utils/Constants";
import { Link } from "react-router-dom";
import Search from "../Search";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTrans } from "../../store/slices/financeSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const MaterialTable = ({ title, arr }) => {
    const [myArr, setMyArr] = useState([{}]);
    const [old, setOld] = useState([{}]);
    const [sortMethod, setSortMethod] = useState(1);
    const [pagination, setPagination] = useState({
        start: 0,
        limit: 3,
        page: 1,
    });
    const { trans } = useSelector((state) => state.finance);
    const dispatch = useDispatch()

    useEffect(() => {
        setOld([...arr]);
        setMyArr([...arr]);
    }, [arr]);

    const handlePagination = (e) => {
        let page = parseInt(e.currentTarget.innerText);

        if (Number.isNaN(page)) {
            const pageName = e.currentTarget
                .getAttribute("aria-label")
                .split(" ")[2];
            if (pageName === "next") {
                page = pagination.page + 1;
            } else if (pageName === "previous") {
                page = pagination.page - 1;
            }
        }
        setPagination({
            ...pagination,
            page: page,
        });
    };

    const setNewLimit = (e) => {
        setPagination({
            page: 1,
            limit: parseInt(e.target.value),
        });
    };

    const deleteData = (id, title) => {
        
        dispatch(setTrans((prev) => prev.filter((cur) => cur.id !== parseInt(id))));
        if (title)
            setMyArr((prev) => prev.filter((cur) => cur.id !== parseInt(id)));
    };

    const sort = (name) => {
        if (sortMethod > 2) {
            setSortMethod(1);
        } else {
            setSortMethod(sortMethod + 1);
        }
        let cloneData = [...arr];
        cloneData = [...trans];
        if (sortMethod === 1) {
            cloneData = cloneData.sort((a, b) => (a[name] > b[name] ? 1 : -1));
        } else if (sortMethod === 2) {
            cloneData = cloneData.sort((a, b) => (a[name] < b[name] ? 1 : -1));
        }
        setMyArr(cloneData);
    };

    return (
        <>
            <div style={{ margin: "20px" }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell colSpan={7}>
                                    {title ? title : "All Data"}
                                </StyledTableCell>
                                <StyledTableCell colSpan={3}>
                                    <Search setMy={setMyArr} oldData={old} />
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell>#</StyledTableCell>
                                {columns?.map((c, i) => (
                                    <StyledTableCell key={i}>
                                        <span>
                                            {sortMethod === 1 ? (
                                                <>&#8661; </>
                                            ) : sortMethod === 2 ? (
                                                <>&#8657; </>
                                            ) : (
                                                <>&#8659; </>
                                            )}
                                        </span>
                                        <span onClick={() => sort(c.db, title)}>
                                            {c.show}
                                        </span>
                                    </StyledTableCell>
                                ))}
                                <StyledTableCell>Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myArr
                                ?.map((d, i) => (
                                    <StyledTableRow key={i + 1}>
                                        <StyledTableCell>
                                            {i + 1}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {d.transDate}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {d.monthYear}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {d.transactionType}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {d.fromAccount}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {d.toAccount}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            &#8377;{" "}
                                            {parseInt(d.amount).toLocaleString(
                                                "en-IN"
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {d?.receipt?.length > 0 && (
                                                <img
                                                    src={d.receipt}
                                                    alt=""
                                                    style={{
                                                        height: "150px",
                                                        aspectRatio: "1/1",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {d.notes}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Link
                                                to={`/finance-form/${d?.id}`}
                                                className="underline-none"
                                            >
                                                <EditIcon />
                                            </Link>
                                            &nbsp;&nbsp;
                                            <span
                                                onClick={() => {
                                                    deleteData(
                                                        `${d.id}`,
                                                        title
                                                    );
                                                }}
                                            >
                                                <DeleteIcon />
                                            </span>
                                            &nbsp;&nbsp;
                                            <Link
                                                to={`/transactions/${d.id}`}
                                                className="underline-none"
                                            >
                                                <VisibilityIcon />
                                            </Link>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                                .splice(
                                    (pagination?.page - 1) * pagination?.limit,
                                    pagination?.limit
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {myArr && myArr?.length > 0 && (
                    <div className="allCenter jscb flex-row w-100 my-1">
                        <div className="d-flex">
                            <label htmlFor="limit" style={{ margin: "auto 0" }}>
                                Limit
                            </label>
                            <select
                                name=""
                                id="limit"
                                value={pagination?.limit}
                                className="mx-1 px-2 py-1"
                                onChange={setNewLimit}
                            >
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                            </select>
                        </div>
                        <Pagination
                            count={Math.ceil(myArr?.length / pagination?.limit)}
                            page={pagination?.page}
                            onChange={handlePagination}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default MaterialTable;
