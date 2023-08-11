package bg.tuvarna.outspread.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bg.tuvarna.outspread.dto.ExerciseCreateDto;
import bg.tuvarna.outspread.dto.ExerciseDto;
import bg.tuvarna.outspread.entity.Exercise;
import bg.tuvarna.outspread.service.ExerciseService;

@RestController
@RequestMapping("/exercise")
public class ExerciseController {
	
	@Autowired
	private ExerciseService es;
	
	@GetMapping("/find")
	public ResponseEntity<?> findExercise(int id) {
		return new ResponseEntity<ExerciseDto>(es.findExercise(id), HttpStatus.OK);
	}
	
	@GetMapping("/find/all")
//	@RolesAllowed({"ROLE_ADMIN_PRIME", "ROLE_ADMIN"})
	public ResponseEntity<?> getAllExercises() {
		return new ResponseEntity<List<ExerciseDto>>(es.getAllExercises(), HttpStatus.OK);
	}
	
	@PostMapping("/create")
	public ResponseEntity<?> createExercise(@RequestBody ExerciseCreateDto request) {
		System.out.println("id: " + request.getIdDiscipline());
		return new ResponseEntity<Exercise>(es.createExercise(request), HttpStatus.CREATED);
	}
	
	
//	@PostMaping("paginate")
//	public ResponseEntity<?> paginateExercise(@RequestBody PaginateDto request) {
//		return new ResponseEntity<Exercise>(es.createExercise(request), HttpStatus.CREATED);
//	}
}
