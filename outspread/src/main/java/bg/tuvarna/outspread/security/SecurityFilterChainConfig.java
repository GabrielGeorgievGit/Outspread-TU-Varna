package bg.tuvarna.outspread.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import bg.tuvarna.outspread.jwt.JWTAuthenticationFilter;
@Configuration
@EnableWebSecurity
// IMB: added this to allow role authorization
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true)
public class SecurityFilterChainConfig {

    private final AuthenticationProvider authenticationProvider;
    private final JWTAuthenticationFilter jwtAuthenticationFilter;
    @Autowired
    private AuthenticationEntryPoint authenticationEntryPoint;

    public SecurityFilterChainConfig(AuthenticationProvider authenticationProvider,
                                     JWTAuthenticationFilter jwtAuthenticationFilter) {
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }
    
    
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    	try {
        http
                .csrf().disable()
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests()
                .requestMatchers(
                		HttpMethod.GET, "/login"
                		).permitAll()
                .requestMatchers(
                		HttpMethod.POST, "/login"
                		).permitAll()
                .requestMatchers(
                		HttpMethod.GET, "/admin/login"
                		).permitAll()
                .requestMatchers(
                		HttpMethod.POST, "/admin/login"
                		).permitAll()
                .requestMatchers(HttpMethod.POST, "/exercise/sign/user"
                		).permitAll()
                .requestMatchers(HttpMethod.POST, "/specialty/semester"
                		).permitAll()
                .requestMatchers(
                		HttpMethod.POST, "/**"
                		).hasAnyRole("ADMIN_PRIME", "ADMIN")
                .requestMatchers(
                		HttpMethod.POST, "/**"
                		).hasAnyRole("ROLE_ADMIN_PRIME", "ADMIN")
                .requestMatchers(HttpMethod.PUT, "/specialty/change"
                		).hasAnyRole("ROLE_ADMIN_PRIME", "ADMIN")
                
                
                /*
                //admin
                .requestMatchers(
                		HttpMethod.POST, "/admin/**"
                		).hasAnyRole("ADMIN_PRIME")
                .requestMatchers(
                		HttpMethod.PUT, "/admin/**"
                		).hasAnyRole("ADMIN_PRIME")
                .requestMatchers(
                		HttpMethod.DELETE, "/admin/**"
                		).hasAnyRole("ADMIN_PRIME")
                .requestMatchers(
                		HttpMethod.POST, "/user/**"
                		).hasAnyRole("ADMIN_PRIME", "ADMIN")
                .requestMatchers(
                		HttpMethod.POST, "/user/*"
                		).hasAnyRole("ADMIN_PRIME", "ADMIN")
                .requestMatchers(
                		HttpMethod.POST, "/specialty/add"
                		).hasAnyRole("ADMIN_PRIME", "ADMIN")
//                .requestMatchers(
//                		HttpMethod.GET, "/user/findSemester"
//                		).hasAnyRole("ADMIN_PRIME", "ADMIN")
                //user
                .requestMatchers(
                		HttpMethod.POST, "/user/create"
                		).hasAnyRole("ADMIN_PRIME", "ADMIN")
                .requestMatchers(
                        HttpMethod.PUT, "/user/edit"
                ).hasAnyRole("ADMIN_PRIME", "ADMIN")
                .requestMatchers(
                        HttpMethod.DELETE, "/user/delete"
                ).hasAnyRole("ADMIN_PRIME", "ADMIN")
                //specialty
                .requestMatchers(
                        HttpMethod.POST, "/specialty/create"
                ).hasAnyRole("ADMIN_PRIME", "ADMIN")
                .requestMatchers(
                        HttpMethod.GET, "/**"
                )
                .permitAll()
                */
//                .requestMatchers(
//                        HttpMethod.POST, "/**"
//                )
//                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                )
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint);
        return http.build();
    	} catch(Exception e) {
    		e.printStackTrace();
    		throw new NotFoundException();
    	}
    }
}
