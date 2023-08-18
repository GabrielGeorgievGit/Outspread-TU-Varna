package bg.tuvarna.outspread.dto;

public class UserSignExerciseDto {
	private int userId, exerciseId;

	public UserSignExerciseDto(int userId, int exerciseId) {
		super();
		this.userId = userId;
		this.exerciseId = exerciseId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getExerciseId() {
		return exerciseId;
	}

	public void setExerciseId(int exerciseId) {
		this.exerciseId = exerciseId;
	}
	
	
}
