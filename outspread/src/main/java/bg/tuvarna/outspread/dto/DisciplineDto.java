package bg.tuvarna.outspread.dto;

public class DisciplineDto {
	private int id;
	private String name;
	private char semester;
	
	public DisciplineDto() {
		
	}
	
	public DisciplineDto(int id, String name, char semester) {
		super();
		this.id = id;
		this.name = name;
		this.semester = semester;
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
	
	
}
