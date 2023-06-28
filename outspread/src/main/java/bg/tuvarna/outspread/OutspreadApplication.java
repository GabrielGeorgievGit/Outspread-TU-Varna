package bg.tuvarna.outspread; 

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = {ReactiveSecurityAutoConfiguration.class, ReactiveSecurityAutoConfiguration.class })
@ComponentScan
public class OutspreadApplication {

	public static void main(String[] args) {
		SpringApplication.run(OutspreadApplication.class, args);
	}

}
