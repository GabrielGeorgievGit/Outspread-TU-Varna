package bg.tuvarna.outspread.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.entity.User;
import bg.tuvarna.outspread.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService  {
	
	@Autowired
	private UserRepository ur;
	
	@Override
	public User authenticate(LoginDto user) {
		User foundUser = ur.findUser(user.getUsername());
		return foundUser.getPassword().equals(user.getPassword()) ? foundUser : null;
	}
}
