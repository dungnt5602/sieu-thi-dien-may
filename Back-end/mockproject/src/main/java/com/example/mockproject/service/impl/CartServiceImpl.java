package com.example.mockproject.service.impl;

import com.example.mockproject.exception.ResourceNotFoundException;
import com.example.mockproject.model.entity.Cart;
import com.example.mockproject.model.entity.CartItem;
import com.example.mockproject.model.entity.Product;
import com.example.mockproject.model.entity.User;
import com.example.mockproject.repository.CartItemRepository;
import com.example.mockproject.repository.CartRepository;
import com.example.mockproject.repository.UserRepository;
import com.example.mockproject.service.CartService;
import org.springframework.stereotype.Service;
import org.springframework.util.SerializationUtils;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class CartServiceImpl extends BaseServiceImpl<Cart, Long>
implements CartService {
    private CartRepository cartRepository;
    private UserRepository userRepository;

    private CartItemRepository cartItemRepository;
    public CartServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository, UserRepository userRepository) {
        super(cartRepository);
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public List<Cart> getCartsByUserId(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", id.toString()));
        return user.getCarts();
    }

    @Override
    public List<Product> getCartItemsByUserId(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", id.toString()));

        List<Cart> carts = user.getCarts();
        for (Cart cart: carts) {
            if (Objects.equals(cart.getStatus(), "Approved")) {
//                return cart.getProducts();
                return null;
            }
        }
        return null;
    }

    @Override
    public List<CartItem> getCartItemsByUserId2(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", id.toString()));
        if (!user.getStatus().equals("active")) throw new ResourceNotFoundException("User", id.toString());
        if(user.getCarts().size() > 1) {
            for (int i = 1; i < user.getCarts().size(); i++) {
                for (CartItem cartItem: user.getCarts().get(i).getCartItems()) {
                    cartItem.setCart(user.getCarts().get(0));
                }
            }
        }
        if (user.getCarts().size() != 0) {
            Cart carts = user.getCarts().get(0);
            carts.setTotal(totalCostOfCart(carts).doubleValue());
            List<CartItem> cartItems = new ArrayList<>();
            for (CartItem cartItem: carts.getCartItems()) {
                if (cartItem.getProduct().getStatus().equals("active"))
                    cartItems.add(cartItem);
            }
            return cartItems;
        }
        return createCartByUserId(id).getCartItems();
    }

    @Override
    public List<CartItem> updateCartItemByUserId(Long id, Long productId, CartItem cartItem) {
//        System.out.println("check");
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", id.toString()));
        Cart carts = user.getCarts().get(0);
        cartItemRepository.save(cartItem);
        carts.setTotal(totalCostOfCart(carts).doubleValue());
        List<CartItem> cartItems = new ArrayList<>();
        for (CartItem item: carts.getCartItems()) {
            if (item.getProduct().getStatus().equals("active")) {
                cartItems.add(item);
            }
        }
        return cartItems;
    }

    @Override
    @Transactional
    public List<CartItem> removeCartItemByUserId(Long userId, CartItem cartItemRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", userId.toString()));
        if (user.getCarts().size() != 0) {
            Cart cart = user.getCarts().get(0);
//            cartItemRepository.deleteById(cartItem.getId());
//            int index = cart.getCartItems().indexOf(cartItem);
            int index = -1;
            for (int i = 0; i < cart.getCartItems().size(); i++) {
                System.out.println(cart.getCartItems().get(i).getId() + " " + cartItemRequest.getId());
                if (cart.getCartItems().get(i).getId().equals(cartItemRequest.getId())) {
                    index = i;
                    break;
                }
            }
            System.out.println(index);
            if (index >= 0) {
                cart.getCartItems().remove(index);
            }
            cart.setTotal(totalCostOfCart(cart).doubleValue());

            List<CartItem> cartItems = new ArrayList<>();
            for (CartItem item: cart.getCartItems()) {
                if (item.getProduct().getStatus().equals("active")) {
                    cartItems.add(item);
                }
            }
            return cartItems;
        }
        return createCartByUserId(userId).getCartItems();
    }

    @Override
    public List<CartItem> addProductToCart(Long userId, CartItem cartItemRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", userId.toString()));
        Date currentDate = new Date();
        String dateToStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(currentDate);

        if (user.getCarts().size() != 0) {
            Cart carts = user.getCarts().get(0);
            Boolean hasProduct = false;
            for (CartItem cartItem: carts.getCartItems()) { // find product in user cart
                if (cartItem.getProduct().getId().equals(cartItemRequest.getProduct().getId())) {
                    hasProduct = true;
                    cartItem.setQuantity(cartItem.getQuantity() + cartItemRequest.getQuantity());
                    cartItem.setModifiedDate(dateToStr);
                    cartItemRepository.save(cartItem);
                    carts.setTotal(totalCostOfCart(carts).doubleValue());
//                    return carts.getCartItems();
                }
            }
            if (!hasProduct) {
                CartItem cartItem = new CartItem(
                        cartItemRequest.getQuantity(), cartItemRequest.getProduct().getPrice(),
                         cartItemRequest.getProduct().getDiscount(), dateToStr, dateToStr,
                         cartItemRequest.getProduct(), carts
                );
                carts.getCartItems().add(cartItem);
                carts.setTotal(totalCostOfCart(carts).doubleValue());
            }

            List<CartItem> cartItems = new ArrayList<>();
            for (CartItem item: carts.getCartItems()) {
                if (item.getProduct().getStatus().equals("active")) {
                    cartItems.add(item);
                }
            }
            return cartItems;
        }else {
            Cart cart = createCartByUserId(userId);
            CartItem cartItem = new CartItem(
                    cartItemRequest.getQuantity(), cartItemRequest.getProduct().getPrice(),
                    cartItemRequest.getProduct().getDiscount(), dateToStr, dateToStr,
                    cartItemRequest.getProduct(), cart
            );
            cart.getCartItems().add(cartItem);
            cartItemRepository.save(cartItem);
            cart.setTotal(totalCostOfCart(cart).doubleValue());
            List<CartItem> cartItems = new ArrayList<>();
            for (CartItem item: cart.getCartItems()) {
                if (item.getProduct().getStatus().equals("active")) {
                    cartItems.add(item);
                }
            }
            return cartItems;
        }
    }


    public Cart createCartByUserId(Long userId) {
        List<CartItem> cartItems = new ArrayList<>();
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", userId.toString()));
        System.out.println("Cart: " + user.getCarts().size());
        if(user.getCarts().size() == 0) {
            Cart cart = new Cart();
            Date currentDate = new Date();
            String dateToStr = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(currentDate);

            cart.setStatus("Process");
            cart.setTotal(Double.valueOf(0));
            cart.setCreatedDate(dateToStr);
            cart.setModifiedDate(dateToStr);
            cart.setCartItems(cartItems);
            cart.setUser(user);
            cartRepository.save(cart);
            return cart;
        } else return user.getCarts().get(0);
    }

    private BigDecimal totalCostOfCart(Cart carts) {
        BigDecimal totalCost = BigDecimal.valueOf(0);
        for (CartItem cartItem: carts.getCartItems()) {
            if (cartItem.getProduct().getStatus().equals("active")) {
                BigDecimal quantity = BigDecimal.valueOf(cartItem.getQuantity());
                BigDecimal price = cartItem.getProduct().getPrice();
                double discount = ((double)(100 - cartItem.getProduct().getDiscount())/100);
                price = price.multiply(quantity).multiply(BigDecimal.valueOf(discount));
                totalCost = totalCost.add(price);
            }
        }
        return totalCost;
    }
}
