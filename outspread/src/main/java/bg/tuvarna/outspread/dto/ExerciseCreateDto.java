package bg.tuvarna.outspread.dto;

import java.time.LocalDateTime;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ExerciseCreateDto {
	private int idOwner, idDiscipline;
	private String title, description, room;
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm", shape = JsonFormat.Shape.STRING)
	private LocalDateTime time;
	private LocalTime duration;
	public ExerciseCreateDto(int idOwner, int idDiscipline, String title, String description, String room,
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
	public String getRoom() {
		return room;
	}
	public void setRoom(String room) {
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
