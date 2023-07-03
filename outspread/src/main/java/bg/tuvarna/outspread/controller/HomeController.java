package bg.tuvarna.outspread.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import bg.tuvarna.outspread.dto.ExerciseDto;
import bg.tuvarna.outspread.service.ExerciseService;

@RestController
public class HomeController {
	
	@Autowired
	private ExerciseService es;
	
	@GetMapping("/")
	public List<ExerciseDto> home() {
		return es.getAllExercises();
	}
}
