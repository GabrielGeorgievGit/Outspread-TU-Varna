package bg.tuvarna.outspread.dto;

import bg.tuvarna.outspread.mapper.UserMapper;

public class UserExerciseDto {
	private UserMapper user;
	private ExerciseDto exercise;
	
	public UserExerciseDto(UserMapper user, ExerciseDto exercise) {
		super();
		this.user = user;
		this.exercise = exercise;
	}
	public UserMapper getUser() {
		return user;
	}
	public void setUser(UserMapper user) {
		this.user = user;
	}
	public ExerciseDto getExercise() {
		return exercise;
	}
	public void setExercise(ExerciseDto exercise) {
		this.exercise = exercise;
	}
	
	
}
