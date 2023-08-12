package bg.tuvarna.outspread.dto;

import java.time.LocalDateTime;
import java.time.LocalTime;

public class ExerciseCreateDto {
	private int idOwner, idDiscipline, room;
	private String title, description;
//	@JsonFormat(pattern = "yyyy-MM-dd HH:mm", shape = JsonFormat.Shape.STRING)
	
	private LocalDateTime time;
	private LocalTime duration;
	public ExerciseCreateDto(int idOwner, int idDiscipline, String title, String description, int room,
			LocalDateTime time, LocalTime duration) {
		super();
		this.idOwner = idOwner;
		this.idDiscipline = idDiscipline;
		this.title = title;
		this.description = description;
		this.room = room;
		this.time = time;
		this.duration = duration;
	}
	public int getIdOwner() {
		return idOwner;
	}
	public void setIdOwner(int idOwner) {
		this.idOwner = idOwner;
	}
	public int getIdDiscipline() {
		return idDiscipline;
	}
	public void setIdDiscipline(int idDiscipline) {
		this.idDiscipline = idDiscipline;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getRoom() {
		return room;
	}
	public void setRoom(int room) {
		this.room = room;
	}
	public LocalDateTime getTime() {
		return time;
	}
	public void setTime(LocalDateTime time) {
		this.time = time;
	}
	public LocalTime getDuration() {
		return duration;
	}
	public void setDuration(LocalTime duration) {
		this.duration = duration;
	}
	
	
}
