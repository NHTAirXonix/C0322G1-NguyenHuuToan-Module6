package vn.codegym.pig_farm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.codegym.pig_farm.entity.AppRole;

public interface RoleRepository extends JpaRepository<AppRole, Integer> {
}
