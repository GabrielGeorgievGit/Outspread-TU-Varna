package bg.tuvarna.outspread.service;

import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.entity.User;

public interface UserService {
	User authenticate(LoginDto user);
}
