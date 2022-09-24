import React from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductItem from "../Product/ProductItem";
import ProductsAPI from "../../api/ProductsAPI";
import RecommendsAPI from "../../api/RecommendsAPI";
import { Link } from "react-router-dom"
import "./recommend.css";

const Recommend = ({ productsRecommend }) => {
  const params = useParams();
  const [products, setProducts] = React.useState([]);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  

  React.useEffect(() => {
    RecommendsAPI.getRecommendsForProductDetail(productsRecommend)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => console.log(error));
  }, [params]);

  return products !== undefined ? (
    <Box className="recommend-container recommend-product_box">
      <Link to="/products" className="link-title">Gợi ý sản phẩm</Link>

      <Box sx={{m: "24px 0 24px"}}>
        <Slider {...settings}>
          {products.map((product, index) => {
            if (index > 10) return null;
            else return <ProductItem key={product.id} product={product} />;
          })}
        </Slider>
      </Box>
    </Box>
  ): null;
};

export default Recommend;
