package bg.tuvarna.outspread.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService  {
	
	@Autowired
	private UserRepository ur;
	
	@Override
	public boolean authenticate(String username, String password) {
		return ur.findUser(username).getPassword().equals(password);
	}
}
