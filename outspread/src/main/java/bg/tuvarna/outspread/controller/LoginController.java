package bg.tuvarna.outspread.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.entity.Admin;
import bg.tuvarna.outspread.entity.User;
import bg.tuvarna.outspread.service.AdminService;
import bg.tuvarna.outspread.service.JwtGenerator;
import bg.tuvarna.outspread.service.UserService;

@RestController
public class LoginController {
	
	@Autowired
	private JwtGenerator jg;
	
/*
    @PostMapping("/token")
    public String token(Authentication authentication) {
    	System.out.println("in token ma");
//        LOG.debug("Token requested for user: '{}'", authentication.getName());
        String token = tokenService.generateToken(authentication);
//        LOG.debug("Token granted: {}", token);
        return token;
    }*/
	 
	@Autowired
	private UserService us;
	
	@Autowired
	private AdminService as;
	
//	@GetMapping("/login")
//	public String home() {
//		System.out.println("login page");
//		return "login";
//	}
	@CrossOrigin
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto user) {
		System.out.println("try to login user: " + user.getUsername() + user.getPassword());
		//am.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
		User u = us.authenticate(user);
		if(u != null) {
			 return new ResponseEntity<>(jg.generateToken(user), HttpStatus.OK);
//			String token = tokenService.generateToken(u);
//			return ResponseEntity.status(HttpStatus.OK).body(u);			
		} else return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid password");
	}
	
	@PostMapping("/admin/login")
	public ResponseEntity<?> adminLogin(@RequestBody LoginDto admin) {
		System.out.println("try to login admin: " + admin.getUsername() + admin.getPassword());
		Admin a = as.authenticate(admin);
		if(a != null) {
			return ResponseEntity.status(HttpStatus.OK).body(a);			
		} else return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid password");
	}
}
