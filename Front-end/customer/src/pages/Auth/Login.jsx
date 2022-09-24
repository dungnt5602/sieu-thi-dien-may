import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import "./login.scss";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [usernameError, setUsernameError] = useState("");
  const [passwError, setPasswError] = useState("");

  const errorMessage = {
    username: "Không được để trống",
    passw: "Không được để trống",
  };

  const validateusername = (e) => {
    var username = e.target.value;
    setUsernameError("");
    if (username === "") {
      setUsernameError(errorMessage.username);
    } else {
      setUsername(username);
    }
  };

  const validatePassword = (e) => {
    var passw = e.target.value;
    setPasswError("");
    if (passw === "") {
      setPasswError(errorMessage.passw);
    } else {
      setPassword(passw);
    }
  };

  const submitHandler = (e) => {
    if (usernameError === "" && passwError === "") {
      /** TO DO */
    } else {
    }
  };

  return (
    <Box sx={{ width: "1170px", m: "16px auto", bgcolor: "white" }}>
      <Container component="div" className="login_body py-3">
        <Grid item xs={12} className="my-2 p-3">
          <Grid container spacing={4} columns={12}>
            <Grid item xs={6}>
              
            </Grid>
            <Grid item xs={6} component="div" className="login_info py-2 my-4">
              <Typography sx={{textAlign: "center", mb: "24px"}}>ĐĂNG NHẬP TÀI KHOẢN</Typography>

              <h6 className="customer_username_typo mt-2 fw-bold">Tên đăng nhập:</h6>
              <TextField
                className="mt-1"
                required
                fullWidth
                id="customer_username"
                label="Tên đăng nhập"
                size="small"
                margin="normal"
                onBlur={(e) => validateusername(e)}
                error={!(usernameError === "")}
                helperText={!(usernameError === "") ? usernameError : ""}
              />
              <h6 className="customer_password_typo mt-2 fw-bold">Mật khẩu:</h6>
              <TextField
                className="mt-1"
                required
                fullWidth
                id="password"
                label="Mật khẩu"
                size="small"
                margin="normal"
                onBlur={(e) => validatePassword(e)}
                error={!(passwError === "")}
                helperText={!(passwError === "") ? passwError : ""}
              />
              <div className="buttons mt-3">
                <Button
                  color="error"
                  variant="contained"
                  className="login_button"
                  onClick={(e) => submitHandler(e)}
                >
                  Đăng nhập
                </Button>
                <Button
                  hover="true"
                  color="inherit"
                  href="/account/register"
                  varient="text"
                  className="register_button ms-3"
                >
                  Đăng ký
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
