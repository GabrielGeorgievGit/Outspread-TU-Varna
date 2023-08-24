package bg.tuvarna.outspread.service;

import java.util.List;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import bg.tuvarna.outspread.dto.ExerciseCreateDto;
import bg.tuvarna.outspread.dto.ExerciseDto;
import bg.tuvarna.outspread.dto.RoomDto;
import bg.tuvarna.outspread.dto.UserExerciseDto;

public interface ExerciseService {
	List<ExerciseDto> getAllExercises();
	ExerciseDto findExercise(int id);
	ExerciseDto createExercise(ExerciseCreateDto dto);
	UserExerciseDto signUserExercise(int userId, int exerciseId) throws NotFoundException;
	void signOutUserExercise(int userId, int exerciseId) throws NotFoundException;
	void deleteExercise(int id);
	
	List<RoomDto> getAllRooms();
}
