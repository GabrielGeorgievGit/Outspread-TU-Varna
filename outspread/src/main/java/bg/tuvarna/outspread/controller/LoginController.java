package bg.tuvarna.outspread.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.entity.User;
import bg.tuvarna.outspread.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
	 
	@Autowired
	private UserService us;
	
	@GetMapping("/login")
	public String home() {
		System.out.println("ALOOOOOO");
		return "helloooo";
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto user) {
		System.out.println("try to login user: " + user.getUsername() + user.getPassword());
		User u = us.authenticate(user);
		if(u != null) {
			return ResponseEntity.status(HttpStatus.OK).body(u);			
		} else return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid password");
	}
	
}
