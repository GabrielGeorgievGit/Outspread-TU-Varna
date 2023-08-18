package bg.tuvarna.outspread.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_sign_exercise")
public class UserSignExercise {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "exercise_id")
	private Exercise exercise;
	
	
	public UserSignExercise() {
		
	}


	public UserSignExercise(User user, Exercise exercise) {
		super();
		this.user = user;
		this.exercise = exercise;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public Exercise getExercise() {
		return exercise;
	}


	public void setExercise(Exercise exercise) {
		this.exercise = exercise;
	}
}
