package bg.tuvarna.outspread.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class ExerciseDto {

	private int ownerId;
	private String title;
	private int disciplineId;
	private String info;
	private LocalDate time;
	private LocalTime duration;
	private String room;
	private int signed;

	public ExerciseDto() {

	}

	public ExerciseDto(int ownerId, String title, int disciplineId, String info, LocalDate time, LocalTime duration,
			String room, int signed) {
		super();
		this.ownerId = ownerId;
		this.title = title;
		this.disciplineId = disciplineId;
		this.info = info;
		this.time = time;
		this.duration = duration;
		this.room = room;
		this.signed = signed;
	}

	public int getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(int ownerId) {
		this.ownerId = ownerId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getDisciplineId() {
		return disciplineId;
	}

	public void setDisciplineId(int disciplineId) {
		this.disciplineId = disciplineId;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public LocalDate getTime() {
		return time;
	}

	public void setTime(LocalDate time) {
		this.time = time;
	}

	public LocalTime getDuration() {
		return duration;
	}

	public void setDuration(LocalTime duration) {
		this.duration = duration;
	}

	public String getRoom() {
		return room;
	}

	public void setRoom(String room) {
		this.room = room;
	}

	public int getSigned() {
		return signed;
	}

	public void setSigned(int signed) {
		this.signed = signed;
	}

}
