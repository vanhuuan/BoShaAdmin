import { Dialog, LinearProgress, DialogTitle, TextField, DialogContent, Button, TextareaAutosize, CircularProgress, DialogActions } from "@mui/material";
import React, { useEffect, useState } from "react";
import { categoriseService } from "../../services/categories.services";
import { NotificationManager } from "react-notifications";

const EditCategory = ({ id, isOpen, handleClose }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState()
    const [name, setName] = useState("Tên thể loại")
    const [desc, setDesc] = useState("Miêu tả thể loại")

    useEffect(() => {
        setIsLoading(true)
        console.log("Change")
        categoriseService.getCateory(id).then((rs) => {
            if (rs.data) {
                setCategory(rs.data)
                setName(rs.data.name)
                setDesc(rs.data.description)
                setIsLoading(false)
            } else {
                handleClose()
            }
        }).catch((err) => {
            console.log(err)
            handleClose()
        })
    }, [id])

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
            "CategoryId": id,
            "CategoryName": name,
            "CategoryDescription": desc
        }
        categoriseService.updateCategory(data).then((rs) => {
            NotificationManager.success("Cập nhật thành công", "Thành công", 2000)
            handleClose()
        }).catch((err) => {
            console.log(err)
            NotificationManager.error("Cập nhật không thành công", "Thất bại", 2000)
            handleClose()
        })
    }

    return (
        <>
            <Dialog open={isOpen} onClose={handleClose}>
                {isLoading === true ? <DialogContent><CircularProgress /></DialogContent> : <DialogContent>
                    <DialogTitle>Chỉnh sửa thông tin thể loại</DialogTitle>
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
                            minRows={3}
                            style={{width: "500px"}}
                            value={desc}
                            onChange={(e) => { setDesc(e.target.value) }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button variant="primary" onClick={onUpdate}>Lưu</Button>
                    </DialogActions>
                </DialogContent>
                }
            </Dialog>

        </>
    )
}



export default EditCategory