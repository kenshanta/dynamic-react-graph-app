import React, { SetStateAction, Dispatch } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addHistoryEntry,
  removeHistoryEntry,
  addAgreementEntry,
  addDisagreementEntry,
} from "../stores/historySlice";

interface ConfirmationDialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  setOpen,
  open,
}) => {
  const dispatch = useDispatch();
  const onConfirm = () => {
    dispatch(addAgreementEntry());
    dispatch(addHistoryEntry());
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(addDisagreementEntry());

    dispatch(removeHistoryEntry());
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Use search history service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Would you like to store and access you search history? It will only be
          stored locally in the browser session and deleted once closed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button variant="contained" onClick={onConfirm}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
