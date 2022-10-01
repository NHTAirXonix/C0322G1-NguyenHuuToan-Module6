package vn.codegym.pig_farm.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import vn.codegym.pig_farm.dto.EmployDto;
import vn.codegym.pig_farm.dto.UserDto;
import vn.codegym.pig_farm.dto.projections.EmployeeDto;
import vn.codegym.pig_farm.entity.AppUser;
import vn.codegym.pig_farm.entity.Employee;
import vn.codegym.pig_farm.entity.MessageResponse;
import vn.codegym.pig_farm.service.IEmployeeService;
import vn.codegym.pig_farm.service.IUserService;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/public/employee")
public class EmployeeRestController {

    @Autowired
    private IEmployeeService iEmployeeService;

    @Autowired
    private IUserService iUserService;

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @GetMapping("/findUser/{user}")
    public ResponseEntity<EmployeeDto> findByUser(@PathVariable("user") String username) {
        return new ResponseEntity<>(iEmployeeService.findByUser(username), HttpStatus.OK);
    }

    /**
     * @param pageable
     * @param name
     * @param idCard
     * @return if success status 2xx else if error status 4xx
     * @Creator HungNQ
     * @Date 08/09/2022
     */
    @GetMapping("/searchList")

    public ResponseEntity<Page<vn.codegym.pig_farm.dto.projections.EmployeeDto>> getAllListEmployeePaginationAndSearch(@PageableDefault(value = 6) Pageable pageable,
                                                                                                                       @RequestParam Optional<String> name,
                                                                                                                       @RequestParam Optional<String> idCard) {
        String keywordIdCard = idCard.orElse("");
        String keywordName = name.orElse("");

        Page<vn.codegym.pig_farm.dto.projections.EmployeeDto> employeePage = iEmployeeService.getAllEmployeePaginationAndSearch(keywordName, keywordIdCard, pageable);
        if (employeePage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(employeePage, HttpStatus.OK);
    }

    /**
     * @param id
     * @return if success delete employee by id
     * @Creator HungNQ
     * @Date 08/09/2022
     */
    @PatchMapping("/delete/{id}")
    public ResponseEntity<Employee> deleteEmployeeById(@PathVariable Integer id) {
        List<Employee> employeeList = iEmployeeService.getAllEmployee();
        for (Employee employee : employeeList) {
            if (Objects.equals(id, employee.getId())) {
                iEmployeeService.deleteEmployee(id);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    /**
     * @param id
     * @return EmployeeDto
     * @Creator HungNQ
     * @Date 12/09/2022
     */
    @GetMapping("/detail/{id}")
    public ResponseEntity<vn.codegym.pig_farm.dto.projections.EmployeeDto> getEmployeeDtoById(@PathVariable Integer id) {
        Optional<vn.codegym.pig_farm.dto.projections.EmployeeDto> employeeDtoOptional = iEmployeeService.getEmployeeDtoById(id);
        if (!employeeDtoOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(employeeDtoOptional.get(), HttpStatus.OK);
    }

    /**
     * @return List employee
     * @Creator HungNQ
     * @Date 13/09/2022
     */
    @GetMapping("/list")
    public ResponseEntity<List<Employee>> getAllEmployee() {
        return new ResponseEntity<>(iEmployeeService.getAllEmployee(), HttpStatus.OK);
    }

    /**
     * @param employDto
     * @return create Employee success: CREATED, error: NOT_ACCEPTABLE
     * @creator LongNT
     * @day 08/09/2022
     */

    @PostMapping("/create")
    public ResponseEntity<List<FieldError>> save(@RequestBody @Valid EmployDto employDto) {

        UserDto userDto;

        userDto = employDto.getUserDto();

        AppUser appUser = new AppUser();

        BeanUtils.copyProperties(userDto, appUser);

        appUser.setPassword(passwordEncoder().encode(appUser.getPassword()));

        iUserService.save(appUser);

        Employee employee = new Employee();

        BeanUtils.copyProperties(employDto, employee);


        iEmployeeService.save(employee);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * @param id
     * @return Employee ID success: OK, error: NOT_FOUND
     * @creator LongNT
     * @day 08/09/2022
     */

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Employee>> findById(@PathVariable Integer id) {
        Optional<Employee> employee = iEmployeeService.findById(id);
        if (!employee.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    /**
     * @param id
     * @param employDto
     * @return Employee edited success: OK, Employee not present: NO_CONTENT, error: NOT_ACCEPTABLE
     * @creator LongNT
     * @day 08/09/2022
     */
    @PutMapping("/edit/{id}")
    public ResponseEntity<List<FieldError>> edit(@PathVariable Integer id, @RequestBody @Valid EmployDto employDto, BindingResult bindingResult) {
        Optional<Employee> employeeObj = iEmployeeService.findById(id);

        if (!employeeObj.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        employeeObj.get().setCode(employDto.getCode());

        employeeObj.get().setName(employDto.getName());

        employeeObj.get().setBirthDay(employDto.getBirthDay());

        employeeObj.get().setGender(employDto.getGender());

        employeeObj.get().setIdCard(employDto.getIdCard());

        employeeObj.get().setImage(employDto.getImage());

        iEmployeeService.edit(employeeObj.get());

        return new ResponseEntity<>(HttpStatus.OK);
    }


    /**
     * @param code
     * @return
     * @creator LongNT
     * @day 15/09/2022
     */

    @GetMapping("/checkCode/{code}")
    public ResponseEntity<?> checkCode(@PathVariable("code") String code) {
        return new ResponseEntity<>(iEmployeeService.existsCode(code), HttpStatus.OK);
    }

    /**
     * @param idCard
     * @return
     * @creator LongNT
     * @day 15/09/2022
     */

    @GetMapping("/checkIdCard/{idCard}")
    public ResponseEntity<?> checkIdCard(@PathVariable("idCard") String idCard) {
        return new ResponseEntity<>(iEmployeeService.existsIdCard(idCard), HttpStatus.OK);
    }

    /**
     * @param username
     * @return
     * @creator LongNT
     * @day 15/09/2022
     */

    @GetMapping("/checkUsername/{username}")
    public ResponseEntity<?> checkUsername(@PathVariable("username") String username) {
        return new ResponseEntity<>(iUserService.existsUsername(username), HttpStatus.OK);
    }

    /**
     * @param email
     * @return
     * @creator LongNT
     * @day 15/09/2022
     */

    @GetMapping("/checkEmail/{email}")
    public ResponseEntity<?> checkEmail(@PathVariable("email") String email) {
        return new ResponseEntity<>(iUserService.existsEmail(email), HttpStatus.OK);
    }
}