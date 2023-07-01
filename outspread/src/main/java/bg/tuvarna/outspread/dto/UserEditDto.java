package bg.tuvarna.outspread.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class UserEditDto {
	
	@NotNull
	@Positive
	private int id;
	
	@NotNull
	@Size(min=3, max=30)
	private String username;
	
	@NotNull
	@Size(min=3, max=50)
	private String password;
	
	@NotNull
	@Size(min=8, max=50)
	private String fullname;
	
	@Size(min=8, max=8)
	private String fn;
	
	@Positive
	private Integer specialtyId;
	
	
	private Character semester;
	
	@NotNull
	@Max(15)
	private String role;

	public UserEditDto(int id, String username, String password, String fullname, String fn, Integer specialtyId,
			Character semester, String role) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.fullname = fullname;
		this.fn = fn;
		this.specialtyId = specialtyId;
		this.semester = semester;
		this.role = role;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public Integer getSpecialtyId() {
		return specialtyId;
	}

	public void setSpecialtyId(Integer specialtyId) {
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
