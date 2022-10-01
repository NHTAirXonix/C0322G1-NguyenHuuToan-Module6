package vn.codegym.pig_farm.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.codegym.pig_farm.dto.projections.StatisticByMonthDto;
import vn.codegym.pig_farm.dto.projections.StatisticByYearDto;
import vn.codegym.pig_farm.entity.Export;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface StatisticRepository extends JpaRepository<Export,Integer> {

    /**
     * Created by: ToanNH
     * Date created: 8/9/2022
     * function: Get value statistic by month from Database to return value.
     *
     * @return List<StatisticByMonth> or null
     */

    @Query(value= " select " +
            "sum(price * kilogram) as price, " +
            "company as company, " +
            "sum(amount) as amount, " +
            "month(sale_date) as `month`, " +
            "year(sale_date) as `year`, " +
            "concat(month(sale_date),'/', year(sale_date), '-' ,company) as `time` " +
            "from `export` " +
            "where (sale_date > date(:starTime)) " +
            "and (sale_date < date(:endTime)) " +
            "and type_pigs like %:type% group by `time` order by `time`", nativeQuery = true)
    List<StatisticByMonthDto> getStatisticByMonth(@Param("starTime") String starTime,
                                                  @Param("endTime") String endTime,
                                                  @Param("type") String type);

    /**
     * Created by: ToanNH
     * Date created: 8/9/2022
     * function: Get value statistic by year from Database to return value.
     *
     * @return List<StatisticByYear> or null
     */

    @Query(value = "select " +
            "sum(price * kilogram) as price, " +
            "company as company, " +
            "sum(amount) as amount, " +
            "year(sale_date) as `year`, " +
            "concat(year(sale_date),'-', company) as `time` " +
            "from `export` " +
            "where (sale_date > date(:starTime)) " +
            "and (sale_date < date(:endTime)) " +
            "and type_pigs like %:type% group by `time` order by `time`", nativeQuery = true)
    List<StatisticByYearDto> getStatisticByYear(@Param("starTime") String starTime,
                                                @Param("endTime") String endTime,
                                                @Param("type") String type);

    /**
     * Created by: ToanNH
     * Date created: 9/9/2022
     * function: Get value statistic by month and company from Database to return value.
     *
     * @return List<StatisticByMonth> or null
     */

    @Query(value= " select " +
            "sum(price * kilogram) as price, " +
            "company as company, " +
            "sum(amount) as amount, " +
            "month(sale_date) as `month`, " +
            "year(sale_date) as `year`, " +
            "concat(month(sale_date),'/', year(sale_date), '-' ,company) as `time` " +
            "from `export` " +
            "where (sale_date > date(:starTime)) " +
            "and company = :company " +
            "and (sale_date < date(:endTime)) " +
            "and type_pigs like %:type% group by `time` order by `time`", nativeQuery = true)
    List<StatisticByMonthDto> getStatisticByMonthAndCompany(@Param("starTime") String starTime,
                                                            @Param("endTime") String endTime,
                                                            @Param("type") String type,
                                                            @Param("company") String company);

    /**
     * Created by: ToanNH
     * Date created: 9/9/2022
     * function: Get value statistic by year and company from Database to return value.
     *
     * @return List<StatisticByMonth> or null
     */

    @Query(value= " select " +
            "sum(price * kilogram) as price, " +
            "company as company, " +
            "sum(amount) as amount, " +
            "month(sale_date) as `month`, " +
            "year(sale_date) as `year`, " +
            "concat(year(sale_date), '-' ,company) as `time` " +
            "from `export` " +
            "where (sale_date > date(:starTime)) " +
            "and company like %:company% " +
            "and (sale_date < date(:endTime)) " +
            "and type_pigs like %:type% group by `time` order by `time`", nativeQuery = true)
    List<StatisticByYearDto> getStatisticByYearAndCompany(@Param("starTime") String starTime,
                                                          @Param("endTime") String endTime,
                                                          @Param("type") String type,
                                                          @Param("company") String company);


    /**
     * Created by: ToanNH
     * Date created: 13/9/2022
     * function: Get list company.
     *
     * @return List<String> or null
     */

    @Query(value = "select company from `export` group by company", nativeQuery = true)
    List<String> getListCompany();
}

