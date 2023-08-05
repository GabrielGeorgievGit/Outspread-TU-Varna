package bg.tuvarna.outspread.dto;

public class SpecialtySemesterDto {
	
	private int specialty;
	private char semester;
	
	public SpecialtySemesterDto() {
		
	}

	public SpecialtySemesterDto(int specialty, char semester) {
		super();
		this.specialty = specialty;
		this.semester = semester;
	}



	public int getSpecialty() {
		return specialty;
	}

	public void setSpecialty(int specialty) {
		this.specialty = specialty;
	}

	public char getSemester() {
		return semester;
	}

	public void setSemester(char semester) {
		this.semester = semester;
	}
	
}
