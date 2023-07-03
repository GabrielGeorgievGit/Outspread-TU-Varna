package bg.tuvarna.outspread.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bg.tuvarna.outspread.dto.SemesterDto;
import bg.tuvarna.outspread.dto.UserDto;
import bg.tuvarna.outspread.dto.UserEditDto;
import bg.tuvarna.outspread.entity.User;
import bg.tuvarna.outspread.mapper.UserMapper;
import bg.tuvarna.outspread.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService us;
	
	@GetMapping("/find")
	public ResponseEntity<?> findUser(String username) {
		return new ResponseEntity<UserMapper>(us.findUser(username), HttpStatus.OK);
	}
	
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
	
	@PostMapping("/find/specialty")
	public ResponseEntity<?> findAllUsersSpecialty(int specialtyId) {
		return new ResponseEntity<List<UserMapper>>(us.findAllUsersSpecialty(specialtyId), HttpStatus.OK);
	}
	
	@PostMapping("/findSemester")
	public ResponseEntity<?> findAllUsersSemester(@RequestBody SemesterDto specialty) {
		System.out.println("hereeeeeeeeeeee"+ specialty.getSemester());
		return new ResponseEntity<List<UserMapper>>(us.findAllUsersSemester('1'), HttpStatus.OK);
	}
}
