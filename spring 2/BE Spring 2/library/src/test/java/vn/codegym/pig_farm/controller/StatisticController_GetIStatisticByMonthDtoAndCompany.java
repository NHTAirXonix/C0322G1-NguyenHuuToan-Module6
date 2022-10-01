package vn.codegym.pig_farm.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class StatisticController_GetIStatisticByMonthDtoAndCompany {

    @Autowired
    private MockMvc mockMvc;

    /**
     * Created by: ToanNH
     * Date created: 9/9/2022
     * function: Check startTime
     *
     * @return BAD_REQUEST 400
     */

    @Test
    public void getStatisticByMonthAndCompany_startTime_1() throws Exception {

        this.mockMvc.perform(
                MockMvcRequestBuilders
                        .get("/statistic/by-month/{startTime}/{endTime}/{type}/{company}", "3333333333333", "2022-10-10", 0, "ABC"))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }

    /**
     * Created by: ToanNH
     * Date created: 9/9/2022
     * function: Check endTime
     *
     * @return BAD_REQUEST 400
     */

    @Test
    public void getStatisticByMonthAndCompany_endTime_1() throws Exception {

        this.mockMvc.perform(
                MockMvcRequestBuilders
                        .get("/statistic/by-month/{startTime}/{endTime}/{type}/{company}", "2022-10-10", "3333333333333", 0, "ABC"))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }

    /**
     * Created by: ToanNH
     * Date created: 9/9/2022
     * function: Check type
     *
     * @return BAD_REQUEST 400
     */

    @Test
    public void getStatisticByMonthAndCompany_type_1() throws Exception {

        this.mockMvc.perform(
                MockMvcRequestBuilders
                        .get("/statistic/by-month/{startTime}/{endTime}/{type}/{company}", "2022-10-10", "2022-10-10", 3, "ABC"))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }

    /**
     * Created by: ToanNH
     * Date created: 9/9/2022
     * function: Check type
     *
     * @return BAD_REQUEST 400
     */

    @Test
    public void getStatisticByMonthAndCompany_type_2() throws Exception {

        this.mockMvc.perform(
                MockMvcRequestBuilders
                        .get("/statistic/by-month/{startTime}/{endTime}/{type}/{company}", "2022-10-10", "2022-10-10", "asdasdas", "ABC"))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }

    /**
     * Created by: ToanNH
     * Date created: 9/9/2022
     * function: Check null value
     *
     * @return NO_CONTENT 204
     */

    @Test
    public void getStatisticByMonthAndCompany_company_1() throws Exception {

        this.mockMvc.perform(
                MockMvcRequestBuilders
                        .get("/statistic/by-month/{startTime}/{endTime}/{type}/{company}", "2022-10-10", "2022-11-10", 0, "ABCD"))
                .andDo(print())
                .andExpect(status().is2xxSuccessful());
    }

    /**
     * Created by: ToanNH
     * Date created: 9/9/2022
     * function: Check success
     *
     * @return OK 200
     */

    @Test
    public void getStatisticByMonth_All_5() throws Exception {

        this.mockMvc.perform(
                MockMvcRequestBuilders
                        .get("/statistic/by-month/{startTime}/{endTime}/{type}/{company}", "2022-08-10","2022-10-10",0, "ABC"))
                .andDo(print())
                .andExpect(status().is2xxSuccessful())
//                .andExpect(jsonPath("time").value("9/2022"))
//                .andExpect(jsonPath("month").value("9"))
//                .andExpect(jsonPath("year").value("2022"))
//                .andExpect(jsonPath("company").value("ABC"))
//                .andExpect(jsonPath("amount").value(80))
//                .andExpect(jsonPath("price").value(4000))
        ;
    }
}
