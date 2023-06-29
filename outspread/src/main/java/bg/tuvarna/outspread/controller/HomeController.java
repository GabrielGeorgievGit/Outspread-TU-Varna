package bg.tuvarna.outspread.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import bg.tuvarna.outspread.entity.Exercise;
import bg.tuvarna.outspread.service.ExerciseService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController {
	
	@Autowired
	private ExerciseService es;
	
	@GetMapping("/")
	public List<Exercise> home() {
		return es.getAllExercises();
	}
}
