package bg.tuvarna.outspread.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private AdminRepository ar;

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return ar.findAdmin(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
	}
}
