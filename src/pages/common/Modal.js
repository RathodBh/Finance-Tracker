import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Modal({ open, toggleModal, title = "", message, onClick=toggleModal, Btntext }) {
  return (
    <div>
      <Dialog
        open={open}
        fullWidth="sm"
        onClose={toggleModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "gray",
              "&:hover": { background: "silver" },
            }}
            onClick={toggleModal}
          >
            No
          </Button>
          <Button variant="contained" autoFocus onClick={onClick}>
            {Btntext}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Modal;
