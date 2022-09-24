import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoginAPI from "../api/AuthenticateLogin";
import { Alert } from "@mui/material";

const theme = createTheme();

export default function SignIn() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    LoginAPI.login(data.username, data.password)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.data.role === "ADMIN") {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("role", response.data.role);
            nav("/admin");
          } else {
            setError("Bạn không có quyền truy cập");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Sai tài khoản hoặc mật khẩu");
      });
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/bg-register.jpg')",
      }}
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo.svg?v=202209060513"
              class="normal fade show"
              alt="Sapo logo"
              style={{ height: "50%", width: "50%" }}
            />
            <Typography
              component="h1"
              variant="h5"
              sx={{
                marginTop: 2,
                marginBottom: 2,
                fontFamily: "",
                fontWeight: "bold",
                fontSize: "1.5rem",
                lineHeight: "1.334",
                letterSpacing: "0em",
              }}
            >
              Đăng nhập quản trị
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                fullWidth
                id="username"
                label="Tên đăng nhập"
                name="username"
                autoComplete="username"
                autoFocus
                {...register("username", { required: "Required" })}
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : null}
                onChange={(e) => setError("")}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : null}
              />
              {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
              {error !== "" ? <Alert severity="error">{error}</Alert> : ""}
              <div className="button-wrapper" style={{ margin: "0 auto", display: "flex", justifyItems: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ margin: "1em auto" }}
                >
                  Đăng nhập
                </Button>
              </div>
            </form>

            {/* </Box> */}
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
