package bg.tuvarna.outspread.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import bg.tuvarna.outspread.entity.Discipline;
import bg.tuvarna.outspread.entity.Exercise;
import bg.tuvarna.outspread.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Repository
public class ExerciseRepositoryImpl implements ExerciseRepository {

	@Autowired
	private EntityManager em;
	
	@Override
	public List<Exercise> getAllExercises() {
		return em.createQuery("SELECT e FROM Exercise e", Exercise.class).getResultList();
	}
	
	@Override
	public Optional<Exercise> findExercise(int id) {
		Exercise exercise = em.createQuery(
				  "SELECT e from Exercise e WHERE e.id = :id", Exercise.class).
				  setParameter("id", id).getSingleResult();
		
		return Optional.of(exercise);
	}
	
	@Override
	@Transactional
	public Optional<Exercise> createExercise(int ownerId, String title, int disciplineId, String info, LocalDate time, LocalTime duration, String room, int signed) {
		
		User owner = em.find(User.class, ownerId);
		System.out.println("here\n\n\n\n\n\n" + disciplineId);
		Discipline discipline = em.find(Discipline.class, disciplineId);
		
		Exercise exercise = new Exercise(owner, title, discipline, info, time, duration, room, signed);
		System.out.println("here\n\n\n\n\n\n" + disciplineId + " " + exercise.getDiscipline().getName());
		em.persist(exercise);
		
		return Optional.of(exercise);
	}
	
}
