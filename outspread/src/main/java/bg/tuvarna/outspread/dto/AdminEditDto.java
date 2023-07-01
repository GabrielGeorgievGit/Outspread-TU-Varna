package bg.tuvarna.outspread.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class AdminEditDto {
	
	@NotNull
	@Positive
	private int id;
	
	@NotNull
	@Size(min=3, max=30)
	private String username;
	
	@NotNull
	@Size(min=3, max=50)
	private String password;

	public AdminEditDto(int id, String username, String password) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
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
}
