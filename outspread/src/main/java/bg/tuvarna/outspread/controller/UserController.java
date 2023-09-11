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

import bg.tuvarna.outspread.dto.CharDto;
import bg.tuvarna.outspread.dto.IntDto;
import bg.tuvarna.outspread.dto.SpecialtySemesterDto;
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
	
	@GetMapping("/findAll")
	public ResponseEntity<?> findAllUsers() {
		List<UserMapper> users = us.findAllUsers();
		return new ResponseEntity<List<UserMapper>>(users, HttpStatus.OK);
	}
	
	@PostMapping("/create")
	public ResponseEntity<?> createUser(@RequestBody UserDto request) {
		us.createUser(request);
		return null;
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
	
	@PostMapping("/find/specialty/semester")
	public ResponseEntity<?> findUsersSpecialtySemester(@RequestBody SpecialtySemesterDto request) {
		List<UserMapper> users = us.findUsersSpecialtySemester(request.getSpecialty(), request.getSemester());
		return new ResponseEntity<List<UserMapper>>(users, HttpStatus.OK);
	}
	
	@PostMapping("/find/specialty")
	public ResponseEntity<?> findAllUsersSpecialty(@RequestBody IntDto specialtyId) {
		List<UserMapper> users = us.findAllUsersSpecialty(specialtyId.getValue());
		return new ResponseEntity<List<UserMapper>>(users, HttpStatus.OK);
	}
	
	@PostMapping("/findAllSemester")
	public ResponseEntity<?> findAllUsersSemester(@RequestBody CharDto semester) {
		return new ResponseEntity<List<UserMapper>>(us.findAllUsersSemester(semester.getValue()), HttpStatus.OK);
	}
}
