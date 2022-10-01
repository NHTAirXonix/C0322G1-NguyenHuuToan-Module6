package vn.codegym.pig_farm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.codegym.pig_farm.dto.projections.EmployeeDto;
import vn.codegym.pig_farm.entity.AppRole;
import vn.codegym.pig_farm.entity.AppUser;
import vn.codegym.pig_farm.entity.Employee;
import vn.codegym.pig_farm.entity.UserRole;
import vn.codegym.pig_farm.repository.EmployeeRepository;
import vn.codegym.pig_farm.repository.UserRepository;
import vn.codegym.pig_farm.repository.UserRoleRepository;
import vn.codegym.pig_farm.service.IEmployeeService;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService implements IEmployeeService {

    @Autowired
    EmployeeRepository iEmployeeRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

    /**
     * @return list Employee (test list)
     * @creator LongNT
     * @day 12/09/2022
     */

    @Override
    public List<Employee> findAll() {
        return iEmployeeRepository.findAll();
    }

    /**
     * @param employee
     * @creator LongNT
     * @day 12/09/2022
     */

    @Override
    public void save(Employee employee) {
        List<AppUser> appUsers = userRepository.findAll();
        UserRole userRole = new UserRole();
        AppRole appRole = new AppRole();
        appRole.setId(2);
        userRole.setAppUser(appUsers.get(appUsers.toArray().length - 1));
        userRole.setAppRole(appRole);
        userRoleRepository.save(userRole);

        employee.setAppUser(employee.getAppUser());
        iEmployeeRepository.save(employee.getCode(), employee.getName(), employee.getBirthDay(), employee.getGender(), employee.getIdCard(), employee.getImage(), appUsers.toArray().length);

    }

    /**
     * @param id
     * @return Employee
     * @creator LongNT
     * @day 12/09/2022
     */

    @Override
    public Optional<Employee> findById(Integer id) {
        return iEmployeeRepository.findById(id);
    }

    /**
     * @param employee
     * @creator LongNT
     * @day 12/09/2022
     */

    @Override
    public void edit(Employee employee) {
        iEmployeeRepository.edit(employee.getName(), employee.getBirthDay(), employee.getGender(), employee.getIdCard(), employee.getImage(), employee.getId());
    }

    /**
     * @param name
     * @param idCard
     * @param pageable
     * @return Page<Employee>
     * @Creator HungNQ
     * @Date 08/09/2022
     */
    @Override
    public Page<EmployeeDto> getAllEmployeePaginationAndSearch(String name, String idCard, Pageable pageable) {
        return iEmployeeRepository.getAllEmployeePaginationAndSearch(name, idCard, pageable);
    }

    /**
     * @param id
     * @Creator HungNQ
     * @Date 08/09/2022
     */
    @Override
    public void deleteEmployee(int id) {
        iEmployeeRepository.deleteEmployee(id);
    }

    /**
     * @return List employee
     * @Creator HungNQ
     * @Date 09/09/2022
     */
    @Override
    public List<Employee> getAllEmployee() {
        return iEmployeeRepository.getAllEmployee();
    }

    /**
     * @param id
     * @return EmployeeDto
     * @Creator HungNQ
     * @Date 12/09/2022
     */
    @Override
    public Optional<EmployeeDto> getEmployeeDtoById(int id) {
        return iEmployeeRepository.getEmployeeDtoById(id);
    }


    /**
     * @param code
     * @return
     * @creator LongNT
     * @day 15/09/2022
     */
    @Override
    public Boolean existsCode(String code) {
        return code.equals(iEmployeeRepository.existsCode(code));
    }

    /**
     * @param idCard
     * @return
     * @creator LongNT
     * @day 16/09/2022
     */
    @Override
    public Boolean existsIdCard(String idCard) {
        return idCard.equals(iEmployeeRepository.existsIdCard(idCard));
    }

    @Override
    public EmployeeDto findByUser(String userName) {
        return iEmployeeRepository.findByUserName(userName).get(0);
    }
}