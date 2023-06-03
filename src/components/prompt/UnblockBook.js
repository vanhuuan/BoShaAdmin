import { Dialog, LinearProgress, DialogTitle, TextField, DialogContent, Button, TextareaAutosize, CircularProgress, DialogActions, DialogContentText } from "@mui/material";
import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import { bookService } from "../../services/book.services";
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UnBlockBook = ({ isOpen, book, handleClose }) => {
    const [reason, setReason] = useState("Lý do block")

    const onUpdate = () => {
        bookService.blockBook(book.id, reason).then((rs) => {
            NotificationManager.success("Bỏ chặn truyện thành công", "Thành công", 2000)
            handleClose()
        }).catch((err) => {
            console.log(err)
            NotificationManager.error(" Bỏ chặn truyện không thành công", "Thất bại", 2000)
            handleClose()
        })
    }

    return (
        <Dialog open={isOpen}
            onClose={handleClose}
            maxWidth="md"
            TransitionComponent={Transition}
            keepMounted>
            <DialogTitle>Bỏ chặn truyện {book.name} </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button variant="primary" onClick={onUpdate}>Bỏ chặn</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UnBlockBook