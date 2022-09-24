import { Grid, Paper, Box, Stack, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { GlobalState } from "../../auth/GlobalState";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import UserAPI from "../../api/UserAPI";
const AddCustomer = () => {
    const accessToken = localStorage.getItem("token");
    const [gender, setGender] = React.useState("F");
    const [role, setRole] = React.useState("USER");
    const [email, setEmail] = React.useState(false);
    const [username, setUsername] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();
    const { isAdd, setIsAdd } = React.useContext(GlobalState);

    const onSubmit = async (data) => {
        data.role = role;
        data.gender = gender;
        UserAPI.createAccount(accessToken, data)
            .then((res) => {
                getBack();
            }).catch((err) => {
                // getBack();
                console.log(err);
                if (err.code === "ERR_NETWORK") {
                    getBack();
                } else if (err.response.data.message.indexOf("Email") > -1 &&
                    err.response.data.code === 409) {
                    setEmail(true);
                    setUsername(false);
                } else if (err.response.data.message.indexOf("Username") > -1 &&
                    err.response.data.code === 409) {
                    setUsername(true);
                    setEmail(false);
                }
            })
    };

    const handleChangeGender = (evt) => {
        setGender(evt.target.value);
    }

    const handleChangeRole = (evt) => {
        setRole(evt.target.value);
    }

    const getBack = () => {
        window.history.back();
    };
    return (
        <div>
            <Typography variant="h4" component="div">
                Thêm tài khoản
            </Typography>

            <Typography
                id="transition-modal-title"
                variant="subtitle1"
                component="h4"
                marginBottom="20px"
                onClick={getBack}
                sx={{
                    cursor: "pointer",
                    "&:hover": {
                        color: "#ccc",
                    },
                }}
            >
                <i class="fa-solid fa-chevron-left"></i>
                Quay lại danh sách tài khoản
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={1} sx={{ height: "100%" }}>
                            <Box p={3}>
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    Tên tài khoản:
                                </Typography>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nhập tên tài khoản"
                                    {...register("name", {
                                        required: "Yêu cầu nhập tên tài khoản",
                                    })}
                                    style={{
                                        width: "100%",
                                        marginBottom: "24px",
                                        marginTop: "10px",
                                        height: "30px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        padding: "20px",
                                        fontSize: "15px"
                                    }}
                                />
                                {errors.name && (
                                    <span style={{ color: "red" }}>
                                        {errors.name.message}
                                    </span>
                                )}

                                {/* Address */}

                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    Địa chỉ:
                                </Typography>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Nhập địa chỉ"
                                    {...register("address", {
                                        required: "Yêu cầu nhập địa chỉ",
                                    })}
                                    style={{
                                        width: "100%",
                                        marginBottom: "24px",
                                        marginTop: "10px",
                                        height: "30px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        padding: "20px",
                                        fontSize: "15px"
                                    }}
                                />
                                {errors.address && (
                                    <span style={{ color: "red" }}>
                                        {errors.address.message}
                                    </span>
                                )}
                                {/* email */}
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    Email:
                                </Typography>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Nhập email"
                                    {...register("email", {
                                        required: "Yêu cầu nhập email",
                                    })}
                                    style={{
                                        width: "100%",
                                        marginBottom: "24px",
                                        marginTop: "10px",
                                        height: "30px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        padding: "20px",
                                        fontSize: "15px"
                                    }}
                                />
                                {errors.email && (
                                    <span style={{ color: "red" }}>
                                        {errors.email.message}
                                    </span>
                                )}
                                {email ? (
                                    <span style={{ color: "red" }}>
                                        Email đã tồn tại
                                    </span>
                                ) : null}
                                {/* phone */}
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    Số điện thoại:
                                </Typography>
                                <input
                                    type="number"
                                    name="mobile"
                                    placeholder="Nhập số điện thoại"
                                    {...register("mobile", {
                                        required: "Yêu cầu nhập số điện thoại",
                                        minLength: {
                                            value: 8,
                                            message: "Làm gì có số điện thoại nào ngắn như này ?"
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: "Số điện thoại hơi dài, nhập ngắn thôi"
                                        },
                                        min: {
                                            value: 0,
                                            message: "Số điện thoại không hợp lệ"
                                        }
                                    })}
                                    style={{
                                        width: "100%",
                                        marginBottom: "24px",
                                        marginTop: "10px",
                                        height: "30px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        padding: "20px",
                                        fontSize: "15px"
                                    }}
                                />
                                {errors.mobile && (
                                    <span style={{ color: "red" }}>
                                        {errors.mobile.message}
                                    </span>
                                )}

                                {/* gender */}
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    Giới tính:
                                </Typography>

                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        onChange={handleChangeGender}
                                        value={gender}
                                    >
                                        <FormControlLabel value="F" control={<Radio />} label="Nữ" />
                                        <FormControlLabel value="M" control={<Radio />} label="Nam" />
                                        <FormControlLabel value="other" control={<Radio />} label="Không xác định" />
                                    </RadioGroup>

                                </FormControl>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={1} sx={{ height: "100%" }}>
                            <Box p={3}>

                                {/* Username */}

                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    Tên đăng nhập:
                                </Typography>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Nhập tên đăng nhập"
                                    {...register("username", {
                                        required: "Yêu cầu nhập tên đăng nhập",
                                        pattern: {
                                            value: /^[a-zA-Z0-9]+$/,
                                            message: "Tên đăng nhập không được chứa ký tự đặc biệt"
                                        }
                                    })}
                                    style={{
                                        width: "100%",
                                        marginBottom: "24px",
                                        marginTop: "10px",
                                        height: "30px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        padding: "20px",
                                        fontSize: "15px"
                                    }}
                                />
                                {errors.username && (
                                    <span style={{ color: "red" }}>
                                        {errors.username.message}
                                    </span>
                                )}
                                {username ? (
                                    <span style={{ color: "red" }}>
                                        Tên đăng nhập đã tồn tại
                                    </span>
                                ) : null}
                                {/* password */}
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    Mật khẩu:
                                </Typography>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Nhập mật khẩu"
                                    {...register("password", {
                                        required: "Yêu cầu nhập mật khẩu",
                                    })}
                                    style={{
                                        width: "100%",
                                        marginBottom: "24px",
                                        marginTop: "10px",
                                        height: "30px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        padding: "20px",
                                        fontSize: "15px"
                                    }}
                                />
                                {errors.password && (
                                    <span style={{ color: "red" }}>
                                        {errors.password.message}
                                    </span>
                                )}
                                {/* Role */}
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    Tạo tài khoản cho:
                                </Typography>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="USER"
                                    name="radio-buttons-group"
                                    onChange={handleChangeRole} value={role}
                                >
                                    <FormControlLabel value="USER" control={<Radio />} label="Khách hàng" />
                                    <FormControlLabel value="ADMIN" control={<Radio />} label="Quản trị viên" />
                                </RadioGroup>

                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                        backgroundColor: "#fff",
                        color: "#00a8ff",
                        fontSize: "14px",
                        padding: "5px 20px",
                        borderRadius: "5px",
                        marginTop: "25px",
                        marginLeft: "93%",
                    }}
                >
                    Thêm
                </Button>
            </form>
        </div>
    );
};

export default AddCustomer;
