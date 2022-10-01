package vn.codegym.pig_farm.repository;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.codegym.pig_farm.entity.Employee;
import vn.codegym.pig_farm.dto.projections.EmployeeDto;


import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    /**
     * @param name
     * @param idCard
     * @param pageable
     * @return Page employee
     * @Creator HungNQ
     * @Date 08/09/2022
     */

    @Query(value = "select e.`name` as nameEmployee, e.user_id as userId, e.birth_day as birthDay, e.`code`, e.gender, e.id_card as idCard, e.image, " +
            "e.is_deleted as isDeleted, e.id, app_user.username , app_role.role_name as roleName,app_user.creation_date " +
            "as creationDate, app_user.password, app_user.email from employee e " +
            "join app_user on e.user_id = app_user.id " +
            "join user_role on user_role.user_id = app_user.id " +
            "join app_role on app_role.id = user_role.role_id " +
            "where e.is_deleted = 0 " +
            "and e.name like  " +
            "concat('%', :name ,'%') and e.id_card like concat('%',:idCard,'%') order by e.id desc ", nativeQuery = true,
            countQuery = "select count(*) from (select e.`name` as nameEmployee , e.user_id as userId, e.birth_day as birthDay, e.`code`, e.gender, e.id_card as idCard, e.image, " +
                    "e.is_deleted as isDeleted, e.id, app_user.username,app_role.role_name as roleName,app_user.creation_date " +
                    "as creationDate, app_user.password, app_user.email from employee e " +
                    "join app_user on e.user_id = app_user.id " +
                    "join user_role on user_role.user_id = app_user.id  " +
                    "join app_role on app_role.id = user_role.role_id " +
                    "where e.is_deleted = 0 " +
                    "and e.name like  " +
                    "concat('%', :name ,'%') and e.id_card like concat('%',:idCard,'%') order by e.id desc ) abc")
    Page<EmployeeDto> getAllEmployeePaginationAndSearch(@Param("name") String name, @Param("idCard") String idCard,
                                                        Pageable pageable);

    /**
     * @param id function deleteEmployee
     * @Creator HungNQ
     * @Date 08/09/2022
     */
    @Transactional
    @Modifying
    @Query(value = "update employee set is_deleted = 1 where id = :id", nativeQuery = true)
    void deleteEmployee(@Param("id") int id);

    /**
     * @return List employee
     * @Creator HungNQ
     * @Date 08/09/2022
     */

    @Query(value = "select id,birth_day,code,gender,id_card,image,is_deleted,name,user_id from employee", nativeQuery = true)
    List<Employee> getAllEmployee();


    @Query(value = "select employee.code, employee.name, user.username, user.email, employee.birth_day, employee.gender, employee.id_card, employee.image from employee join user on user.id = employee.user_id", nativeQuery = true)
    List<Employee> findAll();

    @Modifying
    @Query(value = "insert into employee (`code`, `name`, birth_day, gender, id_card, image, is_deleted, user_id) values (:code, :name, :birthDay, :gender, :idCard, :image, 0, :userId)", nativeQuery = true)
    void save(@Param("code") String code, @Param("name") String name, @Param("birthDay") LocalDate birthDay, @Param("gender") String gender, @Param("idCard") String idCard, @Param("image") String image, @Param("userId") Integer userId);

    @Query(value = "select * from employee where id = :id", nativeQuery = true)
    Optional<Employee> findById(@Param("id") Integer id);

    @Modifying
    @Query(value = "update employee set `name` = :name, birth_day = :birthDay, gender = :gender, id_card = :idCard, image = :image where id = :id", nativeQuery = true)
    void edit(@Param("name") String name, @Param("birthDay") LocalDate birthDay, @Param("gender") String gender, @Param("idCard") String idCard, @Param("image") String image, @Param("id") Integer id);

    /**
     * @Creator HungNQ
     * @Date 12/09/2022
     * @param id
     * @return EmployeeDto
     */
    @Query(value = "select e.`name` as nameEmployee, e.user_id as userId, e.birth_day as birthDay, e.`code`, e.gender, e.id_card as idCard, e.image, " +
            "e.is_deleted as isDeleted, e.id, app_user.username , app_role.role_name as roleName,app_user.creation_date " +
            "as creationDate, app_user.password, app_user.email from employee e " +
            "join app_user on e.user_id = app_user.id " +
            "join user_role on user_role.user_id = app_user.id " +
            "join app_role on app_role.id = user_role.role_id " +
            "where e.id = :id",nativeQuery = true)
    Optional<EmployeeDto> getEmployeeDtoById(@Param("id") int id);


    /**
     * @param code
     * @return code
     * @creator LongNT
     * @day 15/09/2022
     */
    @Query(value = "select `code` from employee where `code` = :code", nativeQuery = true)
    String existsCode(@Param("code") String code);

    /**
     * @param idCard
     * @return code
     * @creator LongNT
     * @day 15/09/2022
     */
    @Query(value = "select id_card from employee where id_card = :idCard", nativeQuery = true)
    String existsIdCard(@Param("idCard") String idCard);

    @Query(value = "select employee.id,employee.code from employee join app_user au on employee.user_id = au.id where username=:username",nativeQuery = true)
    List<EmployeeDto> findByUserName(@Param("username") String user);
}