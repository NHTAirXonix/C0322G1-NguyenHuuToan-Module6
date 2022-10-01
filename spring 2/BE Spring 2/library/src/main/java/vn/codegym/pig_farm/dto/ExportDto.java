package vn.codegym.pig_farm.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;

/**
 * Created by: HoaL
 * Date created: 09/09/2022
 * Function: ExportDto
 * return exportDto
 */
public class ExportDto {
    @Size(min = 1, max = 50, message = "không quá 1-50 từ và không để trống")
    @NotBlank
    private String codeExport;

    @Size(min = 1, max = 50, message = "không quá 1-50 từ và không để trống")
    @NotBlank
    private String company;

    @Min(value = 1, message = "Giá không âm và không để trống")
    private Integer amount;

    @Min(value = 1, message = "Gía không âm và không để trống")
    private Double kilogram;

    @Min(value = 1, message = "Gía không âm ")
    @Max(value = 99000)
    private Double price;


    private Integer typePigs;

    private Boolean isDeleted;

    private PigstyDto pigstyDto;

    private EmployDto employDto;

    private LocalDate saleDate;


    public ExportDto() {
    }


    public ExportDto(String codeExport, String company, Integer amount, Double kilogram, Double price, Integer typePigs, Boolean isDeleted, PigstyDto pigstyDto, EmployDto employDto, LocalDate saleDate) {
        this.codeExport = codeExport;
        this.company = company;
        this.amount = amount;
        this.kilogram = kilogram;
        this.price = price;
        this.typePigs = typePigs;
        this.isDeleted = isDeleted;
        this.pigstyDto = pigstyDto;
        this.employDto = employDto;
        this.saleDate = saleDate;
    }

    public String getCodeExport() {
        return codeExport;
    }

    public void setCodeExport(String codeExport) {
        this.codeExport = codeExport;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }


    public LocalDate getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(LocalDate saleDate) {
        this.saleDate = saleDate;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Double getKilogram() {
        return kilogram;
    }

    public void setKilogram(Double kilogram) {
        this.kilogram = kilogram;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public PigstyDto getPigstyDto() {
        return pigstyDto;
    }

    public void setPigstyDto(PigstyDto pigstyDto) {
        this.pigstyDto = pigstyDto;
    }


    public EmployDto getEmployDto() {
        return employDto;
    }

    public void setEmployDto(EmployDto employDto) {
        this.employDto = employDto;
    }

    public Integer getTypePigs() {
        return typePigs;
    }

    public void setTypePigs(Integer typePigs) {
        this.typePigs = typePigs;
    }
}