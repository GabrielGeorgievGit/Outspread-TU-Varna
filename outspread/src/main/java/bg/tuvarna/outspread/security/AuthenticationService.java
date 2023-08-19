package bg.tuvarna.outspread.security;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.dto.LoginAdminResponseDto;
import bg.tuvarna.outspread.dto.LoginDto;
import bg.tuvarna.outspread.dto.LoginUserResponseDto;
import bg.tuvarna.outspread.entity.Admin;
import bg.tuvarna.outspread.entity.User;
import bg.tuvarna.outspread.jwt.JWTUtil;
import bg.tuvarna.outspread.mapper.UserMapper;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    public AuthenticationService(AuthenticationManager authenticationManager,
                                 JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }
    
    public UserMapper loginUser(Authentication authentication) throws NotFoundException {
    	try {
    		Object obj = authentication.getPrincipal();
    		if(obj != null && obj instanceof User) {
    			return UserMapper.userMapper((User) obj);
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

    public LoginUserResponseDto login(LoginDto request) throws NotFoundException {
    	Authentication authentication = null;
    	
    	try {
    		authentication = authenticationManager.authenticate(
        			new UsernamePasswordAuthenticationToken(
        					request.getUsername(),
        					request.getPassword()
        					)
        			);
    		
    	} catch(Exception e) {
    		throw new NotFoundException();
    	}
    	
        User user = null;
        String token = null;
        try {
        	user = (User) authentication.getPrincipal();
        	
        	token = jwtUtil.issueToken(user.getUsername(), user.getRole().toString());
        } catch(Exception e) {
        	return null;
        }
        return new LoginUserResponseDto(token, UserMapper.userMapper(user));
    }
    
    public LoginAdminResponseDto loginAdmin(LoginDto request) throws NotFoundException {
    	Authentication authentication = null;
    	try {
    		authentication = authenticationManager.authenticate(
    				new UsernamePasswordAuthenticationToken(
    						request.getUsername(),
    						request.getPassword()
    						)
    				);
    		
    	} catch(Exception e) {
    		throw new NotFoundException();
    	}
        
        Admin admin = null;
        String token = null;
        try {
        	admin = (Admin) authentication.getPrincipal();
        	token = jwtUtil.issueToken(admin.getUsername(), admin.isPrime() ? "ROLE_ADMIN_PRIME" : "ROLE_ADMIN");

        } catch(Exception e) {
        	return null;
        }
        return new LoginAdminResponseDto(token, admin);
    }

}
