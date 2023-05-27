import { Dialog, LinearProgress, DialogTitle, TextField, DialogContent, Button, TextareaAutosize, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { categoriseService } from "../../services/categories.services";
import { NotificationManager } from "react-notifications";

const EditCategory = ({ id, isOpen, handleClose, DialogActions }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState()
    const [name, setName] = useState("Tên thể loại")
    const [desc, setDesc] = useState("Miêu tả thể loại")

    useState(() => {
        setIsLoading(true)
        categoriseService.getCateory(id).then((rs) => {
            if(rs.data){
                setCategory(rs.data)
                setName(rs.data.name)
                setDesc(rs.description)
                setIsLoading(false)
            }
            handleClose()
        }).catch((err) => {
            console.log(err)
            handleClose()
        })
    }, [])

    const onUpdate = () => {
        if(name.length < 5 || name.length > 20){
            NotificationManager.error("Tên phải từ 5-20 ký tự")
            return 
        }
        if(desc.length < 20 || desc.length > 300){
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
        }).catch((err) =>{
            console.log(err)
            NotificationManager.error("Cập nhật không thành công", "Thất bại", 2000)
            handleClose()
        })    
    }

    return (
        <>
            {isLoading === true ? <CircularProgress /> :
                <Dialog open={isOpen} onClose={handleClose}>
                    <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={(e) => { setName(e.target.value)}}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextareaAutosize
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={desc}
                            onChange={(e) => { setDesc(e.target.value)}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button variant="primary" onClick={onUpdate}>Lưu</Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    )
}

const AddCategory = ({ isOpen, handleClose, DialogActions }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [name, setName] = useState("Tên thể loại")
    const [desc, setDesc] = useState("Miêu tả thể loại")

    const onUpdate = () => {
        if(name.length < 5 || name.length > 20){
            NotificationManager.error("Tên phải từ 5-20 ký tự")
            return 
        }
        if(desc.length < 20 || desc.length > 300){
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
        }).catch((err) =>{
            console.log(err)
            NotificationManager.error("Thêm thể loại không thành công", "Thất bại", 2000)
            handleClose()
        })    
    }

    return (
        <>
            {isLoading === true ? <CircularProgress /> :
                <Dialog open={isOpen} onClose={handleClose}>
                    <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={(e) => { setName(e.target.value)}}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextareaAutosize
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={desc}
                            onChange={(e) => { setDesc(e.target.value)}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button variant="primary" onClick={onUpdate}>Thêm</Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    )
}

export { EditCategory, AddCategory }