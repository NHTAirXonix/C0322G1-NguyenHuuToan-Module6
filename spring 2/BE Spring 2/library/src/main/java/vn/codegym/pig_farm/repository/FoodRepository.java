package vn.codegym.pig_farm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import vn.codegym.pig_farm.entity.Food;
import vn.codegym.pig_farm.entity.Pigsty;
import vn.codegym.pig_farm.entity.Storage;

@Repository
@Transactional
public interface FoodRepository extends JpaRepository<Food, Integer> {
    /**
     * Create by HoanTV
     * Date: 16:30 pm  08-9-2022
     * method show list and search and paging
     * HoanTV-list-food
     *
     * @param pageable
     * @param foodType
     * @return
     **/
    @Query(value = " select f.id, f.amount,f.unit, f.is_deleted, f.pigsty_id,f.storage_id from food f " + " join pigsty p on p.id = f.pigsty_id " + " join storage s on s.id = f.storage_id " + " where s.food_type like :foodType order by id desc", nativeQuery = true, countQuery = " select count(*) from ( select f.id,f.unit, f.amount, f.is_deleted, f.pigsty_id, f.storage_id from food f " + " join pigsty p on p.id = f.pigsty_id " + " join storage s on s.id = f.storage_id " + " where s.food_type like :foodType order by id desc) temp ")
    Page<Food> getAllFood(Pageable pageable, @Param("foodType") String foodType);


    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: save a food
     *
     * @param amount
     * @param unit
     * @param pigsty
     * @param storage
     */
    @Modifying
    @Query(value = "INSERT INTO food(amount, unit, pigsty_id, storage_id) " + " values(:amount, :unit , :pigsty, :storage)", nativeQuery = true)
    void save(@Param("amount") Double amount, @Param("unit") String unit, @Param("pigsty") Pigsty pigsty, @Param("storage") Storage storage);


    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: edit a food
     *
     * @param amount
     * @param unit
     * @param pigsty
     * @param storage
     */
    @Transactional
    @Modifying
    @Query(value = "update food set amount = :amount, unit = :unit, pigsty_id = :pigsty, storage_id = :storage where id = :id", nativeQuery = true)
    void update(@Param("amount") Double amount, @Param("unit") String unit, @Param("pigsty") Pigsty pigsty, @Param("storage") Storage storage, @Param("id") Integer id);


    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: findById a food
     *
     * @param id
     * @return
     */
    @Query(value = "select id, amount, is_deleted, unit, pigsty_id, storage_id from food where id = :id", nativeQuery = true)
    Food findById(@Param("id") int id);
}