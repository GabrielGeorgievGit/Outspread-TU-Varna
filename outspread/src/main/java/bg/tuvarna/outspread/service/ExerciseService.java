package bg.tuvarna.outspread.service;

import java.util.List;

import bg.tuvarna.outspread.dto.ExerciseCreateDto;
import bg.tuvarna.outspread.dto.ExerciseDto;
import bg.tuvarna.outspread.dto.RoomDto;

public interface ExerciseService {
	List<ExerciseDto> getAllExercises();
	ExerciseDto findExercise(int id);
	ExerciseDto createExercise(ExerciseCreateDto dto);
	
	List<RoomDto> getAllRooms();
}
