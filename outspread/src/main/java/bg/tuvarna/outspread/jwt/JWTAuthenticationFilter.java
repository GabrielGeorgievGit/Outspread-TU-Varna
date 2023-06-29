package bg.tuvarna.outspread.jwt;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import bg.tuvarna.outspread.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final UserService userService;

    public JWTAuthenticationFilter(JWTUtil jwtUtil,
                                   UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {
//    	System.out.println("in do filter chain\nreqest headers:");
//    	System.out.println(Arrays.asList(request.getCookies()).get(0).getName());
//    	System.out.println("cookie value:");
//    	System.out.println(WebUtils.getCookie(request, "final-access-token").getValue());
//    	Cookie[] cookies = request.headers;
//    	System.out.println("cookies");
    	String authHeader = request.getHeader("Authorization");
//    	System.out.println(request.get);
//    	if(cookies != null ) {
//    		Optional<Cookie> cookie = Arrays.asList(cookies).stream().filter(cooki -> cooki.getName().equals("final-access-token")).findFirst();
//    		authHeader = Optional.ofNullable(cookie == null ? null : cookie.get().getValue()).orElse(null);
//    	}
        if (authHeader == null || !authHeader.startsWith("Bearer ") || authHeader.length() < 20) {
            filterChain.doFilter(request, response);
            return;
        }
        
        System.out.println("auth header: " + authHeader);
        String jwt = authHeader.substring(7);
        String subject = jwtUtil.getSubject(jwt);

        if (subject != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {
        	System.out.println("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\nsdafasdfsdaf\nsdafasdf");
            UserDetails userDetails = userService.loadUserByUsername(subject);
            if (jwtUtil.isTokenValid(jwt, userDetails.getUsername())) {
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities()
                        );
                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        
        filterChain.doFilter(request, response);

    }
}
