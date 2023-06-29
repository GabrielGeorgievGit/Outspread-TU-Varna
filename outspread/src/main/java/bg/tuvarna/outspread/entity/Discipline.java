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
@Table(name = "discipline")
public class Discipline {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="discipline_id")
	private int id;
	private String name;
	
	@OneToMany(mappedBy = "discipline")
	private List<Exercise> exercises;
	
	@OneToMany(mappedBy = "discipline")
	private List<SpecialtyDiscipline> specialtyDisciplines;
	
	public Discipline() {

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
	
	
}
