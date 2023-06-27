package bg.tuvarna.outspread.service;

import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.entity.Admin;

public interface AdminService {
	Admin authenticate(LoginDto admin);
}
