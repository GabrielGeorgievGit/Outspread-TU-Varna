package bg.tuvarna.outspread.repository;

import java.util.Optional;

import bg.tuvarna.outspread.entity.Admin;

public interface AdminRepository {
	Optional<Admin> findAdmin(String username);
}
