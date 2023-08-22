package bg.tuvarna.outspread.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import bg.tuvarna.outspread.dto.CharDto;
import bg.tuvarna.outspread.dto.DisciplineShortDto;
import bg.tuvarna.outspread.dto.SpecialtyChangeDto;
import bg.tuvarna.outspread.dto.SpecialtyDto;
import bg.tuvarna.outspread.dto.SpecialtySemesterDto;
import bg.tuvarna.outspread.dto.StringDto;
import bg.tuvarna.outspread.entity.Specialty;
import bg.tuvarna.outspread.service.SpecialtyService;

@Controller
@RequestMapping("/specialty")
public class SpecialtyController {
	@Autowired
	private SpecialtyService ss;
	
	@PostMapping("/add")
	public ResponseEntity<?> createSpecialty(@RequestBody StringDto name) {
		Specialty specialty = ss.createSpecialty(name.getName());
		if(specialty == null) 
			return ResponseEntity.badRequest().build();
		return new ResponseEntity<Specialty>(specialty, HttpStatus.CREATED);
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllSpecialties() {
		return new ResponseEntity<List<SpecialtyDto>>(ss.getAllSpecialties(), HttpStatus.OK);
	}
	
	@PostMapping("/all/semester")
	public ResponseEntity<?> getAllSpecialtiesSemester(@RequestBody CharDto semester) {
		return new ResponseEntity<List<SpecialtyDto>>(ss.getAllSpecialtiesSemester(semester.getValue()), HttpStatus.OK);
	}
	
	@PostMapping("/semester")
	public ResponseEntity<?> getSpecialtiesSemester(@RequestBody SpecialtySemesterDto request) {
		return new ResponseEntity<List<SpecialtyDto>>(ss.getSpecialtiesSemester(request.getSpecialty(), request.getSemester()), HttpStatus.OK);
	}
	
	@GetMapping("/get")
	public ResponseEntity<?> getSpecialty(int id) {
		System.out.println(id);
		return new ResponseEntity<SpecialtyDto>(ss.getSpecialty(id), HttpStatus.OK);
	}
	
	@GetMapping("disciplines/all")
	public ResponseEntity<?> getAllDisciplines() {
		return new ResponseEntity<List<DisciplineShortDto>>(ss.getAllDisciplines(), HttpStatus.OK);
	}
	
	@PutMapping("/change")
//	@RolesAllowed({"ROLE_ADMIN_PRIME", "ROLE_ADMIN"})
	public ResponseEntity<?> changeNameDisciplines(@RequestBody SpecialtyChangeDto request) {
		try {
			ss.changeNameDisciplines(request);
			return ResponseEntity.ok().build();			
		} catch(Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
}
