 package bg.tuvarna.outspread.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import bg.tuvarna.outspread.entity.Specialty;
import bg.tuvarna.outspread.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Repository
public class UserRepositoryImpl implements UserRepository {
	@Autowired
	private EntityManager em;
	
	@Override
	public Optional<User> findUser(String username) {
		User user = null;
		try {
			user = em.createQuery("SELECT u from User u WHERE u.username = :username", User.class).
				  setParameter("username", username).getSingleResult();
			
		 BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		 user.setPassword(passwordEncoder.encode(user.getPassword()));
		} catch(Exception e) {
			return Optional.empty();
		}
		return Optional.of(user);
	}
	
	@Override
	@Transactional
	public Optional<User> createUser(String username, String password, String fullname, String fn, int specialtyId, Character semester, String role) {
		System.out.println("roel::::: " + role);
		Specialty specialty = em.find(Specialty.class, specialtyId);
		User user = new User(username, password, fullname, fn, specialty, semester, role);
		
		em.persist(user);
		
		return Optional.of(user);
	}
	
	@Override
	@Transactional
	public Optional<User> editUser(int id, String username, String password, String fullname, String fn, int specialtyId, Character semester, String role) {
		User user = em.find(User.class, id);
		Specialty specialty = em.find(Specialty.class, specialtyId);
		
		user.setUsername(username);
		user.setPassword(password);
		user.setFullname(fullname);
		user.setFn(fn);
		user.setSpecialty(specialty);
		user.setSemester(semester);
		user.setRole(role);
		
		em.persist(user);
		
		return Optional.of(user);
	}
	
	@Override
	@Transactional 
	public void deleteUser(int id) {
		User user = em.find(User.class, id);
		user.setSpecialty(null);
		em.remove(user);
	}

	@Override
	public List<User> findAllUsers() {
		return em.createQuery("SELECT u FROM User u", User.class).getResultList();
	}
	
	@Override
	public List<User> findUsersSpecialtySemester(int specialtyId, char semester) {
		return em.createQuery("SELECT u from User u WHERE u.specialty.id = :specialtyId AND u.semester = :semester ORDER BY u.specialty.id", User.class)
				.setParameter("specialtyId", specialtyId)
				.setParameter("semester", semester).getResultList();
	}

	@Override
	public List<User> findAllUsersSpecialty(int specialtyId) {
		Specialty specialty = em.find(Specialty.class, specialtyId);
		
		return specialty.getUsers();
	}

	@Override
	public List<User> findAllUsersSemester(char semester) {
		return em.createQuery("SELECT u from User u WHERE u.semester = :semester", User.class).
		  setParameter("semester", semester).getResultList();
	}
}
