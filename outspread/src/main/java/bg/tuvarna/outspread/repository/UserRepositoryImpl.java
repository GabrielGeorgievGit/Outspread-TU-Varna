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
	
	@Autowired
	private ExerciseRepository er;
	
	@Override
	public Optional<User> findUser(int id) {
		return Optional.of(em.find(User.class, id));
	}
	
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
		
		if(role != "STUDENT") {
			User user = new User(username, password, fullname, null, specialty, null, role, List.of(), List.of());
			
			em.persist(user);
			
			return Optional.of(user);
		}
		
		User user = new User(username, password, fullname, fn, specialty, semester, role, List.of(), List.of());
		
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
		User u = em.find(User.class, id);
		u.getExercisesSigned().forEach(e -> e.getExercise().minusSigned());
		
		em.createNativeQuery("DELETE s FROM outspreaddb.user_sign_exercise s LEFT join outspreaddb.exercise e on s.exercise_id = e.exercise_id where e.owner_id = :id").setParameter("id", id).executeUpdate();
		em.createNativeQuery("DELETE FROM outspreaddb.user_sign_exercise s where s.user_id = :id").setParameter("id", id).executeUpdate();
		em.createNativeQuery("DELETE r FROM outspreaddb.RESERVE_ROOM r LEFT join outspreaddb.exercise e on r.exercise_id = e.exercise_id where e.owner_id = :id").setParameter("id", id).executeUpdate();
		em.createNativeQuery("DELETE FROM EXERCISE WHERE OWNER_ID = :id").setParameter("id", id).executeUpdate();
		em.createNativeQuery("DELETE FROM USER WHERE USER_ID = :id").setParameter("id", id).executeUpdate();
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
