package bg.tuvarna.outspread.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "specialty_discipline")
public class SpecialtyDiscipline {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "specialty_discipline_id")
	private int id;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "specialty_id")
	private Specialty specialty;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "discipline_id")
	private Discipline discipline;
	
	private char semester;

	public SpecialtyDiscipline() {
		
	}

	public SpecialtyDiscipline(Specialty specialty, Discipline discipline, char semester) {
		super();
		this.specialty = specialty;
		this.discipline = discipline;
		this.semester = semester;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Specialty getSpecialty() {
		return specialty;
	}

	public void setSpecialty(Specialty specialty) {
		this.specialty = specialty;
	}

	public Discipline getDiscipline() {
		return discipline;
	}

	public void setDiscipline(Discipline discipline) {
		this.discipline = discipline;
	}

	public char getSemester() {
		return semester;
	}

	public void setSemester(char semester) {
		this.semester = semester;
	}
	
	
}
