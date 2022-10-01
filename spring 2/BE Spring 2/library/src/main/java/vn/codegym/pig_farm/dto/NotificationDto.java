package vn.codegym.pig_farm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;

/**
 * Create by HuyenTN
 * Date: 09/09/2022
 * Create class NotificationDto
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {
    private Integer id;
    @NotBlank(message = "Vui lòng không để trống")
    private String title;
    @NotBlank(message = "Vui lòng không để trống")
    @Size(max = 1000, message = "Nội dung không quá 1000 kí tự")
    private String content;
    private LocalDate submittedDate;
    @NotBlank(message = "Vui lòng không để trống")
    private String image;
    private Boolean isDeleted;
}
