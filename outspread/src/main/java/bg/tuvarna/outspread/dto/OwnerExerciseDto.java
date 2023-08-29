package bg.tuvarna.outspread.dto;

public class OwnerExerciseDto {
	private int ownerId;
	private int exerciseId;

	public OwnerExerciseDto(int ownerId, int exerciseId) {
		super();
		this.ownerId = ownerId;
		this.exerciseId = exerciseId;
	}

	public int getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(int ownerId) {
		this.ownerId = ownerId;
	}

	public int getExerciseId() {
		return exerciseId;
	}

	public void setExerciseId(int exerciseId) {
		this.exerciseId = exerciseId;
	}
	
}
