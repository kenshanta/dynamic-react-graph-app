import React, { SetStateAction, Dispatch } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";

interface ConfirmationDialogProps {
  handleClose: () => void;
  open: boolean;
  setUrlHistory: Dispatch<SetStateAction<string[]>>;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  handleClose,
  open,
  setUrlHistory,
}) => {
  const onConfirm = () => {
    setUrlHistory((prev) => [`${window.location.href}`, ...prev]);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        <Button onClick={onConfirm}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
