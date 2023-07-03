package bg.tuvarna.outspread.repository;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import bg.tuvarna.outspread.entity.Exercise;

public interface ExerciseRepository {
	List<Exercise> getAllExercises();
	Optional<Exercise> findExercise(int id);
	Optional<Exercise> createExercise(int ownerId, String title, int disciplineId, String info, LocalDateTime time, LocalTime duration, String room, int signed);
}
