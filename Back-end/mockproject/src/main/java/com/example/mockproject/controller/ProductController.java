package com.example.mockproject.controller;
import com.example.mockproject.model.entity.Category;
import com.example.mockproject.model.entity.Order;
import com.example.mockproject.model.entity.Product;
import com.example.mockproject.service.ProductService;
import com.example.mockproject.specification.GenericSpecificationsBuilder;
import com.example.mockproject.specification.ProductSpecification;
import com.example.mockproject.util.CriteriaParser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @RequestMapping(value="admin/products", method= RequestMethod.POST)
    public Product createProduct(@RequestBody @Valid Product product) {
        return productService.save(product);
//        return productService.createProduct(product);
    }

    @RequestMapping(value="admin/products", method=RequestMethod.GET)
    public Page<Product> getProducts(Pageable pageable) {
        return productService.findAll(pageable);
    }

    @RequestMapping(value="products", method=RequestMethod.GET)
    public Page<Product> getProductsCustomer(@RequestParam(value = "search", required = false) String search, Pageable pageable) {
        if(search == null || search.isBlank()) return productService.findAll(pageable);
        Specification<Product> spec = resolveSpecification(search);
        return productService.findWithFilter(spec, pageable);
    }

    @RequestMapping(value="/products/brands", method=RequestMethod.GET)
    public List<String> getProductsBrands(@RequestParam(value = "category", required = false) Category category) {
        if(category != null) return productService.findDistinctBrandsByCategory(category);
        else return productService.findDistinctBrands();
    }

    @RequestMapping(value="/products/category={id}", method = RequestMethod.GET)
    public Page<Product> getProductsByCategory(@PathVariable(value="id")Category category, Pageable pageable) {
        return productService.findByCategory(category, pageable);
    }

    @RequestMapping(value="admin/products/category={id}", method = RequestMethod.GET)
    public Page<Product> getProductsByCategoryAdmin(@PathVariable(value="id")Category category, Pageable pageable) {
        return productService.findByCategory(category, pageable);
    }

    @RequestMapping(value="/products/top10", method=RequestMethod.GET)
    public Page<Product> getTop10ByDiscount(Pageable pageable) {
        return productService.findTop10ByDiscount(pageable);
    }

    @RequestMapping(value="/products/{id}", method = RequestMethod.GET)
    public Product getProductById(@PathVariable(value="id") Long id) {
        return productService.findById(id);
    }

    @RequestMapping(value="admin/products/{id}", method=RequestMethod.PUT)
    public Product updateProductById(@PathVariable(value="id") Long id,
                                     @RequestBody Product productDetail) {
        return productService.updateById(productDetail, id);
    }

//    @RequestMapping(value="admin/products/{id}", method=RequestMethod.PATCH)
//    public Product updateProductById(@PathVariable(value="id") Long id,
//                                     @RequestBody Product productDetail) {
//        return productService.updateById(productDetail, id);
//    }

    @RequestMapping(value="admin/products/{id}", method=RequestMethod.DELETE)
    public void deleteProductById(@PathVariable(value="id") Long id) {
        productService.deleteById(id);
    }

    //delete by changing status
    @PatchMapping(value = "admin/products/{id}")
    public Product deleteProduct(@PathVariable(value = "id") Long id,
                              @RequestBody Product product){
        return productService.delete(id, product);
    }

    @RequestMapping(value="admin/products/low-quantity", method = RequestMethod.GET)
    public Page<Product> getProductsLowQuantity(Pageable pageable) {
        return productService.findAllProductLowQuantity(pageable);
    }

    @RequestMapping(value="/products/name={name}", method = RequestMethod.GET)
    public Page<Product> getProductsByName(@PathVariable(value="name") String name, Pageable pageable) {
        return productService.findByName(name, pageable);
    }

    @RequestMapping(value="admin/products/name={name}", method = RequestMethod.GET)
    public Page<Product> searchProductAdmin(@PathVariable(value="name") String name, Pageable pageable) {
        return productService.searchProductAdmin(name, pageable);
    }

    protected Specification<Product> resolveSpecification(String searchParameters) {
        CriteriaParser parser = new CriteriaParser();
        GenericSpecificationsBuilder<Product> specBuilder = new GenericSpecificationsBuilder<>();
        return specBuilder.build(parser.parse(searchParameters), ProductSpecification::new);
    }
}
