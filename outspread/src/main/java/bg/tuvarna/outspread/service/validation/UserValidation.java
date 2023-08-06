package bg.tuvarna.outspread.service.validation;

import bg.tuvarna.outspread.dto.UserDto;

public class UserValidation {
	public static UserDto validateUserDto(UserDto user) {
		if(user.getRole().toUpperCase() == "STUDENT") user.setRole("STUDENT");
		if(user.getRole().toUpperCase() == "TEACHER") user.setRole("TEACHER");
		return user;
	}
	
}
