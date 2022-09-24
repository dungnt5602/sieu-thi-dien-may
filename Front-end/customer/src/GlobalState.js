import { TrendingUp } from "@mui/icons-material";
import React, { createContext, useEffect, useState } from "react";
import { filterData } from "./shared/ListFilter";

// const statusLogin = true;

const GlobalState = createContext({
  userId: 0,
  setUserId: (userId) => {},
  statusCart: false,
  setStatusCart: (status) => {},
  cart: [],
  setCart: (products) => {},
  totalCost: 0,
  setTotalCost: (total) => {},
  isLoggedIn: false,
  setIsLoggedIn: (logged) => {},
  accessToken: "",
  setAccessToken: (token) => {},
  username: "",
  setUsername: (username) => {},
});

export const DataProvider = ({ children }) => {
  // const navigate = useNavigate()
  const [accessToken, setAccessToken] = useState(() => {
    if (localStorage.getItem("access_token")) {
      return JSON.parse(localStorage.getItem("access_token"));
    } else {
      return "";
    }
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (localStorage.getItem("access_token")) {
      return true;
    } else {
      return false;
    }
  });

  const [username, setUsername] = useState(() => {
    if (localStorage.getItem("access_token")) {
      return JSON.parse(localStorage.getItem("username"));
    } else {
      return "";
    }
  });
  const [userId, setUserId] = useState(() => {
    if (localStorage.getItem("access_token")) {
      return JSON.parse(localStorage.getItem("userId"));
    } else {
      return 0;
    }
  });
  const [statusCart, setStatusCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [query, setQuery] = useState('');
  const [filterList, setFilterList] = useState({...filterData});

  return (
    <GlobalState.Provider
      value={{
        userId, setUserId,
        accessToken, setAccessToken,
        isLoggedIn, setIsLoggedIn,
        username, setUsername,
        statusCart, setStatusCart,
        totalCost, setTotalCost,
        filterList, setFilterList,
        query, setQuery,
        cart, setCart,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export default GlobalState;
