import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useContext } from "react";
import CategoriesAPI from "../../api/CategoriesAPI";
import { GlobalState } from "../../auth/GlobalState";

const CategoryDetails = (props) => {

    const id = props.id;

    const [category, setCategory] = React.useState({});
    const { setIsDelete, token } = useContext(GlobalState);

    useEffect(() => {
        CategoriesAPI.getCategorybyId(id).then((res) => {
            console.log(res.data)
            setCategory(res.data)
        }).catch((err) => {
            console.log(err);
        }
        )
    }, [id]);


    const handleDelete = () => {
        CategoriesAPI.deleteCategory(id, token).then((res) => {
            console.log(res.data);
            setIsDelete(true);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ marginBottom: 2 }}>
                Chi tiết danh mục
            </Typography>
            <Typography id="transition-modal-description" variant="subtitle1" component="p" sx={{ marginBottom: 2 }}>
                Tên danh mục: {category.name}
            </Typography>
            <Typography id="transition-modal-description" variant="subtitle1" component="p" sx={{ marginBottom: 2 }}>
                Mô tả: {category.content}
            </Typography>
            <Button sx={{
                backgroundColor: '#fff',
                color: '#00a8ff',
                fontSize: '14px',
                padding: '5px 20px',
                borderRadius: '5px',
            }} onClick={handleDelete}>
                Xóa danh mục
            </Button>
        </div>
    )
}


export default CategoryDetails;