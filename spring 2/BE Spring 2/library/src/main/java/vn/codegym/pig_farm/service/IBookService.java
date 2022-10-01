package vn.codegym.pig_farm.service;

import vn.codegym.pig_farm.entity.AppUser;
import vn.codegym.pig_farm.entity.Book;
import vn.codegym.pig_farm.entity.Cart;

import java.util.List;

public interface IBookService {

    List<Book> getListBook();

    Book getBook(Integer id);

    AppUser getUser(String userName);

    List<Cart> getCart(Integer bookId, Integer userId);

    Book findById(Integer bookId);

    void addToCart(Cart cart);

    void addToCartExist(Integer bookId, Integer userId, Integer amount);

    List<Cart> getListCart(Integer userId);
}
