export const totalCostOfCart = (userCart) => {
    let totalCost = 0;
    for (let cartitem in userCart) {
        let discount = (100 - userCart[cartitem]["product"]["discount"]) / 100;
        totalCost +=
            Math.round(userCart[cartitem]["product"]["price"] *
            userCart[cartitem]["quantity"] * Number(discount));
    }
    return totalCost;
};

export const handleAddProductToCart = (product, quantity) => {
    let cartData = JSON.parse(localStorage["cart"]);
    let cartItem = {
        product: product,
        quantity: Number(quantity),
        total: product["price"],
    };
    cartData.push(cartItem);
    cartData[0]["total"] = totalCostOfCart(cartData);
    localStorage.setItem("cart", JSON.stringify(cartData));
    return cartData;
};

export const handleCreateCart = (product, quantity) => {
    // console.log("CreateCart");
    let cartItem = {
        product: product,
        quantity: Number(quantity),
        total:
            Math.round(product["price"] *
            Number(quantity) *
            Number((100 - product["discount"]) / 100)),
    };
    return cartItem;
};

export const handleUpdateQuantityCartItem = (oridinalItem, quantity) => {
    // console.log("Update quantity");
    const cartData = JSON.parse(localStorage["cart"]);
    cartData[oridinalItem]["quantity"] = quantity;
    const total = totalCostOfCart(cartData);
    for (let index = 0; index < cartData.length; index++) {
        cartData[index]["total"] = total;
    }
    localStorage.setItem("cart", JSON.stringify(cartData));
    return cartData;
};

export const handleRemoveCartItem = (oridinalItem) => {
    // console.log("Remove cart");
    let cartData = JSON.parse(localStorage["cart"]);
    cartData = deleteItem(oridinalItem, cartData);
    const total = totalCostOfCart(cartData);
    for (let index = 0; index < cartData.length; index++) {
        cartData[index]["total"] = total;
    }
    localStorage.setItem("cart", JSON.stringify(cartData));
    return cartData;
};

const deleteItem = (keyItem, items) => {
    for (let i = keyItem; i < items.length; i++) {
        items[i] = items[i + 1];
        if (i === items.length - 1) {
            delete items[i];
            items["length"] = items.length - 1;
            break;
        }
    }
    console.log(items);
    return items;
};

export const productIsExistInCart = (productId, cartItems) => {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i]["product"]["id"] === productId) return i;
    }
    return false;
};
