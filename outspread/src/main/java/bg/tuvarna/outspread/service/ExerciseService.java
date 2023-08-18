package bg.tuvarna.outspread.service;

import java.util.List;

import bg.tuvarna.outspread.dto.ExerciseCreateDto;
import bg.tuvarna.outspread.dto.ExerciseDto;
import bg.tuvarna.outspread.dto.RoomDto;
import bg.tuvarna.outspread.dto.UserExerciseDto;

public interface ExerciseService {
	List<ExerciseDto> getAllExercises();
	ExerciseDto findExercise(int id);
	ExerciseDto createExercise(ExerciseCreateDto dto);
	UserExerciseDto signUserExercise(int userId, int exerciseId);
	
	List<RoomDto> getAllRooms();
}
