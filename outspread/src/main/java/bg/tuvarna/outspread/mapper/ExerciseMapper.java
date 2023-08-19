package bg.tuvarna.outspread.mapper;

import java.util.List;

import bg.tuvarna.outspread.dto.ExerciseDto;
import bg.tuvarna.outspread.dto.RoomDto;
import bg.tuvarna.outspread.dto.UserExerciseDto;
import bg.tuvarna.outspread.entity.Exercise;
import bg.tuvarna.outspread.entity.Room;
import bg.tuvarna.outspread.entity.UserSignExercise;

public class ExerciseMapper {
	
	public static List<ExerciseDto> mapExercises(List<Exercise> exercises) {
		return exercises.stream().map(e -> new ExerciseDto(e.getId(), e.getOwner().getId(), e.getOwner().getFullname(), e.getTitle(), e.getDiscipline().getId(), e.getDiscipline().getName(), e.getInfo(), e.getTime(), e.getDuration(), e.getRoom().getName(), e.getSigned())).toList();
	}
	
	public static ExerciseDto mapExercise(Exercise e) {
		return new ExerciseDto(e.getId(), e.getOwner().getId(), e.getOwner().getFullname(), e.getTitle(), e.getDiscipline().getId(), e.getDiscipline().getName(), e.getInfo(), e.getTime(), e.getDuration(), e.getRoom().getName(), e.getSigned());
	}
	
	public static List<RoomDto> mapRooms(List<Room> rooms) {
		return rooms.stream().map(e -> new RoomDto(e.getId(), e.getName())).toList();
	}
	
	public static UserExerciseDto mapUserSignExercise(UserSignExercise sign) {
		return new UserExerciseDto(UserMapper.userMapper(sign.getUser()), ExerciseMapper.mapExercise(sign.getExercise()));
	}
	
	public static List<UserExerciseDto> mapUserSignExercises(List<UserSignExercise> sign) {
		return sign.stream().map(s -> new UserExerciseDto(UserMapper.userMapper(s.getUser()), ExerciseMapper.mapExercise(s.getExercise()))).toList();
	}
	
	public static List<ExerciseDto> mapUserSignExercisesToExercises(List<UserSignExercise> sign) {
		return sign.stream().map(s -> ExerciseMapper.mapExercise(s.getExercise())).toList();
	}
}
