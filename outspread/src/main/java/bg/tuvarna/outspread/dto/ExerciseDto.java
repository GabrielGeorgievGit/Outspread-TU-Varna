package bg.tuvarna.outspread.dto;

import java.time.LocalDateTime;
import java.time.LocalTime;

public class ExerciseDto {
	
	private int id;
	private int ownerId;
	private String owner;
	private String title;
	private int disciplineId;
	private String discipline;
	private String info;
	private LocalDateTime time;
	private LocalTime duration;
	private String room;
	private int signed;

	public ExerciseDto() {

	}

	public ExerciseDto(int id, int ownerId, String owner, String title, int disciplineId, String discipline,
			String info, LocalDateTime time, LocalTime duration, String room, int signed) {
		super();
		this.id = id;
		this.ownerId = ownerId;
		this.owner = owner;
		this.title = title;
		this.disciplineId = disciplineId;
		this.discipline = discipline;
		this.info = info;
		this.time = time;
		this.duration = duration;
		this.room = room;
		this.signed = signed;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(int ownerId) {
		this.ownerId = ownerId;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
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

	public String getDiscipline() {
		return discipline;
	}

	public void setDiscipline(String discipline) {
		this.discipline = discipline;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
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
