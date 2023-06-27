package bg.tuvarna.outspread.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.entity.Admin;
import bg.tuvarna.outspread.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private AdminRepository ar;
	
	@Override
	public Admin authenticate(LoginDto admin) {
		Admin foundAdmin = ar.findAdmin(admin.getUsername());
		return foundAdmin.getPassword().equals(admin.getPassword()) ? foundAdmin : null;
	}
}
