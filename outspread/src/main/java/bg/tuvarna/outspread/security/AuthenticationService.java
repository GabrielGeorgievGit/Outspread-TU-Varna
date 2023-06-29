package bg.tuvarna.outspread.security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.dto.LoginResponseDto;
import bg.tuvarna.outspread.entity.User;
import bg.tuvarna.outspread.jwt.JWTUtil;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    public AuthenticationService(AuthenticationManager authenticationManager,
                                 JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponseDto login(LoginDto request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        User user = (User) authentication.getPrincipal();
        String token = jwtUtil.issueToken(user.getUsername(), user.getRole());
        return new LoginResponseDto(token, user);
    }

}
