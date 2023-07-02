package bg.tuvarna.outspread.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.dto.LoginResponseDto;
import bg.tuvarna.outspread.entity.Admin;
import bg.tuvarna.outspread.security.AuthenticationService;
import jakarta.validation.constraints.NotNull;

@RestController
public class LoginController {
	
	@Autowired
	private AuthenticationService authenticationService;
	
	@GetMapping("/login")
	public ResponseEntity<?> home(@NotNull Authentication authentication) throws NotFoundException{
		if(authentication == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok().body(authenticationService.loginUser(authentication));
	} 
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto request) {
		LoginResponseDto response = authenticationService.login(request);
		if(response == null) {
			return ResponseEntity.notFound().build();
		}
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, response.getToken())
                .body(response);
	}
	
	@GetMapping("/admin/login")
	public ResponseEntity<?> adminHome(@NotNull Authentication authentication) throws NotFoundException {
		if(authentication == null)
			return ResponseEntity.notFound().build();
		Admin admin = authenticationService.loginAdmin(authentication);
		if(admin == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(admin);
	}
	
	@PostMapping("/admin/login")
	public ResponseEntity<?> adminLogin(@RequestBody LoginDto request) {
		LoginResponseDto response = authenticationService.loginAdmin(request);
		if(response == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, response.getToken())
                .body(response);
	}
}
