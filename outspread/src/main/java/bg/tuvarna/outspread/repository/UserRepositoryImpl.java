package bg.tuvarna.outspread.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import bg.tuvarna.outspread.entity.User;
import jakarta.persistence.EntityManager;

@Repository
public class UserRepositoryImpl implements UserRepository {
	@Autowired
	private EntityManager em;
	
	@Override
	public User findUser(String username) {
		String kus = em.createQuery("SELECT u from User u").getResultList().toString();
		System.out.println(kus);
		User user = em.createQuery(
				  "SELECT u from User u WHERE u.username = :username", User.class).
				  setParameter("username", username).getSingleResult();
		
		return user;
	}
	
	
}
