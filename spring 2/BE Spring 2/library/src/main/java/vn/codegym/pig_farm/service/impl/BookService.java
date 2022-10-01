package vn.codegym.pig_farm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.codegym.pig_farm.entity.AppUser;
import vn.codegym.pig_farm.entity.Book;
import vn.codegym.pig_farm.entity.Cart;
import vn.codegym.pig_farm.repository.BookRepository;
import vn.codegym.pig_farm.repository.CartRepository;
import vn.codegym.pig_farm.repository.UserRepository;
import vn.codegym.pig_farm.service.IBookService;

import java.util.List;

@Service
public class BookService implements IBookService {

    @Autowired
    BookRepository bookRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CartRepository cartRepository;

    @Override
    public List<Book> getListBook() {
        return bookRepository.getListBook();
    }

    @Override
    public Book getBook(Integer id) {
        return bookRepository.findById(id).get();
    }

    @Override
    public AppUser getUser(String userName) {
        return userRepository.findAppUserByName(userName);
    }

    @Override
    public Book findById(Integer bookId) {
        return bookRepository.findById(bookId).get();
    }

    @Override
    public void addToCart(Cart cart) {
        cartRepository.save(cart);
    }

    @Override
    public void addToCartExist(Integer bookId, Integer userId, Integer amount) {
        cartRepository.addToCartExits(bookId, userId, amount);
    }

    @Override
    public List<Cart> getListCart(Integer userId) {
        return cartRepository.getListCart(userId);
    }

    @Override
    public List<Cart> getCart(Integer bookId, Integer userId) {
        return cartRepository.getCart(bookId, userId);
    }
}
