package bg.tuvarna.outspread.repository;

import java.util.Optional;

import bg.tuvarna.outspread.entity.User;

public interface UserRepository {
	Optional<User> findUser(String username);
	Optional<User> createUser(String username, String password, String fullname, String fn, int specialtyId, Character semester, String role);
	Optional<User> editUser(int id, String username, String password, String fullname, String fn, int specialtyId, Character semester, String role);
	void deleteUser(int id);
}
