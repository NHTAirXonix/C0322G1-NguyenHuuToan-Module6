package vn.codegym.pig_farm.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import vn.codegym.pig_farm.entity.Employee;
import vn.codegym.pig_farm.dto.projections.EmployeeDto;


import java.util.List;
import java.util.Optional;


public interface IEmployeeService {
    /**
     * @Creator HungNQ
     * @Date 08/09/2022
     * @param name
     * @param phoneNumber
     * @param pageable
     * @return Page employee
     */
    Page<EmployeeDto> getAllEmployeePaginationAndSearch(String name, String phoneNumber, Pageable pageable);

    /**
     * @Creator HungNQ
     * @Date 08/09/2022
     * @param id
     */
    void deleteEmployee(int id);

    /**
     * @Creator HungNQ
     * @Date 09/09/2022
     * return List employee
     */
    List<Employee> getAllEmployee();

    /**
     * @return List Employee
     * @creator LongNT
     * @day 12/09/2022
     */

    List<Employee> findAll();

    /**
     * @param employee
     * @creator LongNT
     * @day 12/09/2022
     */

    void save(Employee employee);

    /**
     * @param id
     * @return Employee
     * @creator LongNT
     * @day 12/09/2022
     */

    Optional<Employee> findById(Integer id);

    /**
     * @param employee
     * @creator LongNT
     * @day 12/09/2022
     */

    void edit(Employee employee);
    /**
     * @Creator HungNQ
     * @Date 12/09/2022
     * @param id
     * @return EmployeeDto
     */
    Optional<EmployeeDto> getEmployeeDtoById(int id);


    /**
     * @param code
     * @return
     * @creator LongNT
     * @day 15/09/2022
     */
    Boolean existsCode(String code);

    /**
     * @param idCard
     * @return
     * @creator LongNT
     * @day 16/09/2022
     */
    Boolean existsIdCard(String idCard);

    EmployeeDto findByUser(String userNamee);
}
