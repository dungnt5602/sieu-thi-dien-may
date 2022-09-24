import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Container,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
  Snackbar,
  Slide,
  FormHelperText,
  Grid,
} from "@mui/material";
import GlobalState from "../../../GlobalState";
import AuthAPI from "../../../api/AuthAPI";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Register.scss";

export const Register = () => {
  const { accessToken, setAccessToken, setUsername, setIsLoggedIn, setUserId } =
    useContext(GlobalState);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/", { replace: true });
    }
  }, [accessToken]);

  const [values, setValues] = useState({
    name: "",
    username: "",
    mobile: "",
    email: "",
    password: "",
    verifyPassword: "",
    showPassword: false,
  });

  const [hasErrors, setHasErrors] = useState({
    name: "",
    username: "",
    mobile: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // const errorMessage = {
  //   name: "Không được để trống",
  //   username: "Không được để trống",
  //   mobile: "Số điện thoại phải là số",
  //   email: "Email không đúng định dạng",
  //   password: "Không được để trống",
  //   verifyPassword: "Xác nhận mật khẩu không khớp",
  // };
  const regexVNMobile = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  const isValidVNMobile = (mobile) => {
    return regexVNMobile.test(mobile);
  };

  const regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const isValidEmail = (email) => {
    return regexEmail.test(email);
  };

  const handleChange = (prop) => (event) => {
    var valueInput = event.target.value;
    setValues({ ...values, [prop]: valueInput });
    switch (prop) {
      case "email":
        if (!isValidEmail(valueInput)) {
          setHasErrors({
            ...hasErrors,
            [prop]: "Email không đúng định dạng",
          });
        } else if (valueInput === "") {
          setHasErrors({
            ...hasErrors,
            [prop]: "Không được để trống",
          });
        } else {
          setHasErrors({
            ...hasErrors,
            [prop]: "",
          });
        }
        break;

      case "mobile":
        // valueInput = parseInt(valueInput);
        if (!valueInput) {
          setHasErrors({
            ...hasErrors,
            [prop]: "Số điện thoại phải là số",
          });
        } else if (!isValidVNMobile(valueInput)) {
          // console.log(valueInput)
          setHasErrors({
            ...hasErrors,
            [prop]: "Số điện thoại không đúng định dạng",
          });
        } else if (valueInput === "") {
          setHasErrors({
            ...hasErrors,
            [prop]: "Không được để trống",
          });
        } else {
          setHasErrors({
            ...hasErrors,
            [prop]: "",
          });
        }
        break;

      case "verifyPassword":
        if (valueInput !== values.password) {
          setHasErrors({
            ...hasErrors,
            [prop]: "Xác nhận mật khẩu không khớp",
          });
        } else if (valueInput === "") {
          setHasErrors({
            ...hasErrors,
            [prop]: "Không được để trống",
          });
        } else {
          setHasErrors({
            ...hasErrors,
            [prop]: "",
          });
        }
        break;

      default:
        if (valueInput === "") {
          setHasErrors({
            ...hasErrors,
            [prop]: "Không được để trống",
          });
        } else {
          setHasErrors({
            ...hasErrors,
            [prop]: "",
          });
        }
        break;
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setAlert((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
    if (alert.severity === "success") {
      navigate("/", { replace: true });
    }
  };

  function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    var flagError = false;
    for (const key in hasErrors) {
      if (values[key] === "") {
        setHasErrors((prev) => {
          return { ...prev, [key]: true };
        });
        flagError = true;
      }
    }

    if (flagError) return;

    const registerRequest = {
      name: values.name,
      username: values.username,
      email: values.email,
      mobile: values.mobile,
      password: values.password,
      gender: "",
      address: "",
    };

    // console.log(registerRequest);

    AuthAPI.register(registerRequest)
      .then((response) => {
        const accessToken = response?.data?.token;
        setUserId(response?.data?.id);
        setAccessToken(accessToken);
        setUsername(response?.data?.username);
        setIsLoggedIn(true);
        localStorage.setItem(
          "access_token",
          JSON.stringify(response?.data?.token)
        );
        localStorage.setItem(
          "username",
          JSON.stringify(response?.data?.username)
        );
        localStorage.setItem("userId", JSON.stringify(response?.data?.id));
        navigate("/", { replace: true });
      })
      .catch((err) => {
        if (!err?.response) {
          setAlert((prev) => {
            return {
              ...prev,
              severity: "error",
              open: true,
              message: "Không nhận được phản hồi từ server",
            };
          });
        } else if (err.response?.status === 400) {
          setAlert((prev) => {
            return {
              ...prev,
              severity: "error",
              open: true,
              message: "Thiếu username hoặc mật khẩu",
            };
          });
        } else if (err.response?.status === 401) {
          setAlert((prev) => {
            return {
              ...prev,
              severity: "error",
              open: true,
              message: "Tài khoản hoặc mật khẩu không đúng",
            };
          });
        } else if (err.response?.status === 409) {
          setAlert((prev) => {
            return {
              ...prev,
              severity: "error",
              open: true,
              message: "Tài khoản đã tồn tại",
            };
          });
        } else {
          setAlert((prev) => {
            return {
              ...prev,
              severity: "error",
              open: true,
              message: "Đăng nhập thất bại",
            };
          });
        }
      });
  };

  return (
    <Container component="div" className="register_wrapper">
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={TransitionDown}
      >
        <Alert icon={false} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
      <Grid
        container
        irection="row"
        justifyContent="center"
        alignItems="center"
        columns={12}
        className="register_container"
      >
        <Grid item xs={6} className="register-body mx-auto">
          <h2 className="fw-bold mx-auto">ĐĂNG KÝ TÀI KHOẢN</h2>
          <div className="col-6 mx-auto">
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="register_name">
                Tên <span style={{ color: "#CA2B2D" }}>*</span>
              </InputLabel>
              <OutlinedInput
                id="register_name"
                required
                aria-describedby="name_helper"
                label="Tên"
                onChange={handleChange("name")}
              />
              {hasErrors.name === "" ? (
                ""
              ) : (
                <FormHelperText id="name_helper" error>
                  {hasErrors.name}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="register_username">
                Tài khoản <span style={{ color: "#CA2B2D" }}>*</span>
              </InputLabel>
              <OutlinedInput
                id="register_username"
                required
                aria-describedby="username_helper"
                label="Tài khoản"
                onChange={handleChange("username")}
              />
              {hasErrors.username === "" ? (
                ""
              ) : (
                <FormHelperText id="username_helper" error>
                  {hasErrors.username}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="register_email">
                Email <span style={{ color: "#CA2B2D" }}>*</span>
              </InputLabel>
              <OutlinedInput
                id="register_email"
                required
                type="email"
                aria-describedby="email_helper"
                label="Email"
                onChange={handleChange("email")}
              />
              {hasErrors.email === "" ? (
                ""
              ) : (
                <FormHelperText id="email_helper" error>
                  {hasErrors.email}
                </FormHelperText>
              )}
              <FormHelperText id="email_helper" />
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="register_mobile">
                Số điện thoại <span style={{ color: "#CA2B2D" }}>*</span>
              </InputLabel>
              <OutlinedInput
                id="register_mobile"
                required
                type="number"
                aria-describedby="mobile_helper"
                label="Số điện thoại"
                onChange={handleChange("mobile")}
              />
              {hasErrors.mobile === "" ? (
                ""
              ) : (
                <FormHelperText id="mobile_helper" error>
                  {hasErrors.mobile}
                </FormHelperText>
              )}
              <FormHelperText id="mobile_helper" />
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="register_password">
                Mật khẩu <span style={{ color: "#CA2B2D" }}>*</span>
              </InputLabel>
              <OutlinedInput
                id="register_password"
                required
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                label="Mật khẩu"
                onChange={handleChange("password")}
                aria-describedby="password_helper"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {hasErrors.password === "" ? (
                ""
              ) : (
                <FormHelperText id="password_helper" error>
                  {hasErrors.password}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="register_verifyPassword">
                Xác nhận mật khẩu <span style={{ color: "#CA2B2D" }}>*</span>
              </InputLabel>
              <OutlinedInput
                id="register_verifyPassword"
                required
                onChange={handleChange("verifyPassword")}
                type={values.showPassword ? "text" : "password"}
                value={values.verifyPassword}
                label="Xác nhận mật khẩu"
                aria-describedby="verifyPassword_helper"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {hasErrors.verifyPassword === "" ? (
                ""
              ) : (
                <FormHelperText id="verifyPassword_helper" error>
                  {hasErrors.verifyPassword}
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className="buttons" style={{ margin: "0 auto" }}>
            <Button
              color="error"
              variant="contained"
              className="login_btn"
              onClick={submitHandler}
              disabled={
                hasErrors.name !== "" ||
                hasErrors.username !== "" ||
                hasErrors.email !== "" ||
                hasErrors.mobile !== "" ||
                hasErrors.password !== "" ||
                hasErrors.verifyPassword !== ""
              }
            >
              Đăng ký
            </Button>
            <Button
              hover="true"
              href="/account/login"
              varient="text"
              color="error"
              className="register_button ms-3 text-decoration-underline"
              sx={{ color: "#CA2B2D", margin: "1rem" }}
            >
              Đăng nhập
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
