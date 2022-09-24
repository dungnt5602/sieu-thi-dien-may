import React from "react";
import GlobalState from "../../GlobalState";
import { Box, Grid, Stack, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ProductsAPI from "../../api/ProductsAPI";
import { generateBrandArray, generateQuery } from "../../shared/FilterFunction";
import FilterItem from "./FilterItem";
import { filterData } from "../../shared/ListFilter";

const Typography = styled("p")(({ theme }) => {
  return {
    fontSize: "14px",
    color: "black",
  };
});

const Filter = () => {
  const params = useParams();
  const { filterList, setFilterList, setQuery } = React.useContext(GlobalState);
  const [inputs, setInputs] = React.useState({
    startPrice: "",
    endPrice: "",
  });
  const [error, setError] = React.useState("");

  const handleCheckBrands = (event) => {
    let newArr = [...filterList["brands"]];
    newArr[event.target.id].checked = event.target.checked;
    setFilterList({ ...filterList, ["brands"]: newArr });
    setQuery(generateQuery(filterList));
  };

  const handleCheckPrice = (event) => {
    let newArr = [...filterList["prices"]];
    newArr[event.target.name].checked = event.target.checked;
    setFilterList({ ...filterList, ["prices"]: newArr });
    setQuery(generateQuery(filterList));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (Number(inputs.endPrice) < Number(inputs.startPrice))
      setError("Giá kết thúc phải lớn hơn giá bắt đầu");
    else if(Number(inputs.endPrice) < 0 || Number(inputs.startPrice) < 0) {
      setError("Không được nhập số âm");
    } else {
      filterList[
        "prices"
      ][0].query = `newPrice@${inputs.startPrice}_AND_newPrice<${inputs.endPrice}`;
      filterList["prices"][0].checked = true;
      setQuery(generateQuery(filterList));
      setError("");
    }
  };

  if (inputs.startPrice.length === 0 || inputs.endPrice.length === 0)
    filterList["prices"][0].checked = false;

  React.useEffect(() => {
    for (let key in filterData) {
      filterList[key].forEach(item => {
        item['checked'] = false;
      })
    }
    setFilterList(filterData);
    setQuery(generateQuery(filterList));
    ProductsAPI.getProductsBrands(params.id)
      .then((res) => {
        if (res.data.length !== 0)
          setFilterList({
            ...filterList,
            ["brands"]: generateBrandArray(res.data),
          });
        else setFilterList({ ...filterList, ["brands"]: [] });
      })
      .catch((error) => console.log(error));
  }, [params.id]);

  return (
    <Box className="filter">
      <Typography sx={{ fontWeight: "600" }}>BỘ LỌC SẢN PHẨM</Typography>
      <Typography sx={{ fontSize: "12px", mt: "2px" }}>
        Giúp lọc nhanh sản phẩm bạn tìm kiếm
      </Typography>

      {filterList["brands"].length !== 0 && (
        <Box>
          <Divider sx={{ m: "12px -16px" }} />
          <Typography sx={{ fontWeight: "600", mb: "10px" }}>
            Thương hiệu
          </Typography>
          <form>
            <Grid container spacing={2} rowSpacing="4px" sx={{ mt: "8px" }}>
              {filterList["brands"].map((brand, index) => (
                <Grid item xs={6} key={index}>
                  <Stack direction="row" sx={{ alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={brand.checked}
                      id={brand.index}
                      onChange={handleCheckBrands}
                    />
                    <label htmlFor={brand.index}>
                      <img src={brand.img} alt="img" className="brand-logo" />
                    </label>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </form>
        </Box>
      )}

      <Divider sx={{ m: "12px -16px" }} />
      <Box>
        <Typography sx={{ fontWeight: "600", mb: "12px" }}>Giá bán</Typography>
        <form onSubmit={handleSearch}>
          <Stack direction="row" sx={{ m: "15px 0 6px", alignItems: "center" }}>
            <input
              type="number"
              pattern="[0-9]+"
              className="price-input"
              placeholder="₫ TỪ"
              name="startPrice"
              value={inputs.startPrice}
              onChange={onChangeInput}
              required
            />
            <Box className="price-divider" />
            <input
              type="number"
              pattern="\d"
              className="price-input"
              placeholder="₫ ĐẾN"
              name="endPrice"
              value={inputs.endPrice}
              onChange={onChangeInput}
              required
            />
            <button type="submit" className="filter-btn">
              <SearchIcon sx={{ fontSize: "22px", mt: "3px" }} />
            </button>
          </Stack>
          {error.length !== 0 && (
            <Box sx={{ color: "#ff424f", fontSize: "12px", m: "4px" }}>
              {error}
            </Box>
          )}

          {filterList["prices"].map(
            (price, index) =>
              index !== 0 && (
                <Stack
                  direction="row"
                  key={price.name}
                  sx={{ alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    checked={price.checked}
                    name={price.index}
                    id={price.name}
                    onChange={handleCheckPrice}
                  />
                  <label htmlFor={price.name} className="filter-item">
                    {price.name}
                  </label>
                </Stack>
              )
          )}
        </form>
      </Box>

      {Number(params.id) === 1 && (
        <Box>
          <FilterItem
            title="Loại máy"
            name="conditioningTypes"
            widthColumn={12}
          />
          <FilterItem
            title="Kiểu dáng"
            name="conditioningStyles"
            widthColumn={12}
          />
          <FilterItem
            title="Công suất làm lạnh"
            name="conditioningWattages"
            widthColumn={6}
          />
        </Box>
      )}

      {Number(params.id) === 2 && (
        <Box>
          <FilterItem title="Loại Tivi" name="tiviTypes" widthColumn={12} />
          <FilterItem
            title="Kích thước màn hình"
            name="tiviSizes"
            widthColumn={6}
          />
          <FilterItem
            title="Độ phân giải"
            name="tiviResolutions"
            widthColumn={6}
          />
        </Box>
      )}

      {Number(params.id) === 3 && (
        <Box>
          <FilterItem
            title="Loại máy giặt"
            name="washingTypes"
            widthColumn={12}
          />
          <FilterItem
            title="Khối lượng giặt"
            name="washingCapacitys"
            widthColumn={6}
          />
        </Box>
      )}

      {Number(params.id) === 6 && (
        <Box>
          <FilterItem
            title="Loại điện thoại"
            name="phoneTypes"
            widthColumn={12}
          />
          <FilterItem title="Chất liệu vỏ" name="phoneBarks" widthColumn={12} />
          <FilterItem title="Camera sau" name="phoneCameras" widthColumn={12} />
          <FilterItem
            title="Tính năng đặc biệt"
            name="phoneFeatures"
            widthColumn={12}
          />
        </Box>
      )}

      {Number(params.id) === 7 && (
        <Box>
          <FilterItem
            title="Kích thước màn hình"
            name="lapSizes"
            widthColumn={12}
          />
          <FilterItem title="Bộ vi xử lý" name="lapCores" widthColumn={12} />
          <FilterItem title="RAM" name="lapRAMs" widthColumn={6} />
          <FilterItem title="Card đồ hoa" name="lapCards" widthColumn={12} />
        </Box>
      )}
    </Box>
  );
};

export default Filter;
