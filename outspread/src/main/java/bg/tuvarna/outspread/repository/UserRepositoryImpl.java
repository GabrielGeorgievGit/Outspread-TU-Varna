package bg.tuvarna.outspread.repository;

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
		Specialty specialty = em.find(Specialty.class, specialtyId);
		User user = new User(username, password, fullname, fn, specialty, semester, role);
		
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
}
