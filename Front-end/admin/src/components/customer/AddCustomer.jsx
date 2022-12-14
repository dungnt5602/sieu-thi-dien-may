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
                Th??m t??i kho???n
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
                Quay l???i danh s??ch t??i kho???n
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
                                    T??n t??i kho???n:
                                </Typography>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nh???p t??n t??i kho???n"
                                    {...register("name", {
                                        required: "Y??u c???u nh???p t??n t??i kho???n",
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
                                    ?????a ch???:
                                </Typography>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Nh???p ?????a ch???"
                                    {...register("address", {
                                        required: "Y??u c???u nh???p ?????a ch???",
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
                                    placeholder="Nh???p email"
                                    {...register("email", {
                                        required: "Y??u c???u nh???p email",
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
                                        Email ???? t???n t???i
                                    </span>
                                ) : null}
                                {/* phone */}
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    S??? ??i???n tho???i:
                                </Typography>
                                <input
                                    type="number"
                                    name="mobile"
                                    placeholder="Nh???p s??? ??i???n tho???i"
                                    {...register("mobile", {
                                        required: "Y??u c???u nh???p s??? ??i???n tho???i",
                                        minLength: {
                                            value: 8,
                                            message: "L??m g?? c?? s??? ??i???n tho???i n??o ng???n nh?? n??y ?"
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: "S??? ??i???n tho???i h??i d??i, nh???p ng???n th??i"
                                        },
                                        min: {
                                            value: 0,
                                            message: "S??? ??i???n tho???i kh??ng h???p l???"
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
                                    Gi???i t??nh:
                                </Typography>

                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        onChange={handleChangeGender}
                                        value={gender}
                                    >
                                        <FormControlLabel value="F" control={<Radio />} label="N???" />
                                        <FormControlLabel value="M" control={<Radio />} label="Nam" />
                                        <FormControlLabel value="other" control={<Radio />} label="Kh??ng x??c ?????nh" />
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
                                    T??n ????ng nh???p:
                                </Typography>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Nh???p t??n ????ng nh???p"
                                    {...register("username", {
                                        required: "Y??u c???u nh???p t??n ????ng nh???p",
                                        pattern: {
                                            value: /^[a-zA-Z0-9]+$/,
                                            message: "T??n ????ng nh???p kh??ng ???????c ch???a k?? t??? ?????c bi???t"
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
                                        T??n ????ng nh???p ???? t???n t???i
                                    </span>
                                ) : null}
                                {/* password */}
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    sx={{ fontSize: "16px" }}
                                >
                                    M???t kh???u:
                                </Typography>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Nh???p m???t kh???u"
                                    {...register("password", {
                                        required: "Y??u c???u nh???p m???t kh???u",
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
                                    T???o t??i kho???n cho:
                                </Typography>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="USER"
                                    name="radio-buttons-group"
                                    onChange={handleChangeRole} value={role}
                                >
                                    <FormControlLabel value="USER" control={<Radio />} label="Kh??ch h??ng" />
                                    <FormControlLabel value="ADMIN" control={<Radio />} label="Qu???n tr??? vi??n" />
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
                    Th??m
                </Button>
            </form>
        </div>
    );
};

export default AddCustomer;
