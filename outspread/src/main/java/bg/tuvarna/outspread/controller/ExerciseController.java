package bg.tuvarna.outspread.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
		return ResponseEntity.ok().body(es.findExercise(id));
	}
	
	@PostMapping("/create")
	public ResponseEntity<?> createExercise(@RequestBody ExerciseDto request) {
		System.out.println("id: " + request.getDisciplineId());
		return new ResponseEntity<Exercise>(es.createExercise(request), HttpStatus.CREATED);
	}
}
