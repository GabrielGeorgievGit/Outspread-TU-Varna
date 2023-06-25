package bg.tuvarna.outspread.service;

public interface UserService {
	boolean authenticate(String username, String password);
}
