package bg.tuvarna.outspread.entity;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "exercise")
public class Exercise {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "exercise_id")
	private int id;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "owner_id")
	private User owner;

	private String title;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "discipline_id")
	private Discipline discipline;

	private String info;
	private LocalDateTime time;
	private LocalTime duration;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "room_id")
	private Room room;
	
	private int signed;
	
	@OneToMany(mappedBy = "exercise")
	private List<ReserveRoom> reservedRooms;
	
	@OneToMany(mappedBy = "exercise")
	private List<UserSignExercise> exercisesSigned;

	public Exercise() {
	}
	
	

	public Exercise(User owner, String title, Discipline discipline, String info, LocalDateTime time,
			LocalTime duration, Room room, int signed) {
		super();
		this.owner = owner;
		this.title = title;
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

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Discipline getDiscipline() {
		return discipline;
	}

	public void setDiscipline(Discipline discipline) {
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

	public Room getRoom() {
		return room;
	}

	public void setRoom(Room room) {
		this.room = room;
	}

	public int getSigned() {
		return signed;
	}

	public void setSigned(int signed) {
		this.signed = signed;
	}
	
	public void addSigned() {
		this.signed++;
	}

}
