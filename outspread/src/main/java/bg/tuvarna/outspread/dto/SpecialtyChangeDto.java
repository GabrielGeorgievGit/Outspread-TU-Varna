package bg.tuvarna.outspread.dto;

import java.util.ArrayList;
import java.util.List;

public class SpecialtyChangeDto {
	private int id;
	private String name;
	private char semester;
	private List<DisciplineShortDto> disciplines;
	
	
	
	public SpecialtyChangeDto() {
		super();
		disciplines = new ArrayList<>();
	}
	public SpecialtyChangeDto(int id, String name, char semester, List<DisciplineShortDto> disciplines) {
		super();
		this.id = id;
		this.name = name;
		this.semester = semester;
		this.disciplines = disciplines;
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
	public char getSemester() {
		return semester;
	}
	public void setSemester(char semester) {
		this.semester = semester;
	}
	public List<DisciplineShortDto> getDisciplines() {
		return disciplines;
	}
	public void setDisciplines(List<DisciplineShortDto> disciplines) {
		this.disciplines = disciplines;
	}
	
	
}
