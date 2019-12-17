import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



function SafeCheck(props) {
    const { title, content, children } = props;

    const [open, setOpen] = useState(true);

    const onClose = () => setOpen(false);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="title"
        >
            <DialogTitle id="title">
                {title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                    color="secondary"
                    variant='contained'
                >
                    Cancel
                </Button>

                {children}

            </DialogActions>
        </Dialog>
    );
}

SafeCheck.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.any.isRequired,
};

export default SafeCheck;


