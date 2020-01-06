import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";

function SafeCheck(props) {
  const { title, content, children, action } = props;
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);

  return (
    <>
      {React.cloneElement(children, { onClick: () => setOpen(true) })}
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Typography variant="h3">{title}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h5">{content}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              action();
              onClose();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

SafeCheck.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
  action: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
};

export default SafeCheck;
