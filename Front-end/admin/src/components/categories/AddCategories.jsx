import React from "react";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import CategoriesAPI from "../../api/CategoriesAPI";
import { GlobalState } from "../../auth/GlobalState";

export const AddCategories = ({ parentCallback, nameInput }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [name, setName] = React.useState(nameInput !== undefined ? nameInput : '');
    console.log(nameInput)
    const { setIsAdd, token } = React.useContext(GlobalState);

    console.log(token);

    const onSubmit = (data) => {
        const category = {
            name: data.categoryName,
            content: data.description
        }
        console.log(token);
        console.log(category);

        CategoriesAPI.addCategory(category, token).then(res => {
            console.log(res);
            setIsAdd(true);
            if(parentCallback !== undefined) {
                parentCallback({
                    'category': {
                        'id': res.data.id,
                        'title': res.data.name
                    },
                    'toggleOpen': false,
                    'alerts': true
                })
            }
        }).catch(err => {
            console.log(err);
        }
        );
    }

    return (
        <>
            <Typography id="transition-modal-title" variant="h5" component="h2">
                Thêm danh mục
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group" style={{
                    display: "flex",
                    flexDirection: 'column'
                }}>
                    <Typography id="transition-modal-description" variant="subtitle1" component="p">
                        Nhập tên danh mục
                    </Typography>
                    <input type="text" name="categoryName" {...register("categoryName", { required: "Yêu cầu nhập tên danh mục" })}
                        value={name} onChange={e => setName(e.target.value)}
                        style={{
                            width: "300px",
                            marginBottom: "10px",
                            height: "30px",
                        }} />
                    {errors.categoryName && <span style={{ color: "red" }}>{errors.categoryName.message}</span>}

                    <Typography id="transition-modal-description" variant="subtitle1" component="p">
                        Nhập mô tả
                    </Typography>
                    <input type="text" name="description" {...register("description", { required: "Yêu cầu nhập mô tả" })}
                        style={{
                            width: "300px",
                            marginBottom: "10px",
                            height: "30px",
                        }} />
                    {errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>}
                </div>
                <Button type="submit" variant="contained" color="primary" style={{
                    backgroundColor: '#fff',
                    color: '#00a8ff',
                    fontSize: '14px',
                    padding: '5px 20px',
                    borderRadius: '5px',
                }}>
                    Thêm
                </Button>
                <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: "10px" }}>
                    Nhấn ra ngoài để thoát
                </Typography>
            </form>
        </>
    )
}
