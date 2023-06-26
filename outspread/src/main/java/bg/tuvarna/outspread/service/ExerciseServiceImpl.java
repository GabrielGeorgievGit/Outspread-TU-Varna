package bg.tuvarna.outspread.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.entity.Exercise;
import bg.tuvarna.outspread.repository.ExerciseRepository;

@Service
public class ExerciseServiceImpl implements ExerciseService {

	@Autowired
	private ExerciseRepository er;
	
	@Override
	public List<Exercise> getAllExercises() {
		return er.getAllExercises();
	}
	
}
