package bg.tuvarna.outspread.repository;

import bg.tuvarna.outspread.entity.Admin;

public interface AdminRepository {
	Admin findAdmin(String username);
}
