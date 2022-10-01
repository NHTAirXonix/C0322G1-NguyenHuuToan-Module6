package vn.codegym.pig_farm.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import vn.codegym.pig_farm.entity.Advertisement;
import vn.codegym.pig_farm.dto.projections.AdvertisementDto;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Transactional
@Repository
public interface AdvertisementRepository extends JpaRepository<Advertisement, Integer> {

    /**
     * Created by : ChungHV
     * Date created : 9/8/2022
     * Function: Post advertisement
     *
     * @param image
     * @param submittedDate
     * @param timeExistence
     * @param title
     * @param placement
     */

    @Modifying
    @Query(value = "insert into advertisement(image,submitted_date,time_existence,title,placement_id)" + "values (:image,:submittedDate,:timeExistence,:title,:placement)", nativeQuery = true)
    void saveAdvertisement(@Param("image") String image, @Param("submittedDate") LocalDate submittedDate, @Param("timeExistence") String timeExistence, @Param("title") String title, @Param("placement") Integer placement);

    /**
     * Created by :ChungHV
     * Date created : 9/8/2022
     * Function : Update advertisement
     *
     * @param image
     * @param submittedDate
     * @param timeExistence
     * @param title
     * @param placement
     * @param id
     */
    @Modifying
    @Query(value = "update advertisement set image =:image, submitted_date =:submittedDate, time_existence =:timeExistence," + "title =:title, placement_id =:placement where id =:id", nativeQuery = true)
    void updateAdvertisement(@Param("image") String image, @Param("submittedDate") LocalDate submittedDate, @Param("timeExistence") String timeExistence, @Param("title") String title, @Param("placement") Integer placement, @Param("id") Integer id);

    /**
     * Created by :ChungHV
     * Date created : 9/8/2022
     * Function : FindById advertisement
     *
     * @param id
     * @return : Optional<Advertisement>
     */
    @Query(value = "select * from advertisement where id =:id", nativeQuery = true)
    Optional<Advertisement> findById(@Param("id") Integer id);


    /**
     * @param pageable
     * @param keySearch
     * @return Advertisement, status 200
     * @function (Query to display all Advertisement and search)
     * @creator DucNH
     * @date-create 08/09/2022
     */
    @Query(value = "select id ,title ,image ,submitted_date as submittedDate,time_existence as timeExistence, is_deleted, placement_id " +
            "from advertisement where title like :keySearch and is_deleted = 0 order by id desc", nativeQuery = true,
            countQuery = "select count(*) from (select id ,title ,image ,submitted_date as submittedDate,time_existence as timeExistence, is_deleted, placement_id " +
                    "from advertisement where title like :keySearch and is_deleted = 0 order by id desc) as abc")
    Page<AdvertisementDto> findAllAdvertisement(Pageable pageable, @Param("keySearch") String keySearch);


    /**
     * @param id
     * @function (Query to delete Advertisement)
     * @creator DucNH
     * @date-create 08/09/2022
     */
    @javax.transaction.Transactional
    @Modifying
    @Query(value = "update advertisement set is_deleted = 1 where id =:id", nativeQuery = true)
    void deleteAdvertisement(@Param("id") Integer id);


    @Query(value = "select `submitted_date` from advertisement where `submitted_date` = :submittedDate", nativeQuery = true)
    String existDate(@Param("submittedDate") String submittedDate);

    @Query(value = "select * from advertisement where is_deleted = 0 order by id desc limit 5",nativeQuery = true)
    List<Advertisement> getAllAdvertisement();
}
