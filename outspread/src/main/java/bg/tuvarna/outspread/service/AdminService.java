package bg.tuvarna.outspread.service;

import bg.tuvarna.outspread.dto.AdminEditDto;
import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.entity.Admin;

public interface AdminService {
	Admin createAdmin(LoginDto admin);
	Admin editAdmin(AdminEditDto admin);
	void deleteAdmin(int id);
}
