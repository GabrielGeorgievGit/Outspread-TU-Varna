package bg.tuvarna.outspread.mapper;

import java.util.List;

import bg.tuvarna.outspread.entity.User;

public class UserMapper {
	private int id;
	private String username;
	private String password;
	private String fullname;
	private String fn;
	
	private int specialtyId;

	private Character semester;
	private String role;
	
	
	
	public UserMapper(int id, String username, String password, String fullname, String fn, int specialty,
			Character semester, String role) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.fullname = fullname;
		this.fn = fn;
		this.specialtyId = specialty;
		this.semester = semester;
		this.role = role;
	}



	public static List<UserMapper> userMapper(List<User> users) {
		return users.stream().map(user -> new UserMapper(user.getId(), user.getUsername(), user.getPassword(), user.getFullname(), user.getFn(), user.getSpecialty().getId(), user.getSemester(), user.getRole())).toList();
	}
	
	public static UserMapper userMapper(User user) {
		return new UserMapper(user.getId(), user.getUsername(), user.getPassword(), user.getFullname(), user.getFn(), user.getSpecialty().getId(), user.getSemester(), user.getRole());
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
