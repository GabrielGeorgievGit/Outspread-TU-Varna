package bg.tuvarna.outspread.dto;

import java.util.List;

public class SpecialtyDto {
	private int id;
	private String name;
	
	private List<DisciplineDto> disciplines;
	
	public SpecialtyDto() {
		
	}
	
	public SpecialtyDto(int specialtyId, String specialtyName, List<DisciplineDto> disciplines) {
		super();
		this.id = specialtyId;
		this.name = specialtyName;
		this.disciplines = disciplines;
	}

	public int getSpecialtyId() {
		return id;
	}

	public void setSpecialtyId(int specialtyId) {
		this.id = specialtyId;
	}

	public String getSpecialtyName() {
		return name;
	}

	public void setSpecialtyName(String specialtyName) {
		this.name = specialtyName;
	}

	public List<DisciplineDto> getDisciplines() {
		return disciplines;
	}

	public void setDisciplines(List<DisciplineDto> disciplines) {
		this.disciplines = disciplines;
	}
	
	
}
