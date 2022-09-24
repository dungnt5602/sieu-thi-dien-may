import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Slide,
  Typography,
} from "@mui/material";
import GlobalState from "../../../GlobalState";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Login.scss";
import AuthAPI from "../../../api/AuthAPI";

export const Login = () => {
  const { accessToken, setAccessToken, setUsername, setIsLoggedIn, setUserId } =
    useContext(GlobalState);

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/", { replace: true });
    }
  }, [accessToken]);

  const [account, setAccount] = useState({
    username: "",
    password: "",
    showPassword: true,
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleClickShowPassword = () => {
    setAccount({
      ...account,
      showPassword: !account.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    var valueInput = event.target.value;
    setAccount({ ...account, [prop]: valueInput });

    if (valueInput === "") {
      setErrors((prev) => {
        return {
          ...prev,
          [prop]: "Không được để trống",
        };
      });
    } else {
      setErrors({
        ...errors,
        [prop]: "",
      });
    }
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

    if (!account.username) {
      return setErrors((prev) => {
        return { ...prev, username: "Tài khoản không được để trống" };
      });
    }
    if (!account.password) {
      return setErrors((prev) => {
        return { ...prev, password: "Mật khẩu không được để trống" };
      });
    }
    AuthAPI.login(account)
      .then((response) => {
        setAlert({
          severity: "success",
          open: true,
          message: "Đăng nhập thành công! Chuyển hướng về Trang chủ",
        });
        setUserId(response?.data?.id);
        setAccessToken(response?.data?.token);
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
              message: "Thiếu tài khoản hoặc mật khẩu",
            };
          });
          if (!account.username) {
            return setErrors((prev) => {
              return { ...prev, username: "Tài khoản không được để trống" };
            });
          }
          if (!account.password) {
            return setErrors((prev) => {
              return { ...prev, password: "Mật khẩu không được để trống" };
            });
          }
        } else if (err.response?.status === 401) {
          setAlert((prev) => {
            return {
              ...prev,
              severity: "error",
              open: true,
              message: "Tài khoản hoặc mật khẩu không đúng",
            };
          });
          setErrors((prev) => {
            return {
              ...prev,
              username: "Tài khoản hoặc mật khẩu không đúng",
              password: "Tài khoản hoặc mật khẩu không đúng",
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

  const handleKeyDown = (e) => {
    if (e.which === 13) {
      submitHandler(e);
    }
  };
  // const keyPressHandler = async (e) => {
  //   if (e.which === 13) {
  //     const a = submitHandler;
  //   }
  // };

  return (
    <Container component="div" className="login_body py-3 my-3">
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
        item
        xs={12}
        className="login_wrapper border border-1 border-dark border-opacity-25 my-2 py-4"
      >
        <Grid container spacing={4} columns={12}>
          <Grid item xs={6} component="div" className="login_info">
            <Typography>ĐĂNG NHẬP TÀI KHOẢN</Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="register_username">
                Tài khoản <span style={{ color: "#CA2B2D" }}>*</span>
              </InputLabel>
              <OutlinedInput
                id="register_username"
                required
                aria-describedby="username_helper"
                onChange={handleChange("username")}
                onKeyDown={handleKeyDown}
                label="Tài khoản"
                margin="dense"
                value={account.username}
              />
              {errors.username === "" ? (
                ""
              ) : (
                <FormHelperText id="username_helper" error>
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="register_password">
                Mật khẩu <span style={{ color: "#CA2B2D" }}>*</span>
              </InputLabel>
              <OutlinedInput
                id="register_password"
                required
                type={account.showPassword ? "text" : "password"}
                value={account.password}
                label="Mật khẩu"
                onChange={handleChange("password")}
                onKeyDown={handleKeyDown}
                aria-describedby="password_helper"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {account.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password === "" ? (
                ""
              ) : (
                <FormHelperText id="password_helper" error>
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            <div className="buttons">
              <Button
                color="error"
                variant="contained"
                className="login_button"
                onClick={(e) => submitHandler(e)}
                disabled={errors.username !== "" || errors.password !== ""}
              >
                Đăng nhập
              </Button>
              <Button
                hover="true"
                color="error"
                href="/account/register"
                varient="text"
                className="register_button ms-3"
              >
                Đăng ký
              </Button>
            </div>
          </Grid>
          {/* <Grid item xs={6} className="mt-3">
            <p>
              Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua
              email.
            </p>
            <h6 className="recover_email_typo mt-2 fw-bold">
              Email <span style={{ color: "#CA2B2D" }}>*</span>
            </h6>
            <TextField
              className="mt-1"
              required
              fullWidth
              id="recover_email"
              label="Email"
              size="small"
              margin="normal"
              onBlur={(e) => validateRecEmail(e)}
              error={!(recEmailError === "")}
              helperText={!(recEmailError === "") ? recEmailError : ""}
            />
            <Button
              className="recover_button mt-1"
              color="error"
              variant="contained"
              onClick={(e) => recEmailSubmitHandler(e)}
            >
              Lấy lại mật khẩu
            </Button>
          </Grid> */}
        </Grid>
      </Grid>
    </Container>
  );
};
