package bg.tuvarna.outspread.dto;

import bg.tuvarna.outspread.entity.Admin;

public class LoginAdminResponseDto {
	private String token;
	private Admin admin;
	public LoginAdminResponseDto(String token, Admin user) {
		super();
		this.token = token;
		this.admin = user;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Admin getUser() {
		return admin;
	}
	public void setUser(Admin user) {
		this.admin = user;
	}
}
