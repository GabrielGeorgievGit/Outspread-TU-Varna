package bg.tuvarna.outspread.jwt;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import bg.tuvarna.outspread.service.UserService;
import io.jsonwebtoken.Claims;
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

        if (!hasAuthorizationBearerToken(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = getAccessToken(request);

        if (!jwtUtil.validateAccessToken(accessToken)){
            filterChain.doFilter(request, response);
            return;
        }

        setAuthenticationContext(accessToken, request);
        
        filterChain.doFilter(request, response);
    }

    private boolean hasAuthorizationBearerToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");

        return ObjectUtils.isEmpty(header) || !header.startsWith("Bearer") ? false : true;
    }

    private String getAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");

        String token = header.split(" ")[1].trim();

        return token;
    }

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

        return userDetails;
    }
}
