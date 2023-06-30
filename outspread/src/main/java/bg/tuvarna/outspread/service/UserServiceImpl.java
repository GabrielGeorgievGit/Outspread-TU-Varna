package bg.tuvarna.outspread.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.dto.UserDto;
import bg.tuvarna.outspread.entity.User;
import bg.tuvarna.outspread.repository.AdminRepository;
import bg.tuvarna.outspread.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService  {
	
	@Autowired
	private UserRepository ur;
	@Autowired
	private AdminRepository ar;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user = ur.findUser(username);
		if(user.isEmpty()) {
			return ar.findAdmin(username).orElseThrow(() -> new UsernameNotFoundException(username));
		} else return user.get();
	}
	
	@Override
	public User createUser(UserDto user) {
		return ur.createUser(user.getUsername(), user.getPassword(), user.getFullname(), user.getFn(), user.getSpecialtyId(), user.getSemester(), user.getRole()).get();
	}
	
	@Override
	public void deleteUser(int id) {
		ur.deleteUser(id);
	}
}
