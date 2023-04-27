import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { columns } from "./Add";
import { Link } from "react-router-dom";

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

const MaterialTable = ({ title, sort, arr, sortMethod , scroll,setScroll}) => {
 
  //Pagination with infinite scrolling

  useEffect(()=>{
    window.onscroll = function (ev) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setScroll(scroll + 2)
      }
    };
  },[scroll])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell colSpan={columns.length + 2}>
              {title}
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            {columns.map((c, i) => (
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
                <span onClick={(e) => sort(c.db, title)}>{c.show}</span>
              </StyledTableCell>
            ))}
            <StyledTableCell>Show</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arr?.map((d, i) => (
            <StyledTableRow key={i + 1}>
              <StyledTableCell>{i + 1}</StyledTableCell>
              <StyledTableCell>{d.transDate}</StyledTableCell>
              <StyledTableCell>{d.transactionType}</StyledTableCell>
              <StyledTableCell>{d.fromAccount}</StyledTableCell>
              <StyledTableCell>{d.toAccount}</StyledTableCell>
              <StyledTableCell>&#8377; {parseInt(d.amount).toLocaleString('en-IN')}</StyledTableCell>
              <StyledTableCell>
                <img
                  src={d.receipt}
                  alt=""
                  style={{
                    height: "150px",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                  }}
                />
              </StyledTableCell>
              <StyledTableCell>{d.notes}</StyledTableCell>
              <StyledTableCell>
                <Link
                  to="/showInfo"
                  state={{ id: d.id }}
                  className="underline-none"
                >
                  &#128065;
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          )).splice(0,scroll)
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTable;
