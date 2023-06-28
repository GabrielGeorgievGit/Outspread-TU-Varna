package bg.tuvarna.outspread.service;

import java.util.Map;

import bg.tuvarna.outspread.dto.LoginDto;

public interface JwtGenerator {
	Map<String, String> generateToken(LoginDto user);
}
