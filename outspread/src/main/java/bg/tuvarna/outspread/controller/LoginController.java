package bg.tuvarna.outspread.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import bg.tuvarna.outspread.service.UserService;

@RestController
public class LoginController {
	
	@Autowired
	private UserService us;
	
	@GetMapping("/login")
	public String home() {
		System.out.println("ALOOOOOO");
		return "helloooo";
	}
	
	@PostMapping("/login")
	public String login(@ModelAttribute("username")String username, @ModelAttribute("password")String password) {
		System.out.println("try to login user: "+username);
		if(us.authenticate(username, password)) {
			System.out.println("successful login");
			return "authenticated";
		}
		else {
			System.out.println("unsucessful login");
			return "Login";
		}
	}
	
}
