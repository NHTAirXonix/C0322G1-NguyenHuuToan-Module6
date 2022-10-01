package vn.codegym.pig_farm.controller;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import vn.codegym.pig_farm.dto.projections.NotificationDto;
import vn.codegym.pig_farm.entity.Notification;
import vn.codegym.pig_farm.service.INotificationService;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/public/api/v1/notification")
public class NotificationRestController {
    @Autowired
    private INotificationService notificationService;

    /**
     * Created by: DatLT
     * Date created: 08/09/2022
     * Function: Display all news list by keyword with pagination
     *
     * @param pageable pageable
     * @param keyword  keyword
     * @return HTTP status code 200 (OK): return Page<Notification> notifications
     * HTTP status code 204 (NO_CONTENT): return notifications is empty
     */

    @GetMapping("/list")
    public ResponseEntity<Page<Notification>> findAll(@PageableDefault(value = 10) Pageable pageable, @RequestParam Optional<String> keyword) {
        Page<Notification> notifications = notificationService.findAll(pageable, keyword.orElse(""));
        if (notifications.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }

    /**
     * Create by HuyenTN
     * Date: 08/09/2022
     * Create notification
     *
     * @param notificationDto
     * @param bindingResult
     * @return HttpStatus: Http 200 OK, ResponseEntity<>(),
     * * HttpStatus: Http 404 NOT_FOUND, ResponseEntity is enity
     */

    @PostMapping("/create")
    public ResponseEntity<List<FieldError>> create(@RequestBody @Valid vn.codegym.pig_farm.dto.NotificationDto notificationDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.NOT_ACCEPTABLE);
        }

        Notification notification = new Notification();
        BeanUtils.copyProperties(notificationDto, notification);
        notification.setSubmittedDate(LocalDate.now());
        this.notificationService.save(notification);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Create by HuyenTN
     * Date: 08/09/2022
     * Find By Id
     *
     * @param id
     * @return HttpStatus: Http 200 OK, ResponseEntity<>(notification.get()),
     * HttpStatus: Http 404 NOT_FOUND, ResponseEntity is enity
     */

    @GetMapping("/{id}")
    public ResponseEntity<Notification> findById(@PathVariable Integer id) {
        Optional<Notification> notification = notificationService.findById(id);
        if (!notificationService.findById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(notification.orElse(null), HttpStatus.OK);
    }

    /**
     * Create by HuyenTN
     * Date: 08/09/2022
     * Edit notification
     *
     * @param id
     * @param notificationDto
     * @param bindingResult
     * @return HttpStatus.NOT_MODIFIED: Http 300, errors
     * HttpStatus.NO_CONTENT: Http 404, ResponseEntity is enity
     * HttpStatus.OK: Http 200, ResponseEntity(currentNotification.get())
     */

    @PutMapping("/update/{id}")
    public ResponseEntity<Notification> update(@PathVariable Integer id, @Valid @RequestBody vn.codegym.pig_farm.dto.NotificationDto notificationDto, BindingResult bindingResult) {
        Optional<Notification> currentNotification = notificationService.findById(id);

        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }

        if (!currentNotification.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        currentNotification.get().setId(notificationDto.getId());
        currentNotification.get().setTitle(notificationDto.getTitle());
        currentNotification.get().setContent(notificationDto.getContent());
        currentNotification.get().setImage(notificationDto.getImage());

        notificationService.update(currentNotification.get());

        return new ResponseEntity<>(currentNotification.get(), HttpStatus.OK);
    }


    /**
     * Create by HaiTV
     * Date : 08/09/2022
     * Display : Notification
     *
     * @param content
     * @param pageable
     * @return HttpStatus: Http 200 OK
     * @return HttpStatus: Http 400 NO_CONTENT
     */
    @GetMapping("/page")
    private ResponseEntity<Page<NotificationDto>> findAllNotification(@PageableDefault(5) Pageable pageable,
                                                                      @RequestParam Optional<String> content) {
        String searchContent = content.orElse("");
        Page<NotificationDto> notifications = notificationService.findAllNotification(pageable, searchContent);
        if (notifications.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }


    /**
     * Create by HaiTV
     * Date : 08/09/2022
     * Delete : Notification
     *
     * @param ids
     * @return HttpStatus: Http 200 OK
     */
    @PostMapping("/delete")
    public ResponseEntity<Object> delete(@RequestBody Map<String, Integer[]> ids) {
        notificationService.delete(ids.get("id"));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
