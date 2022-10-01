package vn.codegym.pig_farm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.codegym.pig_farm.dto.projections.StatisticByMonthDto;
import vn.codegym.pig_farm.dto.projections.StatisticByYearDto;
import vn.codegym.pig_farm.repository.StatisticRepository;
import vn.codegym.pig_farm.service.IStatisticService;

import java.util.List;

@Service
public class StatisticService implements IStatisticService {

    @Autowired
    private StatisticRepository statisticRepository;

    /**
     * Created by: ToanNH
     * Date created: 8/9/2022
     * function: Get value statistic by month from Database to return value.
     *
     * @return List<StatisticByMonth> or null
     */

    @Override
    public List<StatisticByMonthDto> getStatisticByMonth(String startDate, String endDate, String type) {
        return statisticRepository.getStatisticByMonth(startDate, endDate, type);
    }

    /**
     * Created by: ToanNH
     * Date created: 8/9/2022
     * function: Get value statistic by year from Database to return value.
     *
     * @return List<StatisticByYear> or null
     */

    @Override
    public List<StatisticByYearDto> getStatisticByYear(String startDate, String endDate, String type) {
        return statisticRepository.getStatisticByYear(startDate, endDate, type);
    }

    /**
     * Created by: ToanNH
     * Date created: 9/9/2022
     * function: Get value statistic by month from Database to return value.
     *
     * @return List<StatisticByMonth> or null
     */

    @Override
    public List<StatisticByMonthDto> getStatisticByMonthAndCompany(String startDate, String endDate, String type, String company) {
        return statisticRepository.getStatisticByMonthAndCompany(startDate, endDate, type, company);
    }

    /**
     * Created by: ToanNH
     * Date created: 9/9/2022
     * function: Get value statistic by year from Database to return value.
     *
     * @return List<StatisticByYear> or null
     */

    @Override
    public List<StatisticByYearDto> getStatisticByYearAndCompany(String startDate, String endDate, String type, String company) {
        return statisticRepository.getStatisticByYearAndCompany(startDate, endDate, type, company);
    }

    /**
     * Created by: ToanNH
     * Date created: 13/9/2022
     * function: Get list company.
     *
     * @return List<String> or null
     */

    @Override
    public List<String> getListCompany() {
        return statisticRepository.getListCompany();
    }
}
