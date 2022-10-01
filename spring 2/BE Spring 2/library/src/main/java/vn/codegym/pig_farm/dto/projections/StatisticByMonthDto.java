package vn.codegym.pig_farm.dto.projections;


public interface StatisticByMonthDto {
    Long getPrice();

    String getCompany();

    Long getAmount();

    String getMonth();

    String getYear();

    String getTime();
}
