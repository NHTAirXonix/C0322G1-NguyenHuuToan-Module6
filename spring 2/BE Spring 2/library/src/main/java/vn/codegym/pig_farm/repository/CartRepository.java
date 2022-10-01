package vn.codegym.pig_farm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.codegym.pig_farm.entity.Cart;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public interface CartRepository extends JpaRepository<Cart,Integer> {

    @Query(value = "select * from `cart` where book_id = :bookId and user_id = :userId", nativeQuery = true)
    List<Cart> getCart(@Param("bookId") Integer bookId, @Param("userId") Integer userId);

    @Modifying
    @Query(value = "update `cart` set amount = amount + :amountIn where book_id = :bookId and user_id = :userId", nativeQuery = true)
    void addToCartExits(@Param("bookId") Integer bookId, @Param("userId") Integer userId, @Param("amountIn") Integer amountIn);

    @Query(value = "select * from `cart` where user_id = :userId", nativeQuery = true)
    List<Cart> getListCart(@Param("userId") Integer userId);
}
