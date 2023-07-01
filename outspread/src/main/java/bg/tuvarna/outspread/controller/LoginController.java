package bg.tuvarna.outspread.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.dto.LoginResponseDto;
import bg.tuvarna.outspread.security.AuthenticationService;

@RestController
public class LoginController {
	
	@Autowired
	private AuthenticationService authenticationService;
	
	@GetMapping("/login")
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
	public ResponseEntity<?> adminLogin(@RequestBody LoginDto request) {
		System.out.println("try to login admin: " + request.getUsername() + request.getPassword());
		LoginResponseDto response = authenticationService.loginAdmin(request);
		return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, response.getToken())
                .body(response);
	}
}
