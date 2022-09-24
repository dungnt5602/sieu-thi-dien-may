import React, { useState } from "react";
import {
  Grid,
  Button,
  IconButton,
  InputBase,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { styled, alpha, createTheme } from "@mui/material/styles";
import "./Footer.scss";
import { ComponentWithIcon } from "../ComponentWithIcon";

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

export const Footer = () => {
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
    <Container className="py-3">
      <Grid container spacing={2} columns={12}>
        {footerLinks.map((col, index) => (
          <Grid item xs={3} key={index}>
            <Typography>{col.title}</Typography>
            <List>
              {col.links.map((link) => (
                <ListItem className="footer_item p-0 my-1">
                  <a href={link.href}>{link.text}</a>
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
        <Grid item xs={4}>
          <Typography>Phương thức thanh toán</Typography>
          <div className="payment_method d-flex flex-wrap flex-row ">
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
          </div>
        </Grid>
        <Grid item xs={4}>
          <Typography>Kết nối với chúng tôi</Typography>
          <div className="social_contact d-flex flex-wrap">
            <ul className="list-unstyled list-menu list-inline">
              {socialLinks.map((social, index) => (
                <li
                  className={social.title + " float-start me-1 my-1"}
                  key={index}
                >
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
          <Typography>Đăng kí nhận tin</Typography>
          <p>
            Nhận thông tin sản phẩm mới nhật, tin khuyến mãi và nhiều hơn nữa.
          </p>
          <div className="email_register border border-dark border-opacity-50 d-flex justify-content-between">
            <InputBase
              placeholder="Email của bạn"
              id="email"
              sx={{ paddingLeft: 2 }}
              onBlur={(e) => validateEmail(e)}
            />
            <Button
              variant="contained"
              onClick={emailClickHandler}
              color="error"
              sx={{ borderRadius: 0,}}
            >
              Đăng ký
            </Button>
          </div>
          {error && <h6 className="error_message mt-1 text-danger" >{error}</h6>}
        </Grid>
      </Grid>
    </Container>
  );
};
