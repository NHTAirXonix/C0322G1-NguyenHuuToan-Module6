package vn.codegym.pig_farm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import vn.codegym.pig_farm.dto.projections.StorageDto;
import vn.codegym.pig_farm.entity.Storage;

import java.time.LocalDate;
import java.util.List;

@Transactional
public interface StorageRepository extends JpaRepository<Storage, Integer> {

    @Query(value = "select storage.id, storage.amount, storage.food_type, storage.date, storage.unit, storage.is_deleted from storage", nativeQuery = true)
    List<Storage> storageList();

    /**
     * Created by: HoangDT
     * Date created: 08/09/2022
     * Function: findAll
     */
    @Query(value = " select storage.id, storage.amount,storage.food_type as foodType, storage.date as date, storage.unit from storage where food_type like :foodType and is_deleted = 0 and amount > 0 order by id desc", nativeQuery = true,
            countQuery = " select count(*) from (select storage.id, storage.amount,storage.food_type as foodType, storage.date as date, storage.unit from storage where food_type like :foodType  and amount > 0 order by id desc) temp_table ")
    Page<StorageDto> findAllStorage(Pageable pageable, @Param("foodType") String foodType);


    /**
     * Created by: HoangDT
     * Date created: 08/09/2022
     * Function: create storage
     */

    @Modifying
    @Query(value = "insert into `storage` ( amount, food_type, `date`, unit)" +
            "values (:amount, :foodType, :date, :unit)", nativeQuery = true)
    void saveS(@Param("amount") Double amount, @Param("foodType") String foodType, @Param("date") LocalDate date, @Param("unit") String unit);


    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: findByIdStorage2 a Storage
     * @param id
     * @return
     */
    @Query(value = "select id , amount, date, is_deleted, unit, food_type from storage where id = :id ", nativeQuery = true)
    Storage findByIdStorage(@Param("id") int id);


    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: edit a Storage
     *
     * @param amount
     */
    @Transactional
    @Modifying
    @Query(value = "update `storage` set amount = :amount where id = :id", nativeQuery = true)
    void updateAmountStorage(@Param("amount") Double amount, @Param("id") Integer id);

    /**
     * Create by: HungNV
     * Date created: 08/09/2022
     * function: edit a Storage
     *
     * @param delete
     */
    @Transactional
    @Modifying
    @Query(value = "update `storage` set is_deleted = :delete where id = :id", nativeQuery = true)
    void deleteStorage(@Param("delete") Double delete, @Param("id") Integer id);
}