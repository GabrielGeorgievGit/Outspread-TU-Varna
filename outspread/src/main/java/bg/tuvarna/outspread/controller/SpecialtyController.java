package bg.tuvarna.outspread.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import bg.tuvarna.outspread.dto.SpecialtyDto;
import bg.tuvarna.outspread.entity.Specialty;
import bg.tuvarna.outspread.service.SpecialtyService;

@Controller
@RequestMapping("/specialty")
public class SpecialtyController {
	@Autowired
	private SpecialtyService ss;
	
	@PostMapping("/create")
	public ResponseEntity<?> createSpecialty(String name) {
		return new ResponseEntity<Specialty>(ss.createSpecialty(name), HttpStatus.CREATED);
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllSpecialties() {
		return new ResponseEntity<List<SpecialtyDto>>(ss.getAllSpecialties(), HttpStatus.OK);
	}
	
}
