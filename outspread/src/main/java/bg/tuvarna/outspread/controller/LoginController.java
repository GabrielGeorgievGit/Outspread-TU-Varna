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

import bg.tuvarna.outspread.dto.LoginAdminResponseDto;
import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.dto.LoginUserResponseDto;
import bg.tuvarna.outspread.entity.Admin;
import bg.tuvarna.outspread.mapper.UserMapper;
import bg.tuvarna.outspread.security.AuthenticationService;
import jakarta.validation.constraints.NotNull;

@RestController
public class LoginController {
	
	@Autowired
	private AuthenticationService authenticationService;
	
	@GetMapping("/login")
	public ResponseEntity<?> home(@NotNull Authentication authentication) {
		if(authentication == null)
			return ResponseEntity.notFound().build();
		
		UserMapper user = null;
		
		try {
			user = authenticationService.loginUser(authentication);			
		} catch(Exception e) {
			return ResponseEntity.notFound().build();
		}
		
		if(user == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(user);
	} 
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto request) {
		
		LoginUserResponseDto response = null;
		try {
			response = authenticationService.login(request);			
		} catch(Exception e) {
			return ResponseEntity.notFound().build();
		}
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
		Admin admin = null; 
		try {
			admin = authenticationService.loginAdmin(authentication);
		} catch(Exception e) {
			return ResponseEntity.notFound().build();
		}
		if(admin == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(admin);
	}
	
	@PostMapping("/admin/login")
	public ResponseEntity<?> adminLogin(@RequestBody LoginDto request) {
		LoginAdminResponseDto response = null;
		try {
			response = authenticationService.loginAdmin(request);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
		if(response == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, response.getToken())
                .body(response);
	}
}
