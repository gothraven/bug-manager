import React from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



function SafeCheck(props) {
    const { title, content, opened, handleCancel, handleConfirm } = props;

    return (
        <Dialog
            open={opened}
            onClose={handleCancel}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                {title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText> {content}</DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="secondary" variant='contained'>
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

SafeCheck.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.any.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    opened: PropTypes.bool.isRequired,
};

export default SafeCheck;


