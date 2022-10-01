package vn.codegym.pig_farm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.codegym.pig_farm.entity.Book;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {

    @Query(value = "select * from `book`", nativeQuery = true)
    List<Book> getListBook();

}
