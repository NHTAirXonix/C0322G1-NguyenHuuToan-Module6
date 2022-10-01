package vn.codegym.pig_farm.dto.projections;

import java.time.LocalDate;

/**
 * Create by HaiTV
 * Date : 08/09/2022
 */
public interface NotificationDto {
    Integer getId();

    String getTitle();

    String getContent();

    LocalDate getSubmittedDate();

    String getImage();

}
