package bg.tuvarna.outspread.dto;

import bg.tuvarna.outspread.mapper.UserMapper;

public class LoginUserResponseDto {
	private String token;
	private UserMapper user;
	public LoginUserResponseDto(String token, UserMapper user) {
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
	public UserMapper getUser() {
		return user;
	}
	public void setUser(UserMapper user) {
		this.user = user;
	}
}
