package bg.tuvarna.outspread.controller.test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import bg.tuvarna.outspread.controller.UserController;
import bg.tuvarna.outspread.security.SecurityConfig;
import bg.tuvarna.outspread.service.UserService;
//@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc(addFilters = false)
@ContextConfiguration(classes = {UserController.class, UserService.class, SecurityConfig.class})
@WebMvcTest(controllers = UserController.class)
public class UserControllerTest {
	
	  @Autowired
	  private MockMvc mockMvc;

	  @Autowired
	  private ObjectMapper objectMapper;

	  @MockBean
	  private UserService us;
	  
	  @Disabled
	  @Test
	  void findByUsername() throws Exception {
		  System.out.println("TUKAAAAA/n/n/n/n/n/n");
		  
		  MockHttpServletResponse res = mockMvc.perform(get("/user/find")
			.param("username", "ivan")
			.contentType("application/json"))
		  	.andExpect(status().isOk())
		  	.andReturn().getResponse();
		  System.out.println(res);
		  System.out.println("TUKAAAAA324234/n/n/n/n/n/n");
	  }
}
