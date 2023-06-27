package bg.tuvarna.outspread.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.entity.Admin;
import bg.tuvarna.outspread.entity.User;
import bg.tuvarna.outspread.service.AdminService;
import bg.tuvarna.outspread.service.TokenService;
import bg.tuvarna.outspread.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

//    private static final Logger LOG = LoggerFactory.getLogger(AuthController.class);
	@Autowired
    private TokenService tokenService;


    @PostMapping("/token")
    public String token(Authentication authentication) {
//        LOG.debug("Token requested for user: '{}'", authentication.getName());
        String token = tokenService.generateToken(authentication);
//        LOG.debug("Token granted: {}", token);
        return token;
    }
	 
	@Autowired
	private UserService us;
	
	@Autowired
	private AdminService as;
	
	@GetMapping("/login")
	public String home() {
		System.out.println("login page");
		return "login";
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto user) {
		System.out.println("try to login user: " + user.getUsername() + user.getPassword());
		User u = us.authenticate(user);
		if(u != null) {
			return ResponseEntity.status(HttpStatus.OK).body(u);			
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
