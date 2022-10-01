package vn.codegym.pig_farm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.codegym.pig_farm.dto.projections.NotificationDto;
import vn.codegym.pig_farm.entity.Notification;
import vn.codegym.pig_farm.repository.NotificationRepository;
import vn.codegym.pig_farm.service.INotificationService;

import java.util.Optional;

@Service
public class NotificationService implements INotificationService {

    @Autowired
    NotificationRepository notificationRepository;

    /**
     * Created by: DatLT
     * Date created: 08/09/2022
     * Function: Display all news list by keyword with pagination
     *
     * @param pageable pageable
     * @param keyword  keyword
     * @return Page<Notification> notifications
     */

    @Override
    public Page<Notification> findAll(Pageable pageable, String keyword) {
        return notificationRepository.findAll(pageable, keyword);
    }


    /**
     * Create by HuyenTN
     * Date: 08/09/2022
     * Override method findById
     *
     * @param id
     * @return notificationRepository.findById(id)
     */
    @Override
    public Optional<Notification> findById(Integer id) {
        return notificationRepository.findById(id);
    }

    /**
     * Create by HuyenTN
     * Date: 08/09/2022
     * Override method save
     *
     * @param notification
     */

    @Override
    public void save(Notification notification) {
        notificationRepository.save(notification.getId(), notification.getTitle(), notification.getContent(), notification.getSubmittedDate(), notification.getImage());
    }

    /**
     * Create by HuyenTN
     * Date: 08/09/2022
     * Override method update
     *
     * @param notification
     */

    @Override
    public void update(Notification notification) {
        notificationRepository.update(notification.getTitle(), notification.getContent(), notification.getSubmittedDate(), notification.getImage(), notification.getIsDeleted(), notification.getId());
    }


    /**
     * Create by HaiTV
     * Date : 08/09/2022
     * Display : Notification
     *
     * @param content
     * @param pageable
     * @return
     */
    @Override
    public Page<NotificationDto> findAllNotification(Pageable pageable, String content) {
        return notificationRepository.findAllNotification(pageable, "%" + content + "%");

    }


    /**
     * Create by HaiTV
     * Date : 08/09/2022
     * Delete : Notification
     *
     * @param ids
     */
    @Override
    public void delete(Integer[] ids) {
        for (Integer id : ids) {
            notificationRepository.delete(id);
        }
    }
}
