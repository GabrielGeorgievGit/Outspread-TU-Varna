package bg.tuvarna.outspread.security;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.dto.LoginResponseDto;
import bg.tuvarna.outspread.entity.Admin;
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
    
    public User loginUser(Authentication authentication) throws NotFoundException {
    	try {
    		Object obj = authentication.getPrincipal();
    		if(obj != null && obj instanceof User) {
    			return (User) obj;
    		}    		
    		else return null;
    	} catch(Exception e) {
    		return null;
    	}
    }
    
    public Admin loginAdmin(Authentication authentication) throws NotFoundException {
    	Object obj = authentication.getPrincipal();
    	if(obj != null && obj instanceof Admin) {
    		return (Admin) obj;
    	}
    	else throw new NotFoundException();
    }

    public LoginResponseDto login(LoginDto request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        User user = null;
        try {
        	user = (User) authentication.getPrincipal();
        	
        } catch(ClassCastException e) {
        	return null;
        }
        String token = jwtUtil.issueToken(user.getUsername(), user.getRole());
        return new LoginResponseDto(token, user);
    }
    
    public LoginResponseDto loginAdmin(LoginDto request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        
        Admin admin = null;
        try {
        	admin = (Admin) authentication.getPrincipal();
        } catch(ClassCastException e) {
        	return null;
        }
        String token = jwtUtil.issueToken(admin.getUsername(), admin.isPrime() ? "ROLE_ADMIN_PRIME" : "ROLE_AMDIN");
        return new LoginResponseDto(token, admin);
    }

}
