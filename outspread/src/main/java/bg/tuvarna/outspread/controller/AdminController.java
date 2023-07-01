package bg.tuvarna.outspread.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import bg.tuvarna.outspread.dto.AdminEditDto;
import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.entity.Admin;
import bg.tuvarna.outspread.service.AdminService;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private AdminService as;
	
	@PostMapping("/create")
	public ResponseEntity<?> createAdmin(@RequestBody LoginDto request) {
		return new ResponseEntity<Admin>(as.createAdmin(request), HttpStatus.CREATED);
	}
	
	@PutMapping("/edit")
	public ResponseEntity<?> editAdmin(@RequestBody AdminEditDto request) {
		return new ResponseEntity<Admin>(as.editAdmin(request), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteAdmin(int id) {
		as.deleteAdmin(id);
		return ResponseEntity.noContent().build();
	}
}
