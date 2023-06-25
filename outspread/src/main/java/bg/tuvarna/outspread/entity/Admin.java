package bg.tuvarna.outspread.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "admin")
public class Admin {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="admin_id")
	private int id;
	private String username;
	private String password;
	private boolean prime;
	
	
	public Admin(int id, String username, String password, boolean prime) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.prime = prime;
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
	public boolean isPrime() {
		return prime;
	}
	public void setPrime(boolean prime) {
		this.prime = prime;
	}
	
	
}
