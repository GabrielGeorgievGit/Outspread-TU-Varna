package bg.tuvarna.outspread; 

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class OutspreadApplication {

	public static void main(String[] args) {
		SpringApplication.run(OutspreadApplication.class, args);
	}

}
