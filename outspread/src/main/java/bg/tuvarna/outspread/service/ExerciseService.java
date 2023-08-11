package bg.tuvarna.outspread.service;

import java.util.List;

import bg.tuvarna.outspread.dto.ExerciseCreateDto;
import bg.tuvarna.outspread.dto.ExerciseDto;
import bg.tuvarna.outspread.entity.Exercise;

public interface ExerciseService {
	List<ExerciseDto> getAllExercises();
	ExerciseDto findExercise(int id);
	Exercise createExercise(ExerciseCreateDto dto);
}
