import { Dialog, LinearProgress, DialogTitle, TextField, DialogContent, Button, TextareaAutosize, CircularProgress, DialogActions } from "@mui/material";
import React, { useState } from "react";
import { categoriseService } from "../../services/categories.services";
import { NotificationManager } from "react-notifications";

const AddCategory = ({ isOpen, handleClose }) => {
    const [name, setName] = useState("Tên thể loại")
    const [desc, setDesc] = useState("Miêu tả thể loại")

    const onUpdate = () => {
        if (name.length < 5 || name.length > 20) {
            NotificationManager.error("Tên phải từ 5-20 ký tự")
            return
        }
        if (desc.length < 20 || desc.length > 300) {
            NotificationManager.error("Tên phải từ 20-300 ký tự")
            return
        }
        const data = {
            "Name": name,
            "Description": desc
        }
        categoriseService.createCategory(data).then((rs) => {
            NotificationManager.success("Thêm thể loại thành công", "Thành công", 2000)
            handleClose()
        }).catch((err) => {
            console.log(err)
            NotificationManager.error("Thêm thể loại không thành công", "Thất bại", 2000)
            handleClose()
        })
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="md">
            <DialogTitle>Thêm thể loại</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Tên thể loại"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
            </DialogContent>
            <DialogContent>
                <TextareaAutosize
                    id="desc"
                    label="Miêu tả"
                    fullWidth
                    value={desc}
                    minRows={3}
                    style={{width: "500px"}}
                    onChange={(e) => { setDesc(e.target.value) }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button variant="primary" onClick={onUpdate}>Thêm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddCategory