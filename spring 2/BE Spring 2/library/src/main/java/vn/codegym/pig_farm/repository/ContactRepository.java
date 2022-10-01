package vn.codegym.pig_farm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.codegym.pig_farm.entity.Contact;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface ContactRepository extends JpaRepository<Contact, Integer> {

    /**
     * Create by TriPT
     * Date create: 08/09/2022
     * function: Delete Contact
     */
    @Modifying
    @Query(value = "update contact set is_deleted = 1 where id = :id", nativeQuery = true)
    void deleteContact(@Param("id") Integer id);


    /**
     * Create by TriPT
     * Date create: 08/09/2022
     * function: find all Contact by name and content
     */
    @Query(value = "select id, `name`, email, phone, address, content,`date`, is_deleted from contact where is_deleted = 0 and (`name` like :nameSearch or content like :nameSearch) order by `date` desc", nativeQuery = true,
            countQuery = "select count(*) from (select id, `name`, email, phone, address, content,`date`, is_deleted from contact where is_deleted = 0 and (`name` like :nameSearch or content like :nameSearch) order by `date` desc) as aaaa")
    Page<Contact> findAll(Pageable pageable, @Param("nameSearch") String nameSearch);


    /**
     * Create by TriPT
     * Date create: 08/09/2022
     * function: find by id
     */
    @Query(value = "select id, `name`, email, phone, address, content,`date`, is_deleted from contact where id =:id", nativeQuery = true)
    Contact findByIdContact(@Param("id") Integer id);


    /**
     * Create by PhucND
     * Date Create: 08/09/2022
     * This save
     */
    @Modifying
    @Query(value = "insert into contact (`name`, email, phone, address, content,`date`) value (:name, :email, :phone, :address, :content,:date)", nativeQuery = true)
    void save(@Param("name") String name, @Param("email") String email, @Param("phone") String phone, @Param("address") String address, @Param("content") String content,@Param("date") String date);
}
