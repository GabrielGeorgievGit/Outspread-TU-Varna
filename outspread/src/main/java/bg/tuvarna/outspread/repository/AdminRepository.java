package bg.tuvarna.outspread.repository;

import java.util.Optional;

import bg.tuvarna.outspread.entity.Admin;

public interface AdminRepository {
	Optional<Admin> findAdmin(String username);
	Optional<Admin> createAdmin(String username, String password);
	Optional<Admin> editAdmin(int id, String username, String password);
	void deleteAdmin(int id);
}
