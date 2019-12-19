import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



function SafeCheck(props) {
    const { title, content, children, action } = props;

    const [open, setOpen] = useState(false);

    const onClose = () => setOpen(false);

    return (
        <>
            <div onClick={() => setOpen(true)}>{children}</div>

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

                    <Button
                        onClick={() => {
                            action();
                            onClose();
                        }}
                        color="primary"
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
    children: PropTypes.any.isRequired,
};

export default SafeCheck;


