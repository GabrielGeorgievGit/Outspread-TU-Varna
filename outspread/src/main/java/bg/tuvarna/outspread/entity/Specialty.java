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
@Table(name="specialty")
public class Specialty {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="specialty_id")
	private int id;
	@Column(name = "name")
	private String name;
	
	@OneToMany(mappedBy = "specialty")
	private List<User> users;
	
	@OneToMany(mappedBy = "specialty")
	private List<SpecialtyDiscipline> specialtyDisciplines;
	
	public Specialty() {
		
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

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public List<SpecialtyDiscipline> getSpecialtyDisciplines() {
		return specialtyDisciplines;
	}

	public void setSpecialtyDisciplines(List<SpecialtyDiscipline> specialtyDisciplines) {
		this.specialtyDisciplines = specialtyDisciplines;
	}
	
	
}
