package bg.tuvarna.outspread.repository;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import bg.tuvarna.outspread.entity.Exercise;
import bg.tuvarna.outspread.entity.Room;

public interface ExerciseRepository {
	List<Exercise> getAllExercises();
	Optional<Exercise> findExercise(int id);
	Optional<Exercise> createExercise(int ownerId, String title, int disciplineId, String info, LocalDateTime time, LocalTime duration, int roomId);
	
	List<Room> getAllRooms();
	Room findFreeRoom(LocalDateTime from, LocalDateTime to);
	List<Room> getAllFreeRooms(LocalDateTime from, LocalDateTime to);
}
