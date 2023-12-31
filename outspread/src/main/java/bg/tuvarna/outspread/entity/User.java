package bg.tuvarna.outspread.entity;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User implements UserDetails {

	private static final long serialVersionUID = 4422872008000333258L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private int id;
	private String username;
	private String password;
	private String fullname;
	private String fn;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "specialty_id")
	private Specialty specialty;

	private Character semester;
	@Column(name = "role")
	private String role;

	@OneToMany(mappedBy = "owner", fetch = FetchType.EAGER)
	private List<Exercise> exercisesOwned;
	
	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	private List<UserSignExercise> exercisesSigned;

	public User() {

	}

	public User(String username, String password, String fullname, String fn, Specialty specialty, Character semester,
			String role, List<Exercise> exercisesOwned, List<UserSignExercise> exercisesSigned) {
		super();
		this.username = username;
		this.password = password;
		this.fullname = fullname;
		this.fn = fn;
		this.specialty = specialty;
		this.semester = semester;
		this.role = role;
		this.exercisesOwned = exercisesOwned;
		this.exercisesSigned = exercisesSigned;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Override
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
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

	public Specialty getSpecialty() {
		return specialty;
	}

	public void setSpecialty(Specialty specialty) {
		this.specialty = specialty;
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

	public List<Exercise> getExercisesOwned() {
		return exercisesOwned;
	}

	public void setExercisesOwned(List<Exercise> exercisesOwned) {
		this.exercisesOwned = exercisesOwned;
	}

	public List<UserSignExercise> getExercisesSigned() {
		return List.copyOf(exercisesSigned);
	}

	public void setExercisesSigned(List<UserSignExercise> exercisesSigned) {
		this.exercisesSigned = exercisesSigned;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role));
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
