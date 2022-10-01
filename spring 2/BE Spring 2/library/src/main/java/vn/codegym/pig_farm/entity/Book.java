package vn.codegym.pig_farm.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "VARCHAR(45)")
    private String bookCode;

    @Column(columnDefinition = "VARCHAR(255)")
    private String bookWriter;

    @Column(columnDefinition = "VARCHAR(255)")
    private String bookTranslater;

    @Column(columnDefinition = "VARCHAR(255)")
    private String bookCompany;

    @Column(columnDefinition = "INT")
    private String bookPageNumber;

    @Column(columnDefinition = "VARCHAR(45)")
    private String bookSize;

    @Column(columnDefinition = "DATE")
    private String bookDayOut;

    @Column(columnDefinition = "DOUBLE")
    private String bookPrice;

    @Column(columnDefinition = "VARCHAR(255)")
    private String bookUrlImage;

    @Column(columnDefinition = "LONG")
    private String content;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

//    @OneToMany(mappedBy = "book")
//    @JsonIgnore
//    private List<Cart> carts;


    public Book() {
    }

    public Book(Integer id, String bookCode, String bookWriter, String bookTranslater, String bookCompany, String bookPageNumber, String bookSize, String bookDayOut, String bookPrice, String bookUrlImage, String content, Category category) {
        this.id = id;
        this.bookCode = bookCode;
        this.bookWriter = bookWriter;
        this.bookTranslater = bookTranslater;
        this.bookCompany = bookCompany;
        this.bookPageNumber = bookPageNumber;
        this.bookSize = bookSize;
        this.bookDayOut = bookDayOut;
        this.bookPrice = bookPrice;
        this.bookUrlImage = bookUrlImage;
        this.content = content;
        this.category = category;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBookCode() {
        return bookCode;
    }

    public void setBookCode(String bookCode) {
        this.bookCode = bookCode;
    }

    public String getBookWriter() {
        return bookWriter;
    }

    public void setBookWriter(String bookWriter) {
        this.bookWriter = bookWriter;
    }

    public String getBookTranslater() {
        return bookTranslater;
    }

    public void setBookTranslater(String bookTranslater) {
        this.bookTranslater = bookTranslater;
    }

    public String getBookCompany() {
        return bookCompany;
    }

    public void setBookCompany(String bookCompany) {
        this.bookCompany = bookCompany;
    }

    public String getBookPageNumber() {
        return bookPageNumber;
    }

    public void setBookPageNumber(String bookPageNumber) {
        this.bookPageNumber = bookPageNumber;
    }

    public String getBookSize() {
        return bookSize;
    }

    public void setBookSize(String bookSize) {
        this.bookSize = bookSize;
    }

    public String getBookDayOut() {
        return bookDayOut;
    }

    public void setBookDayOut(String bookDayOut) {
        this.bookDayOut = bookDayOut;
    }

    public String getBookPrice() {
        return bookPrice;
    }

    public void setBookPrice(String bookPrice) {
        this.bookPrice = bookPrice;
    }

    public String getBookUrlImage() {
        return bookUrlImage;
    }

    public void setBookUrlImage(String bookUrlImage) {
        this.bookUrlImage = bookUrlImage;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
