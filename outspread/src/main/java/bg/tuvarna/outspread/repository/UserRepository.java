package bg.tuvarna.outspread.repository;

import bg.tuvarna.outspread.entity.User;

public interface UserRepository {
	User findUser(String username);
}
