package bg.tuvarna.outspread; 

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;

import bg.tuvarna.outspread.config.RsaKeyProperties;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
@ComponentScan
public class OutspreadApplication {

	public static void main(String[] args) {
		SpringApplication.run(OutspreadApplication.class, args);
	}

}
