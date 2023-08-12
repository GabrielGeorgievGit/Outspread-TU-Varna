package bg.tuvarna.outspread.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "room")
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	private String name;
	
	@OneToMany(mappedBy = "room")
	private List<Exercise> exercises;
	
	@OneToMany(mappedBy = "room")
	private List<ReserveRoom> reservedRooms;
	
	public Room() {
		
	}

	public Room(String name) {
		super();
		this.name = name;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<ReserveRoom> getReservedRooms() {
		return reservedRooms;
	}

	public void setReservedRooms(List<ReserveRoom> reservedRooms) {
		this.reservedRooms = reservedRooms;
	}
	
	public boolean isReserved() {
		for(ReserveRoom r : reservedRooms) {
			if(r.getRoom().equals(this))
				return true;
		}
		return false;
	}
	
}
