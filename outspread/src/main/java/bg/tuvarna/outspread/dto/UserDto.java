package bg.tuvarna.outspread.dto;

public class UserDto {
	private String username, password, fullname, fn;
	private int specialtyId;
	private Character semester;
	private String role;

	public UserDto(String username, String password, String fullname, String fn, int specialtyId, Character semester,
			String role) {
		super();
		this.username = username;
		this.password = password;
		this.fullname = fullname;
		this.fn = fn;
		this.specialtyId = specialtyId;
		this.semester = semester;
		this.role = role;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getFn() {
		return fn;
	}

	public void setFn(String fn) {
		this.fn = fn;
	}

	public int getSpecialtyId() {
		return specialtyId;
	}

	public void setSpecialtyId(int specialtyId) {
		this.specialtyId = specialtyId;
	}

	public Character getSemester() {
		return semester;
	}

	public void setSemester(Character semester) {
		this.semester = semester;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}
