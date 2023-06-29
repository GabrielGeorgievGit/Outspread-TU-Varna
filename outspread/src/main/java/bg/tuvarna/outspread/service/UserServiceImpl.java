package bg.tuvarna.outspread.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService  {
	
	@Autowired
	private UserRepository ur;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return ur.findUser(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Username " + username + " not found"));
	}
}
