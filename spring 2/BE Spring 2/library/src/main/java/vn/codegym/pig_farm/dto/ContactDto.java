package vn.codegym.pig_farm.dto;


import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.regex.Pattern;

public class ContactDto implements Validator {
    @NotNull
    @NotBlank
    private String name;
    @NotNull
    @NotBlank
    @Email
    private String email;
    @NotNull
    @NotBlank

    private String phone;
    @NotNull
    @NotBlank
    private String address;
    @NotNull
    @NotBlank
    private String content;

    public ContactDto(String name, String email, String phone, String address, String content) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.content = content;
    }

    public ContactDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {
        String regexPhoneNumber ="^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$";

        ContactDto contactDto = (ContactDto) target;
        if (!Pattern.matches(regexPhoneNumber,contactDto.phone)){
            errors.rejectValue("phoneNumber","","Số điện thoại không hợp lệ");
        }
    }
}
