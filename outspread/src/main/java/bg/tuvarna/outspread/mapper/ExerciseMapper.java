package bg.tuvarna.outspread.mapper;

import java.util.List;

import bg.tuvarna.outspread.dto.ExerciseDto;
import bg.tuvarna.outspread.entity.Exercise;

public class ExerciseMapper {
	
	public static List<ExerciseDto> mapExercises(List<Exercise> exercises) {
		return exercises.stream().map(e -> new ExerciseDto(e.getId(), e.getOwner().getId(), e.getOwner().getFullname(), e.getTitle(), e.getDiscipline().getId(), e.getDiscipline().getName(), e.getInfo(), e.getTime(), e.getDuration(), e.getRoom(), e.getSigned())).toList();
	}
	
	public static ExerciseDto mapExercise(Exercise e) {
		return new ExerciseDto(e.getId(), e.getOwner().getId(), e.getOwner().getFullname(), e.getTitle(), e.getDiscipline().getId(), e.getDiscipline().getName(), e.getInfo(), e.getTime(), e.getDuration(), e.getRoom(), e.getSigned());
	}
	
}
