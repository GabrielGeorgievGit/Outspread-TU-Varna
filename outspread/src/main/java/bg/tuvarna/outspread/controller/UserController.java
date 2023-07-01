package bg.tuvarna.outspread.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bg.tuvarna.outspread.dto.UserDto;
import bg.tuvarna.outspread.dto.UserEditDto;
import bg.tuvarna.outspread.entity.User;
import bg.tuvarna.outspread.service.UserService;
import jakarta.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService us;
	
	@RolesAllowed("ADMIN")
	@PostMapping("/create")
	public ResponseEntity<?> createUser(@RequestBody UserDto request) {
		System.out.println("request:specialtyid: " + request.getSpecialtyId());
		return new ResponseEntity<User>(us.createUser(request), HttpStatus.CREATED);
	}
	
	@PutMapping("/edit")
	public ResponseEntity<?> editUser(@RequestBody UserEditDto request) {
		return new ResponseEntity<User>(us.editUser(request), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteUser(int id) {
		us.deleteUser(id);
		return ResponseEntity.noContent().build();
	}
}
