import React from "react";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { CustomerCard } from "../components/dashboard/CustomerCard";
import { IncomeCard } from "../components/dashboard/IncomeCard";
import { ProductCard } from "../components/dashboard/ProductCard";
import { OrderCard } from "../components/dashboard/OrderCard";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import LowQuantity from "../components/dashboard/LowQuantity";
import { Statistic } from "../components/dashboard/Statistic";
import { ProductChart } from "../components/dashboard/ProductChart";
import {CategoryStatistic} from "../components/dashboard/CategoryStatistics";
export const Dashboard = () => {
  // const [date, setDate] = React.useState(new Date());

  // const onChange = date => {
  //     setDate(date);
  // }

  return (
    <Box>
      {/* <MiniDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 7 }}>
                <DrawerHeader /> */}

      {/*Từ phần dưới này là các component của các phần khác */}

      <Grid container spacing={2}>
        <Grid
          container
          md={6}
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <Grid md={5} sx={{ paddingBottom: 2 }}>
            <Card sx={{ height: "100%", borderBottom: "2px solid #3b87f7" }}>
              <CustomerCard />
            </Card>
          </Grid>
          <Grid md={5} sx={{ paddingBottom: 2 }}>
            <Card sx={{ height: "100%", borderBottom: "2px solid #3b87f7" }}>
              <IncomeCard />
            </Card>
          </Grid>
          <Grid md={5} sx={{ paddingBottom: 2 }}>
            <Card sx={{ height: "100%", borderBottom: "2px solid #3b87f7" }}>
              <ProductCard />
            </Card>
          </Grid>
          <Grid md={5} sx={{ paddingBottom: 2 }}>
            <Card sx={{ height: "100%", borderBottom: "2px solid #3b87f7" }}>
              <OrderCard />
            </Card>
          </Grid>
        </Grid>
        <Grid xs={6} md={6} sx={{ paddingBottom: 2 }}>
          <Card
            sx={{
              height: "100%",
              paddingLeft: 2,
              borderBottom: "2px solid #3b87f7",
            }}
          >
            <Typography
              variant="h6"
              component="h6"
              sx={{
                fontSize: "14px",
                marginTop: 1,
                fontWeight: "Bold",
              }}
            >
              Biểu đồ thống kê
            </Typography>
            <Statistic />
          </Card>
        </Grid>

        {/* <Grid sx={{ margin: 4 }}>
          <Card sx={{}}>
            <Calendar onChange={onChange} value={date} />
          </Card>
                </Grid> */}

        <Grid sx={{ margin: 4 }} md={6}>
          <Card
            sx={{
              height: "100%",
              paddingLeft: 2,
              borderBottom: "2px solid #3b87f7",
            }}
          >
            <LowQuantity />
          </Card>
        </Grid>
        <Grid sx={{ margin: 4 }} >
          <Card sx={{ height: "100%", paddingLeft: 2 }}  >
            {/* <ProductChart /> */}
            <CategoryStatistic/>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
