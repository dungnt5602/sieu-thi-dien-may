import React from "react";
import { Box, Paper, InputBase, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const SearchBtn = () => {
  let navigate = useNavigate();
  const [value, setValue] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search=${value.trim()}`, { replace: true });
  };

  return (
    <Paper
      component="form"
      sx={{
        height: "40px",
        ml: "94px",
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "468px",
      }}
      onSubmit={handleSearch}
    >
      <InputBase
        size="small"
        sx={{ ml: 1, flex: 1, fontSize: "15px", pt: "4px" }}
        placeholder="Nhập sản phẩm bạn muốn tìm kiếm"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <Box
        sx={{
          bgcolor: "#ffe300",
          height: "40px",
          transform: "translateX(4px)",
          borderRadius: "0 4px 4px 0",
        }}
      >
        <Button
          sx={{ minWidth: "52px", height: "40px", p: "10px", color: "black" }}
          onClick={handleSearch}
        >
          <SearchIcon />
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchBtn;
