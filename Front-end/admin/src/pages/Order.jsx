import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AllOrders from "../components/order/AllOrders";
import PaidOrders from "../components/order/PaidOrders";
import UnpaidOrders from "../components/order/UnpaidOrders";
import "./Order.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Order = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="order-wrapper">
      <Typography variant="h4" gutterBottom>
        Đơn hàng
      </Typography>
      <Box
        sx={{
          width: "100%",
          border: " 1px groove",
          borderRadius: "5px",
          borderBottom: "5px solid #3b87f7",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Tất cả đơn hàng" {...a11yProps(0)} />
            <Tab label="Chưa thanh toán" {...a11yProps(1)} />
            <Tab label="Đã thanh toán" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AllOrders />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UnpaidOrders />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PaidOrders />
        </TabPanel>
      </Box>
    </div>
  );
};
