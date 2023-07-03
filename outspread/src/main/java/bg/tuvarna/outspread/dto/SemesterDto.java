package bg.tuvarna.outspread.dto;

public class SemesterDto {
	private int semester;
	
	public SemesterDto() {
		
	}
	
	public SemesterDto(int semester) {
		super();
		this.semester = semester;
	}

	public int getSemester() {
		return semester;
	}

	public void setSemester(int semester) {
		this.semester = semester;
	}
	
}
