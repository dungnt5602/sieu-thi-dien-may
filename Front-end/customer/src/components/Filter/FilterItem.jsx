import React from "react";
import GlobalState from "../../GlobalState";
import { Box, Grid, Stack, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { generateQuery } from "../../shared/FilterFunction";

const Typography = styled("p")(({ theme }) => {
  return {
    fontSize: "14px",
    color: "black",
  };
});

const FilterItem = ({ title, name, widthColumn }) => {
  const { filterList, setFilterList, setQuery } = React.useContext(GlobalState);

  const handleCheck = (event) => {
    let newArr = [...filterList[name]];
    newArr[event.target.name].checked = event.target.checked;
    setFilterList({ ...filterList, [name]: newArr });
    setQuery(generateQuery(filterList));
  };

  return (
    <Box>
      <Divider sx={{ m: "12px -16px" }} />
      <Typography sx={{ fontWeight: "600", mb: "4px" }}>{title}</Typography>
      <form>
        <Grid container spacing={2} rowSpacing="4px" sx={{ mt: "8px" }}>
          {filterList[name].map((item, index) => (
            <Grid item xs={widthColumn} key={index}>
              <Stack
                direction="row"
                key={item.name}
                sx={{ alignItems: "center" }}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  name={item.index}
                  id={item.name}
                  onChange={handleCheck}
                />
                {item.img === undefined ? (
                  <label htmlFor={item.name} className="filter-item">
                    {item.name}
                  </label>
                ) : (
                  <label htmlFor={item.name}>
                    <img src={item.img} alt="img" className="img-item" />
                  </label>
                )}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </form>
    </Box>
  );
};

export default FilterItem;
