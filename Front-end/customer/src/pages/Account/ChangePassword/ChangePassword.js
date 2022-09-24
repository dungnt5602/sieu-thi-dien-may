import React, { useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./ChangePassword.scss";

export const ChangePassword = ({ userId, ...props }) => {
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    verifyPassword: "",
    showPassword: false,
  });

  const [hasErrors, setHasErrors] = useState({
    oldPassword: false,
    newPassword: false,
    verifyPassword: false,
  });

  const errorMessage = {
    oldPassword: "Không được để trống",
    newPassword: "Không được để trống",
    verifyPassword: "Xác nhận mật khẩu không khớp",
  };

  const [alert, setAlert] = useState({
    showAlert: false,
    severity: "success",
  });

  const alertMessage = {
    error: "Mật khẩu cũ không đúng",
    success: "Đổi mật khẩu thành công",
  };

  const handleBlur = (prop) => (event) => {
    var valueInput = event.target.value;
    switch (prop) {
      case "verifyPassword":
        if (valueInput !== values.newPassword) {
          setHasErrors({
            ...hasErrors,
            [prop]: true,
          });
        } else {
          setValues({ ...values, [prop]: valueInput });
          setHasErrors({
            ...hasErrors,
            [prop]: false,
          });
        }
        break;

      default:
        if (valueInput === "") {
          setHasErrors({
            ...hasErrors,
            [prop]: true,
          });
        } else {
          setValues({ ...values, [prop]: valueInput });
          setHasErrors({
            ...hasErrors,
            [prop]: false,
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

  const submitHandler = (event) => {
    event.preventDefault();

    /** TO DO: Change password on DB */
  };

  return (
    <>
      <h2 className="fw-normal">Đổi mật khẩu</h2>
      {alert.showAlert ? (
        <Alert
          severity={alert.severity}
          onClose={() => {
            setAlert({
              ...alert,
              showAlert: false,
            });
          }}
        >
          {alertMessage[alert.severity]}
        </Alert>
      ) : (
        ""
      )}
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel htmlFor="old-password">
          Mật khẩu cũ <span style={{ color: "#CA2B2D" }}>*</span>
        </InputLabel>
        <OutlinedInput
          id="old-password"
          required
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          label="Mật khẩu cũ"
          margin="dense"
          onBlur={handleBlur("oldPassword")}
          aria-describedby="old_password_helper"
          endAdornment={
            <InputAdornment position="end" className="mx-2">
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
        {hasErrors.oldPassword ? (
          <FormHelperText id="old_password_helper" error>
            {errorMessage.oldPassword}
          </FormHelperText>
        ) : (
          ""
        )}
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel htmlFor="new-password">
          Mật khẩu mới <span style={{ color: "#CA2B2D" }}>*</span>
        </InputLabel>
        <OutlinedInput
          id="new-password"
          required
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          label="Mật khẩu mới"
          margin="dense"
          onBlur={handleBlur("newPassword")}
          aria-describedby="new_password_helper"
          endAdornment={
            <InputAdornment position="end" className="mx-2">
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
        {hasErrors.newPassword ? (
          <FormHelperText id="new_password_helper" error>
            {errorMessage.newPassword}
          </FormHelperText>
        ) : (
          ""
        )}
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel htmlFor="verify-password">
          Xác nhận lại mật khẩu <span style={{ color: "#CA2B2D" }}>*</span>
        </InputLabel>
        <OutlinedInput
          id="verify-password"
          required
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          label="Xác nhận lại mật khẩu"
          margin="normal"
          onBlur={handleBlur("verifyPassword")}
          aria-describedby="verify_password_helper"
          endAdornment={
            <InputAdornment position="end" className="mx-2">
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
        {hasErrors.verifyPassword ? (
          <FormHelperText id="verify_password_helper" error>
            {errorMessage.verifyPassword}
          </FormHelperText>
        ) : (
          ""
        )}
      </FormControl>

      <Button
        variant="contained"
        color="error"
        className="change-password-btn my-3"
        onClick={(e) => submitHandler(e)}
        disabled={
          hasErrors.newPassword ||
          hasErrors.oldPassword ||
          hasErrors.verifyPassword
        }
      >
        Đổi mật khẩu
      </Button>
    </>
  );
};
