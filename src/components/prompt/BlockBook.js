import { Dialog, LinearProgress, DialogTitle, TextField, DialogContent, Button, TextareaAutosize, CircularProgress, DialogActions } from "@mui/material";
import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import { bookService } from "../../services/book.services";

const BlockBook = ({ isOpen, book, handleClose }) => {
    const [reason, setReason] = useState("Lý do block")

    const onUpdate = () => {
        if (reason.length < 5 || reason.length > 1000) {
            NotificationManager.error("Tên phải từ 5-20 ký tự")
            return
        }
        bookService.blockBook(book.id, reason).then((rs) => {
            NotificationManager.success("Chặn truyện thành công", "Thành công", 2000)
            handleClose()
        }).catch((err) => {
            console.log(err)
            NotificationManager.error("Chặn truyện không thành công", "Thất bại", 2000)
            handleClose()
        })
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="md">
            <DialogTitle>Chặn truyện {book.name} </DialogTitle>
            <DialogContent>
                <TextareaAutosize
                    id="desc"
                    label="Lý do chặn"
                    fullWidth
                    value={reason}
                    minRows={3}
                    style={{width: "500px"}}
                    onChange={(e) => { setReason(e.target.value) }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button variant="primary" onClick={onUpdate}>Chặn</Button>
            </DialogActions>
        </Dialog>
    )
}

export default BlockBook