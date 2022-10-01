package vn.codegym.pig_farm.dto;

import vn.codegym.pig_farm.entity.UserRole;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

public class UserDto {

    private Integer id;

    @NotBlank(message = "Username không được để trống !!")
    private String username;

    @NotBlank(message = "Password không được để trống !!")
    @Size(min = 6, message = "Password phải có ít nhất 6 kí tự !!")
    private String password;

    @NotBlank(message = "Email không được để trống !!")
    @Email(message = "Email không đúng định dạng !!")
    private String email;

    private LocalDate creationDate;

    private Boolean isDeleted;

    private EmployDto employDto;

    private List<UserRole> userRoles;

    public UserDto() {
    }

    public UserDto(Integer id, String username, String password, String email, LocalDate creationDate, Boolean isDeleted, EmployDto employDto, List<UserRole> userRoles) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.creationDate = creationDate;
        this.isDeleted = isDeleted;
        this.employDto = employDto;
        this.userRoles = userRoles;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public EmployDto getEmployeeDto() {
        return employDto;
    }

    public void setEmployeeDto(EmployDto employDto) {
        this.employDto = employDto;
    }

    public List<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<UserRole> userRoles) {
        this.userRoles = userRoles;
    }
}