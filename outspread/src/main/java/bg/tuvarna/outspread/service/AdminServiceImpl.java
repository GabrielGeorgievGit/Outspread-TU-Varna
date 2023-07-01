package bg.tuvarna.outspread.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.dto.AdminEditDto;
import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.entity.Admin;
import bg.tuvarna.outspread.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private AdminRepository ar;

//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		return ar.findAdmin(username)
//                .orElseThrow(() -> new UsernameNotFoundException(username));
//	}

	@Override
	public Admin createAdmin(LoginDto admin) {
		return ar.createAdmin(admin.getUsername(), admin.getPassword()).get();
	}
	
	@Override
	public Admin editAdmin(AdminEditDto admin) {
		return ar.editAdmin(admin.getId(), admin.getUsername(), admin.getPassword()).get();
	}
	
	@Override
	public void deleteAdmin(int id) {
		ar.deleteAdmin(id);
	}
}
