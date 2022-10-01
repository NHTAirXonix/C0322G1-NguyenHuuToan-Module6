package vn.codegym.pig_farm.service;
import vn.codegym.pig_farm.dto.projections.StatisticByMonthDto;
import vn.codegym.pig_farm.dto.projections.StatisticByYearDto;
import java.util.List;

public interface IStatisticService {

    /**
     * Created by: ToanNH
     * Date created: 8/9/2022
     * function: Get value statistic by month from Database to return value.
     *
     * @return List<StatisticByMonth> or null
     */

    List<StatisticByMonthDto> getStatisticByMonth(String startDate, String endDate, String type);

    /**
     * Created by: ToanNH
     * Date created: 8/9/2022
     * function: Get value statistic by year from Database to return value.
     *
     * @return List<StatisticByYear> or null
     */

    List<StatisticByYearDto> getStatisticByYear(String startDate, String endDate, String type);

    /**
     * Created by: ToanNH
     * Date created: 9/9/2022
     * function: Get value statistic by month and company from Database to return value.
     *
     * @return List<StatisticByMonth> or null
     */

    List<StatisticByMonthDto> getStatisticByMonthAndCompany(String startDate, String endDate, String type, String company);

    /**
     * Created by: ToanNH
     * Date created: 9/9/2022
     * function: Get value statistic by year and company from Database to return value.
     *
     * @return List<StatisticByYear> or null
     */

    List<StatisticByYearDto> getStatisticByYearAndCompany(String startDate, String endDate, String type, String company);

    /**
     * Created by: ToanNH
     * Date created: 13/9/2022
     * function: Get list company.
     *
     * @return List<String> or null
     */

    List<String> getListCompany();
}
