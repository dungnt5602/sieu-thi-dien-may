import React from "react";
import { Box, Typography, Divider, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Introduction = () => {
  return (
    <Box className="introduction">
      <Box className="intro-container">
        <p className="title">Giới thiệu</p>
        <Divider sx={{ mb: "24px" }} />

        <Grid container spacing={2} columns={13} className="intro-container">
          <Grid item xs={7}>
            <Box className="intro-content">
              <Typography className="intro-welcome">
                Sapo điện máy <br /> xin kính chào quý khách!
              </Typography>
              <Typography className="intro-description">
                Với phương châm "Tất cả cho khách hàng, khách hàng cho tất cả"
                và định hướng tiến tới trong tương lai, Sapo Điện Máy luôn nổ
                lực không ngừng để cung cấp cho khách hàng những chất lượng tốt
                nhất.
              </Typography>
              <Link to="/products" className="intro-btn">Mua hàng ngay</Link>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box className="intro-video">
              <video width="100%" autoPlay loop className="video-content">
                <source
                  src={require("../../videos/video1.mp4")}
                  type="video/mp4"
                />
              </video>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Introduction;
