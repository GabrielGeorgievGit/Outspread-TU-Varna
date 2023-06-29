package bg.tuvarna.outspread.repository;

import java.util.Optional;

import bg.tuvarna.outspread.entity.User;

public interface UserRepository {
	Optional<User> findUser(String username);
}
