import { Dialog, DialogTitle, TextField, DialogContent, Button, TextareaAutosize, CircularProgress, DialogActions } from "@mui/material";
import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import { adminServices } from "../../services/admin.services";

const AddAdmin = ({ isOpen, handleClose }) => {
    const [mail, setMail] = useState("admin@mail.com")

    const onUpdate = () => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!mailformat.test(mail)) {
            NotificationManager.error("Email không đúng định dạng")
            return
        }

        adminServices.makeAdmin(mail).then((rs) => {
            NotificationManager.success("Thêm người quản trị thành công", "Thành công", 5000)
            handleClose()
        }).catch((err) => {
            console.log(err)
            NotificationManager.error("Thêm người quản trị không thành công", "Thất bại", 5000)
            handleClose()
        })
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="md">
            <DialogTitle>Thêm người quản trị bằng Email</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="mail"
                    label="Email"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={mail}
                    error={!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)}
                    onChange={(e) => { setMail(e.target.value) }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button variant="primary" onClick={onUpdate}>Thêm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddAdmin