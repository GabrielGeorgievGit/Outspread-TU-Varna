package bg.tuvarna.outspread.mapper;

import java.util.List;

import bg.tuvarna.outspread.dto.ExerciseDto;
import bg.tuvarna.outspread.entity.User;

public class UserMapper {
	private int id;
	private String username;
	private String password;
	private String fullname;
	private String fn;

	private Integer specialtyId;

	private Character semester;
	private String role;

	private List<ExerciseDto> exercisesOwned;
	private List<ExerciseDto> exercisesSigned;

	public UserMapper() {

	}

	public UserMapper(int id, String username, String password, String fullname, String fn, Integer specialtyId,
			Character semester, String role, List<ExerciseDto> exercisesOwned, List<ExerciseDto> exercisesSigned) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.fullname = fullname;
		this.fn = fn;
		this.specialtyId = specialtyId;
		this.semester = semester;
		this.role = role;
		this.exercisesOwned = exercisesOwned;
		this.exercisesSigned = exercisesSigned;
	}

	public static List<UserMapper> userMapper(List<User> users) {
		return users.stream().map(user -> userMapper(user)).toList();
	}

	public static UserMapper userMapper(User user) {
		return new UserMapper(user.getId(), user.getUsername(), user.getPassword(), user.getFullname(), user.getFn(),
				user.getSpecialty() == null ? null : user.getSpecialty().getId(), user.getSemester(), user.getRole(),
				ExerciseMapper.mapExercises(user.getExercisesOwned()), ExerciseMapper.mapUserSignExercisesToExercises(user.getExercisesSigned()));
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

	public List<ExerciseDto> getExercisesOwned() {
		return exercisesOwned;
	}

	public void setExercisesOwned(List<ExerciseDto> exercisesOwned) {
		this.exercisesOwned = exercisesOwned;
	}

	public List<ExerciseDto> getExercisesSigned() {
		return exercisesSigned;
	}

	public void setExercisesSigned(List<ExerciseDto> exercisesSigned) {
		this.exercisesSigned = exercisesSigned;
	}
}
