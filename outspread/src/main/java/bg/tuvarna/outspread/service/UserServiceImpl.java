package bg.tuvarna.outspread.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.dto.UserDto;
import bg.tuvarna.outspread.dto.UserEditDto;
import bg.tuvarna.outspread.entity.User;
import bg.tuvarna.outspread.mapper.UserMapper;
import bg.tuvarna.outspread.repository.AdminRepository;
import bg.tuvarna.outspread.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService  {
	
	@Autowired
	private UserRepository ur;
	@Autowired
	private AdminRepository ar;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user = ur.findUser(username);
		if(user.isEmpty()) {
			return ar.findAdmin(username).orElseThrow(() -> new UsernameNotFoundException(username));
		} else return user.get();
	}
	
	@Override
	public User createUser(UserDto user) {
		return ur.createUser(user.getUsername(), user.getPassword(), user.getFullname(), user.getFn(), user.getSpecialtyId(), user.getSemester(), user.getRole()).get();
	}
	
	@Override
	public User editUser(UserEditDto user) {
		return ur.editUser(user.getId(), user.getUsername(), user.getPassword(), user.getFullname(), user.getFn(), user.getSpecialtyId(), user.getSemester(), user.getRole()).get();
	}
	
	@Override
	public void deleteUser(int id) {
		ur.deleteUser(id);
	}
	@Override
	public List<UserMapper> findUsersSpecialtySemester(int specialtyId, char semester) {
		return UserMapper.userMapper(ur.findUsersSpecialtySemester(specialtyId, semester));
	}
	
	@Override
	public List<UserMapper> findAllUsersSpecialty(int specialtyId) {
		return UserMapper.userMapper(ur.findAllUsersSpecialty(specialtyId));
		
	}
	
	@Override
	public
	List<UserMapper> findAllUsersSemester(char semester) {
		return UserMapper.userMapper(ur.findAllUsersSemester(semester));
	}

	@Override
	public UserMapper findUser(String username) {
		Optional<User> user = ur.findUser(username); 
		return UserMapper.userMapper(user.get());
	}

	@Override
	public List<UserMapper> findAllUsers() {
		List<User> user = ur.findAllUsers(); 
		return UserMapper.userMapper(user);
	}
}
