package vn.codegym.pig_farm.dto;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import vn.codegym.pig_farm.entity.Placement;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;


public class AdvertisementDto implements Validator {
    private Integer id;

    @Pattern(regexp = "^[A-Za-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+", message = "Không được để trống và không nhập kí tự")
    private String title;
    @NotEmpty(message = "Ảnh không được để trống")
    @Pattern(regexp = "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&\\/{2}=]*)", message = "Phải đúng định dạng ảnh")
    private String image;
    //    @NotEmpty(message = "Ngày đăng không được để trống")
    private LocalDate submittedDate;

    @NotEmpty(message = "Ngày đăng không được để trống")
    @Pattern(regexp = "^[0-9]+$", message = "Không được nhập kí tự và chữ")
    private String timeExistence;

    private Placement placement;
    private Boolean isDeleted;


    public AdvertisementDto() {
    }


    public AdvertisementDto(Integer id, String title, String image, LocalDate submittedDate, String timeExistence, Placement placements, Boolean isDeleted) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.submittedDate = submittedDate;
        this.timeExistence = timeExistence;
        this.placement = placements;
        this.isDeleted = isDeleted;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDate getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(LocalDate submittedDate) {
        this.submittedDate = submittedDate;
    }

    public String getTimeExistence() {
        return timeExistence;
    }

    public void setTimeExistence(String timeExistence) {
        this.timeExistence = timeExistence;
    }

    public Placement getPlacement() {
        return placement;
    }

    public void setPlacement(Placement placement) {
        this.placement = placement;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {
    }
}
