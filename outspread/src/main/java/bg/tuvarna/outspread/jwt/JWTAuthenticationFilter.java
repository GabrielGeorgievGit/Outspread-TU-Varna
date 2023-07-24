package bg.tuvarna.outspread.jwt;

import java.io.IOException;

import bg.tuvarna.outspread.entity.User;
import io.jsonwebtoken.Claims;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.util.ObjectUtils;

import bg.tuvarna.outspread.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final UserService userService;

    public JWTAuthenticationFilter(JWTUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        // IMB: always a good practice to extract such logic in separate function with good naming
        // improves code readability and if needed to see details of the logic you can quickly jump to the function
        if (!hasAuthorizationBearerToken(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        // IMB: Extracted to separate functions
        // Same reasons as above
        String accessToken = getAccessToken(request);

        // IMB: Validation extracted to separate function
        if (!jwtUtil.validateAccessToken(accessToken)){
            filterChain.doFilter(request, response);
            return;
        }

        // IMB: Improved in separate function to improve code readability
        setAuthenticationContext(accessToken, request);
        
        filterChain.doFilter(request, response);
    }

    // IMB: Extracted the logic from above to check if access bearer token is present
    private boolean hasAuthorizationBearerToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");

        return ObjectUtils.isEmpty(header) || !header.startsWith("Bearer") ? false : true;
    }

    // IMB: Extracted the logic from above which gets the access token
    private String getAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");

        // Instead of using substring to retrieve the actual JWT token itself,
        // we can easily split it by white space and from the resulting array we can get the token as the second element
        String token = header.split(" ")[1].trim();

        return token;
    }

    // IMB: Handling the authentication context here instead of keeping it in the doFilterInternal
    private void setAuthenticationContext(String token, HttpServletRequest request) {
        UserDetails userDetails = getUserDetails(token);

        UsernamePasswordAuthenticationToken
                authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        authentication.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private UserDetails getUserDetails(String token) {
        Claims claims = jwtUtil.getClaims(token);
        String subject = (String) claims.get(Claims.SUBJECT);
        UserDetails userDetails = userService.loadUserByUsername(subject);

//        String role = (String) claims.get("role");
//        userDetails.setRole(role);
//
//        String[] jwtSubject = subject.split(",");
//
//        userDetails.setId(Integer.parseInt(jwtSubject[0]));
//        userDetails.setEmail(jwtSubject[1]);

        return userDetails;
    }
}
