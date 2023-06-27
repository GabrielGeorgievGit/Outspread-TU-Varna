package bg.tuvarna.outspread.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import bg.tuvarna.outspread.entity.Admin;
import jakarta.persistence.EntityManager;

@Repository
public class AdminRepositoryImpl implements AdminRepository {
	
	@Autowired
	private EntityManager em;
	
	@Override
	public Admin findAdmin(String username) {
		Admin admin = em.createQuery(
				  "SELECT a from Admin a WHERE a.username = :username", Admin.class).
				  setParameter("username", username).getSingleResult();
		return admin;
	}
	
}
