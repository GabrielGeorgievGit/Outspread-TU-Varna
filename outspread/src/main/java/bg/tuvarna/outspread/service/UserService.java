package bg.tuvarna.outspread.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import bg.tuvarna.outspread.dto.UserDto;
import bg.tuvarna.outspread.dto.UserEditDto;
import bg.tuvarna.outspread.entity.User;

public interface UserService extends UserDetailsService {
//	LoginResponseDto authenticate(LoginDto user);
	User createUser(UserDto user);
	User editUser(UserEditDto user);
	void deleteUser(int id);
}
