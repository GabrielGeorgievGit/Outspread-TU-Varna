package bg.tuvarna.outspread.repository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import bg.tuvarna.outspread.entity.Admin;
import jakarta.persistence.EntityManager;

@Repository
public class AdminRepositoryImpl implements AdminRepository {
	
	@Autowired
	private EntityManager em;
	
	@Override
	public Optional<Admin> findAdmin(String username) {
		Admin admin = em.createQuery(
				  "SELECT a from Admin a WHERE a.username = :username", Admin.class).
				  setParameter("username", username).getSingleResult();
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		 admin.setPassword(passwordEncoder.encode(admin.getPassword()));
		 
		return Optional.of(admin);
	}
	
}
