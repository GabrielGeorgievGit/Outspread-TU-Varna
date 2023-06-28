package bg.tuvarna.outspread.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.dto.LoginDto;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtGeneratorImpl implements JwtGenerator {
	
	@Value("ivan")
	private String secret;
	@Value("pesho")
	private String message;

	@Override
	public Map<String, String> generateToken(LoginDto user) {
		String jwtToken = "";
		jwtToken = Jwts.builder().setSubject(user.getUsername()).setIssuedAt(new Date())
				.signWith(SignatureAlgorithm.HS256, "secret").compact();
		Map<String, String> jwtTokenGen = new HashMap<>();
		jwtTokenGen.put("token", jwtToken);
    jwtTokenGen.put("message", message);
    return jwtTokenGen;
  }
}