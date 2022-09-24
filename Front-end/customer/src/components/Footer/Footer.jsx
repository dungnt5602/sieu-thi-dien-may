import React, { useState } from "react";
import {
  Grid,
  Box,
  Button,
  IconButton,
  InputBase,
  List,
  ListItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled, alpha, createTheme } from "@mui/material/styles";
import "./footer.scss";
import ComponentWithIcon from "./ComponentWithIcon";

const footerLinks = [
  {
    title: "Thông tin công ty",
    links: [
      {
        text: "Giới thiệu công ty",
        href: "#",
      },
      {
        text: "Tiêu chí bán hàng",
        href: "#",
      },
      {
        text: "Đối tác chiến lược",
        href: "#",
      },
      {
        text: "Hệ thống trung tâm",
        href: "#",
      },
      {
        text: "Tuyển dụng",
        href: "#",
      },
    ],
  },
  {
    title: "Chính sách",
    links: [
      {
        text: "Giao nhận - lắp đặt",
        href: "#",
      },
      {
        text: "Dùng thử sản phẩm",
        href: "#",
      },
      {
        text: "Khu vực giao nhận",
        href: "#",
      },
      {
        text: "Khách hàng thành viên",
        href: "#",
      },
      {
        text: "Trả góp",
        href: "#",
      },
    ],
  },
  {
    title: "Hỗ trợ khách hàng",
    links: [
      {
        text: "Hướng dẫn mua hàng",
        href: "#",
      },
      {
        text: "Hình thức thanh toán",
        href: "#",
      },
      {
        text: "Chăm sóc khách hàng",
        href: "#",
      },
      {
        text: "Quy định đổi sản phẩm",
        href: "#",
      },
      {
        text: "Tra cứu thẻ thành viên",
        href: "#",
      },
    ],
  },
  {
    title: "Thông tin",
    links: [
      {
        text: "Liên hệ",
        href: "#",
      },
      {
        text: "Hợp tác",
        href: "#",
      },
      {
        text: "Giải thưởng",
        href: "#",
      },
      {
        text: "Bảo mật thông tin",
        href: "#",
      },
      {
        text: "Chia sẻ thông tin",
        href: "#",
      },
    ],
  },
];

const socialLinks = [
  {
    title: "twitter",
    icon: "Twitter",
    href: "#",
    background: "#4d9feb",
  },
  {
    title: "facebook",
    icon: "Facebook",
    href: "#",
    background: "#425895",
  },
  {
    title: "pinterest",
    icon: "Pinterest",
    href: "#",
    background: "#ad2626",
  },
];

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1, 1),
  color: alpha(theme.palette.common.white, 1),
}));

const Typography = styled("p")(({ theme }) => {
  return {
    fontSize: "14px",
  };
});

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState();
  const [error, setError] = useState();

  const emailClickHandler = async (event) => {
    event.preventDefault();
    /* TO DO
      Add email to database
    */
  };

  const validateEmail = (e) => {
    var email = e.target.value;
    setError("");
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      setEmailInfo(email);
    } else {
      setError("Email không đúng định dạng");
    }
  };

  return (
    <div>
      <Box id="brand-footer">
        <a href="#header">
          <img
            src={require("../../images/banner/banner1.JPG")}
            width="100%"
            alt="banner"
          />
        </a>
      </Box>
      <Box id="footer">
        <Box className="footer-content">
          <Grid container spacing={2} columns={12}>
            {footerLinks.map((col, index) => (
              <Grid item xs={3} key={index}>
                <Typography className="footer-title">{col.title}</Typography>
                <List>
                  {col.links.map((link, index) => (
                    <ListItem
                      key={index}
                      className="footer_item"
                      sx={{ p: "8px 0px" }}
                    >
                      <a href={link.href}>{link.text}</a>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            ))}
            <Grid item xs={4}>
              <Typography className="footer-title">
                Phương thức thanh toán
              </Typography>
              <Box sx={{ mt: "12px", mb: "62px" }}>
                <img
                  className="p-0 my-1 me-1"
                  alt="payment"
                  src={require("../../images/payment/payment_2.png")}
                />
                <img
                  className="p-0 my-1 me-1"
                  alt="payment"
                  src={require("../../images/payment/payment_3.png")}
                />
                <img
                  className="p-0 my-1 me-1"
                  alt="payment"
                  src={require("../../images/payment/payment_1.png")}
                />
                <img
                  className="p-0 my-1 me-1"
                  alt="payment"
                  src={require("../../images/payment/payment_4.png")}
                />
                <img
                  className="p-0 my-1 me-1"
                  alt="payment"
                  src={require("../../images/payment/payment_5.png")}
                />
                <img
                  className="p-0 my-1 me-1"
                  alt="payment"
                  src={require("../../images/payment/payment_6.png")}
                />
                <img
                  className="p-0 my-1 me-1"
                  alt="payment"
                  src={require("../../images/payment/payment_7.png")}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography className="footer-title">
                Kết nối với chúng tôi
              </Typography>
              <div>
                <ul>
                  {socialLinks.map((social, index) => (
                    <li className="social-item" key={index}>
                      <a href={social.href}>
                        <StyledIconButton
                          sx={{ backgroundColor: social.background }}
                        >
                          <ComponentWithIcon iconName={social.icon} />
                        </StyledIconButton>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Grid>
            <Grid item xs={4}>
              <Typography className="footer-title">Đăng kí nhận tin</Typography>
              <Typography sx={{ m: "12px 0" }}>
                Nhận thông tin sản phẩm mới nhật, tin khuyến mãi và nhiều hơn
                nữa.
              </Typography>
              <div className="email_register">
                <InputBase
                  placeholder="Email của bạn"
                  id="email"
                  onBlur={(e) => validateEmail(e)}
                  sx={{
                    border: "1px solid #e5e5e5",
                    p: "2px 8px",
                    fontSize: "14px",
                    width: "259px",
                  }}
                />
                <Button
                  variant="contained"
                  onClick={emailClickHandler}
                  color="error"
                  sx={{ borderRadius: 0, lineHeight: "1.6", mb: "3px" }}
                >
                  Đăng ký
                </Button>
              </div>
              {error && <h6 className="error_message">{error}</h6>}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Footer;
