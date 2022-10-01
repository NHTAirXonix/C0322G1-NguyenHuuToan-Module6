package vn.codegym.pig_farm.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.codegym.pig_farm.dto.projections.StatisticByMonthDto;
import vn.codegym.pig_farm.dto.projections.StatisticByYearDto;
import vn.codegym.pig_farm.entity.AppUser;
import vn.codegym.pig_farm.entity.Book;
import vn.codegym.pig_farm.entity.Cart;
import vn.codegym.pig_farm.service.IBookService;
import vn.codegym.pig_farm.service.IStatisticService;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/public/statistic")
public class StatisticRestController {

    @Autowired
    private IStatisticService statisticService;

    @Autowired
    private IBookService bookService;

    /**
     * Created by: ToanNH
     * Date created: 8/9/2022
     * function: Get value statistic by month from Database to return value.
     *
     * @return BAD_REQUEST, NO_CONTENT, OK
     */

    @GetMapping("by-month/{startTime}/{endTime}/{type}")
    public ResponseEntity<List<StatisticByMonthDto>> getStatisticByMonth(@PathVariable String startTime,
                                                                         @PathVariable String endTime,
                                                                         @PathVariable String type) {
        if (type.equals("all")) { type = ""; }
        try {
            LocalDate.parse(startTime).plusDays(1).isAfter(LocalDate.parse(endTime));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (LocalDate.parse(startTime).plusDays(1).isAfter(LocalDate.parse(endTime)) || !type.equals("0") && !type.equals("1") && !type.equals("")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<StatisticByMonthDto> IStatisticByMonthDtoList = statisticService.getStatisticByMonth(startTime, endTime, type);
        if (IStatisticByMonthDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(IStatisticByMonthDtoList, HttpStatus.OK);
    }

    /**
     * Created by: ToanNH
     * Date created: 8/9/2022
     * function: Get value statistic by year from Database to return value.
     *
     * @return BAD_REQUEST, NO_CONTENT, OK
     */

    @GetMapping("by-year/{startTime}/{endTime}/{type}")
    public ResponseEntity<List<StatisticByYearDto>> getStatisticByYear(@PathVariable String startTime,
                                                                       @PathVariable String endTime,
                                                                       @PathVariable String type) {
        if (type.equals("all")){
            type = "";
        }
        try {
            if (LocalDate.parse(startTime).plusDays(1).isAfter(LocalDate.parse(endTime)) || !type.equals("0") && !type.equals("1") && !type.equals("")) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<StatisticByYearDto> statisticByMonthList = statisticService.getStatisticByYear(startTime, endTime, type);
        if (statisticByMonthList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(statisticByMonthList, HttpStatus.OK);
    }

    /**
     * Created by: ToanNH
     * Date created: 9/9/2022
     * function: Get value statistic by month and company from Database to return value.
     *
     * @return BAD_REQUEST, NO_CONTENT, OK
     */

    @GetMapping("by-month-company/{startTime}/{endTime}/{type}/{company}")
    public ResponseEntity<List<StatisticByMonthDto>> getStatisticByMonthAndCompany(@PathVariable String startTime,
                                                                                   @PathVariable String endTime,
                                                                                   @PathVariable String type,
                                                                                   @PathVariable String company) {
        if (type.equals("all")){ type = ""; }
        try {
            if (LocalDate.parse(startTime).plusDays(1).isAfter(LocalDate.parse(endTime)) || company == null || company.equals("") || !type.equals("0") && !type.equals("1") && !type.equals("")) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<StatisticByMonthDto> statisticByYearList = statisticService.getStatisticByMonthAndCompany(startTime, endTime, type, company);
        if (statisticByYearList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(statisticByYearList, HttpStatus.OK);
    }

    /**
     * Created by: ToanNH
     * Date created: 9/9/2022
     * function: Get value statistic by year and company from Database to return value.
     *
     * @return BAD_REQUEST, NO_CONTENT, OK
     */

    @GetMapping("by-year-company/{startTime}/{endTime}/{type}/{company}")
    public ResponseEntity<List<StatisticByYearDto>> getStatisticByYearAndCompany(@PathVariable String startTime,
                                                                                 @PathVariable String endTime,
                                                                                 @PathVariable String type,
                                                                                 @PathVariable String company) {
        if (type.equals("all")){ type = ""; }
        try {
            if (LocalDate.parse(startTime).plusDays(1).isAfter(LocalDate.parse(endTime)) || company == null || company.equals("") || !type.equals("0") && !type.equals("1") && !type.equals("")) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<StatisticByYearDto> StatisticByYearDtoList = statisticService.getStatisticByYearAndCompany(startTime, endTime, type, company);
        if (StatisticByYearDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(StatisticByYearDtoList, HttpStatus.OK);
    }

    /**
     * Created by: ToanNH
     * Date created: 13/9/2022
     * function: Get list company.
     *
     * @return BAD_REQUEST, NO_CONTENT, OK
     */

    @GetMapping("listCompany")
    public ResponseEntity<List<String>> getListCompany( ) {
        List<String> listCompany = statisticService.getListCompany();
        return new ResponseEntity<>(listCompany, HttpStatus.OK);
    }

    @GetMapping("listBook")
    public ResponseEntity<List<Book>> getListBook( ) {
        List<Book> listBook = bookService.getListBook();
        return new ResponseEntity<>(listBook, HttpStatus.OK);
    }

    @GetMapping("getBook/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Integer id ) {
        Book book = bookService.getBook(id);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }



    @GetMapping("getUser/{userName}")
    public ResponseEntity<AppUser> getUser(@PathVariable String userName ) {
        AppUser user = bookService.getUser(userName);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/addToCart/{amount}/{userName}/{bookId}")
    public ResponseEntity<AppUser> getUser(@PathVariable Integer amount,
                                           @PathVariable String userName,
                                           @PathVariable Integer bookId) {
        AppUser user = bookService.getUser(userName);
        Book book = bookService.findById(bookId);
        List<Cart> cartList = bookService.getCart(book.getId(), user.getId());

        if (cartList.isEmpty()) {
            Cart cart = new Cart();
            cart.setAmount(amount);
            cart.setDeleteStatus(0);
            cart.setBook(book);
            cart.setAppUser(user);
            bookService.addToCart(cart);
        } else {
            bookService.addToCartExist(book.getId(), user.getId(), amount);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getCart/{userName}")
    public ResponseEntity<List<Cart>> getCart(@PathVariable String userName) {
        AppUser user = bookService.getUser(userName);
        List<Cart> cartList = bookService.getListCart(user.getId());
        return new ResponseEntity<>(cartList, HttpStatus.OK);
    }
}
