package vn.codegym.pig_farm.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import vn.codegym.pig_farm.dto.projections.NotificationDto;
import vn.codegym.pig_farm.entity.Notification;
import java.util.Optional;

public interface INotificationService {

    /**
     * Created by: DatLT
     * Date created: 08/09/2022
     * Function: Display all news list by keyword with pagination
     * @param pageable pageable
     * @param keyword keyword
     * @return Page<Notification>
     */
    Page<Notification> findAll(Pageable pageable, @Param("keyword") String keyword);


    /**
     * Create by HuyenTN
     * Date: 08/09/2022
     * Create method findById
     * @param id
     * @return findById(Integer id)
     */
    Optional<Notification> findById(Integer id);

    /**
     * Create by HuyenTN
     * Date: 08/09/2022
     * Create method save
     * @param notification
     * @return save(Notification notification)
     */

    void save(Notification notification);

    /**
     * Create by HuyenTN
     * Date: 08/09/2022
     * Create method update
     * @param notification
     * @return save(Notification notification)
     */

    void update(Notification notification);

    /**
     * Create by HaiTV
     * Date : 08/09/2022
     * Display :Interface  Notification
     *
     * @param content
     * @param pageable
     * @return
     */
    Page<NotificationDto> findAllNotification(Pageable pageable, String content);


    /**
     * Create by HaiTV
     * Date : 08/09/2022
     * Delete :Interface Notification
     *
     * @param ids
     */
    void delete(Integer[] ids);
}
