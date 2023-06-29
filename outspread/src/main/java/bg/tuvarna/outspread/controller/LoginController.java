package bg.tuvarna.outspread.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.dto.LoginResponseDto;
import bg.tuvarna.outspread.entity.Admin;
import bg.tuvarna.outspread.security.AuthenticationService;
import bg.tuvarna.outspread.service.AdminService;
@RestController
@CrossOrigin(origins = "http://localhost:3000/login")
public class LoginController {
	
	@Autowired
	private AuthenticationService authenticationService;
	
	@Autowired
	private AdminService as;
	
//	@GetMapping("/login")
//	public String home() {
//		System.out.println("login page");
//		return "login";
//	}
//	@CrossOrigin
	@GetMapping("/login")
	@CrossOrigin
	public String home() {
		System.out.println("login page opened");
		return "hey man";
	}
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto request) {
		System.out.println("try to login user: " + request.getUsername() + request.getPassword());

		LoginResponseDto response = authenticationService.login(request);
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, response.getToken())
                .body(response);
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
