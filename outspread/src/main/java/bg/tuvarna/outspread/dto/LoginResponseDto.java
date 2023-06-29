package bg.tuvarna.outspread.dto;

import bg.tuvarna.outspread.entity.User;

public class LoginResponseDto {
	private String token;
	private User user;
	public LoginResponseDto(String token, User user) {
		super();
		this.token = token;
		this.user = user;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	
	
}
