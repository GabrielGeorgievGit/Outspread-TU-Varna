package bg.tuvarna.outspread.service;

import java.util.List;

import bg.tuvarna.outspread.dto.ExerciseDto;
import bg.tuvarna.outspread.entity.Exercise;

public interface ExerciseService {
	List<Exercise> getAllExercises();
	Exercise findExercise(int id);
	Exercise createExercise(ExerciseDto dto);
}
