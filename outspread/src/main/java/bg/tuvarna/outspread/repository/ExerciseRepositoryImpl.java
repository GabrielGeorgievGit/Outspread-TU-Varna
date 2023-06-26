package bg.tuvarna.outspread.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import bg.tuvarna.outspread.entity.Exercise;
import jakarta.persistence.EntityManager;

@Repository
public class ExerciseRepositoryImpl implements ExerciseRepository {

	@Autowired
	private EntityManager em;
	
	@Override
	public List<Exercise> getAllExercises() {
		return em.createQuery("SELECT e FROM Exercise e", Exercise.class).getResultList();
	}
	
}
