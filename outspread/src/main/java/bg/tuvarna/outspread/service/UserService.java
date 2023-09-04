package bg.tuvarna.outspread.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import bg.tuvarna.outspread.dto.UserDto;
import bg.tuvarna.outspread.dto.UserEditDto;
import bg.tuvarna.outspread.entity.User;
import bg.tuvarna.outspread.mapper.UserMapper;

public interface UserService extends UserDetailsService {
	User createUser(UserDto user);
	User editUser(UserEditDto user);
	void deleteUser(int id);
	UserMapper findUser(String username);
	List<UserMapper> findAllUsers();
	
	List<UserMapper> findUsersSpecialtySemester(int specialtyId, char semester);
	List<UserMapper> findAllUsersSpecialty(int specialtyId);
	List<UserMapper> findAllUsersSemester(char semester);
}
