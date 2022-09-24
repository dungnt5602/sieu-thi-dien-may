import React from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductItem from "../Product/ProductItem";
import ProductsAPI from "../../api/ProductsAPI";
import RecommendsAPI from "../../api/RecommendsAPI";
import { Link } from "react-router-dom";
import "./recommend.css";
import GlobalState from "../../GlobalState";
const Recommend = ({ cartProducts }) => {
    const context = React.useContext(GlobalState);
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
        if (context.isLoggedIn) {
            RecommendsAPI.getRecommendForLoginUser(context.userId, context.accessToken)
                .then((res) => {
                    setProducts(res.data);
                })
                .catch((error) => console.log(error));
        } else {
            let recommendData = localStorage.getItem("recommend") ? JSON.parse(localStorage.getItem("recommend")): [];
            RecommendsAPI.getRecommendForSessionUser(recommendData)
                .then((res) => {
                    setProducts(res.data);
                })
                .catch((error) => console.log(error));
        }
    }, []);

    return products !== undefined ? (
        <Box className="recommend-container">
            <Link to="/products" className="link-title">
                Gợi ý sản phẩm
            </Link>

            <Box sx={{ m: "24px 0 24px" }}>
                <Slider {...settings}>
                    {products.map((product, index) => {
                        if (index > 10) return null;
                        else
                            return (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                />
                            );
                    })}
                </Slider>
            </Box>
        </Box>
    ) : null;
};

export default Recommend;
