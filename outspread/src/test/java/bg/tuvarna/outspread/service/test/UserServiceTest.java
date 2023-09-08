package bg.tuvarna.outspread.service.test;

import static org.junit.Assert.assertThrows;
import static org.junit.Assert.assertTrue;

import java.util.NoSuchElementException;

import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import bg.tuvarna.outspread.dto.UserDto;
import bg.tuvarna.outspread.dto.UserEditDto;
import bg.tuvarna.outspread.entity.User;
import bg.tuvarna.outspread.mapper.UserMapper;
import bg.tuvarna.outspread.service.UserService;
import bg.tuvarna.outspread.service.UserServiceImpl;

@SpringBootTest
public class UserServiceTest {
	
	@Autowired
    private UserService us;
	
    @Before
    public void setUp() {
    	us = new UserServiceImpl();
    }
    
    boolean equalUserMapper(UserMapper u1, UserMapper u2) {
    	return u1.getId() == u2.getId() && u1.getUsername().equals(u2.getUsername()) && u1.getPassword().equals(u2.getPassword()) && u1.getFullname().equals(u2.getFullname())
    			&& u1.getFn().equals(u2.getFn()) && u1.getSpecialtyId() == u2.getSpecialtyId() && u1.getSemester() == u2.getSemester() && u1.getRole().equals(u2.getRole()); 
    }
	 
	 @Test
	  void findByUsername() throws Exception {
		 UserMapper user = us.findUser("ivant");
		 assertTrue(user.getId() == 18);
	  }
	 
	 @Test
	  void createDelete() throws Exception {
		 User created = us.createUser(new UserDto("testcreatedetele", "testcreatedetele", "Tania Doncheva", "11111111", 1, '1', "STUDENT"));
		 UserMapper find = us.findUser("testcreatedetele");
		 assertTrue(created.getId() == find.getId());
		 us.deleteUser(created.getId());
		
		 assertThrows(NoSuchElementException.class, () -> us.findUser("testcreatedetele"));
	  }
	 
	 @Test
	  void createEditDelete() throws Exception {
		 User created = us.createUser(new UserDto("testcreatedetele", "testcreatedetele", "Tania Doncheva", "11111111", 1, '1', "STUDENT"));
		 
		 us.editUser(new UserEditDto(created.getId(), "testcreatedetele", "testcreatedetele", "Tania Doncheva", "11111112", 1, '1', "STUDENT"));
		 
		 UserMapper find = us.findUser("testcreatedetele");
		 assertTrue(find.getFn().equals("11111112"));
		 us.deleteUser(created.getId());
		
		 assertThrows(NoSuchElementException.class, () -> us.findUser("testcreatedetele"));
	  }
	 
	 
}
