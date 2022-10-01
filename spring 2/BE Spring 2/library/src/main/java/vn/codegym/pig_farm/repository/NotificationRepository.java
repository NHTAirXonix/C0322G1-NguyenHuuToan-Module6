package vn.codegym.pig_farm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.codegym.pig_farm.dto.projections.NotificationDto;
import vn.codegym.pig_farm.entity.Notification;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    /**
     * Create by HuyenTN
     * Date: 08/09/2022
     * Write query fìndById
     * @param id
     */

    @Query(value = "select * from notification where id = :id", nativeQuery = true)
    Optional<Notification> findById(@Param("id") Integer id);

    /**
     * Create by HuyenTN
     * Date: 08/09/2022
     * Write query create notification
     * @param id
     * @param content
     * @param submittedDate
     * @param image
     */

    @Transactional
    @Modifying
    @Query(value = "insert into notification(id, title, content, submitted_date, image) " +
            " values (:id, :title, :content, :submitted_date, :image);", nativeQuery = true)
    void save(@Param("id") Integer id, @Param("title") String title, @Param("content") String content,
              @Param("submitted_date") LocalDate submittedDate, @Param("image") String image);

    /**
     * Create by HuyenTN
     * Date: 08/09/2022
     * Write query edit notification
     * @param content
     * @param submittedDate
     * @param image
     * @param isDeleted
     * @param id
     */
    @Transactional
    @Modifying
    @Query(value = "update notification set title = :title, content = :content, submitted_date = :submittedDate, " +
            " image = :image, is_deleted = :isDeleted where id = :id", nativeQuery = true)
    void update(@Param("title") String title, @Param("content") String content, @Param("submittedDate") LocalDate submittedDate,
                @Param("image") String image, @Param("isDeleted") Boolean isDeleted, @Param("id") Integer id);


    /**
     * Created by: DatLT
     * Date created: 08/09/2022
     * Function: Display all news list by keyword with pagination
     *
     * @param pageable pageable
     * @param keyword  keyword
     * @return Page<Notification> notifications
     */
    @Query(value = "select * " +
            "from notification " +
            "where title like %:keyword% and " +
            "content like %:keyword% and " +
            "is_deleted = 0 " +
            "order by id desc",
            nativeQuery = true)
    Page<Notification> findAll(Pageable pageable, @Param("keyword") String keyword);


    /**
     * Create by HaiTV
     * Date : 08/09/2022
     * Display : Notification
     *
     * @param content
     * @param pageable
     * @return
     */

    @Query(value = " select id , content, title , submitted_date as submittedDate , image  " +
            " from notification " +
            " where content " +
            "like :content " +
            "and is_deleted =0 order by id desc",
            nativeQuery = true,
            countQuery = "select count(*) from (select id , content, title , submitted_date as submittedDate , image  " +
                    " from notification " +
                    " where content " +
                    "like :content " +
                    "and is_deleted =0 order by id desc) as subTable")
    Page<NotificationDto> findAllNotification(Pageable pageable, @Param("content") String content);

    /**
     * Create by HaiTV
     * Date : 08/09/2022
     * Delete : Notification
     *
     * @param id
     */
    @Transactional
    @Modifying
    @Query(value = "update notification set is_deleted =1 where id =:id", nativeQuery = true)
    void delete(@Param("id") Integer id);
}
