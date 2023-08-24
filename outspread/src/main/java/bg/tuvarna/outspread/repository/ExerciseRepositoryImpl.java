package bg.tuvarna.outspread.repository;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Repository;

import bg.tuvarna.outspread.entity.Discipline;
import bg.tuvarna.outspread.entity.Exercise;
import bg.tuvarna.outspread.entity.ReserveRoom;
import bg.tuvarna.outspread.entity.Room;
import bg.tuvarna.outspread.entity.User;
import bg.tuvarna.outspread.entity.UserSignExercise;
import bg.tuvarna.outspread.service.tools.Tools;
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
	public Optional<Exercise> createExercise(int ownerId, String title, int disciplineId, String info, LocalDateTime time, LocalTime duration, int roomId) {
		User owner = em.find(User.class, ownerId);
		Discipline discipline = em.find(Discipline.class, disciplineId);
		Room room = em.find(Room.class, roomId);
		
		Exercise exercise = new Exercise(owner, title, discipline, info, time, duration, room, 0);
		em.persist(exercise);
		
		addReservedRoomExercise(exercise);
		
		return Optional.of(exercise);
	}
	
	private void addReservedRoomExercise(Exercise exercise) {
		ReserveRoom reserved = new ReserveRoom(exercise.getRoom(), exercise, exercise.getTime(), Tools.addLocaltime(exercise.getTime(), exercise.getDuration()));
		em.persist(reserved);
	}
	
	@Override
	@Transactional
	public UserSignExercise signUserExercise(int userId, int exerciseId) throws NotFoundException {
		User user = em.find(User.class, userId);
		
		Exercise exercise = em.find(Exercise.class, exerciseId);
		
		if(alreadySigned(user, exercise) || ownedExercise(user, exercise)) throw new NotFoundException();
		
		UserSignExercise sign = new UserSignExercise(user, exercise);
		em.persist(sign);
		
		exercise.addSigned();
		
		return sign;
	}
	
	@Override
	@Transactional
	public void signOutUserExercise(int userId, int exerciseId) throws NotFoundException {
		User user = em.find(User.class, userId);
		
		Exercise exercise = em.find(Exercise.class, exerciseId);
		
		if(!alreadySigned(user, exercise) || ownedExercise(user, exercise)) throw new NotFoundException();
		
		em.createNativeQuery("DELETE FROM user_sign_exercise s where s.user_id = :user and s.exercise_id = :exercise")
		.setParameter("user", userId).setParameter("exercise", exerciseId).executeUpdate();
		
		exercise.minusSigned();
	}
	
	private boolean alreadySigned(User user, Exercise exercise) {
		List<Exercise> list = user.getExercisesSigned().stream().map(item -> item.getExercise()).toList();
		return list.contains(exercise);
	}
	
	private boolean ownedExercise(User user, Exercise exercise) {
		List<Exercise> list = user.getExercisesOwned();
		return list.contains(exercise);
	}

	@Override
	public List<Room> getAllRooms() {
		return em.createQuery("SELECT r FROM Room r ORDER BY r.name", Room.class).getResultList();
	}
	
	@Override
	public Room findFreeRoom(LocalDateTime from, LocalDateTime to) {
		List<Room> rooms = em.createQuery("SELECT r FROM Room r order by r.name", Room.class).getResultList();
		
		Room result = null;
		
		for(Room r : rooms) {
			if(!r.isReserved()) return r;
			List<ReserveRoom> reserved = 
					em.createQuery("SELECT r FROM ReserveRoom r WHERE r.room = :room", ReserveRoom.class)
					.setParameter("room", r).getResultList();
			
			for(ReserveRoom res : reserved) {
				if(outsideTime(res.getFrom(), res.getTo(), from, to)) result = r;
				else result = null;
			}
			if(result != null) return result;
		}
		
		return result;
	}
	
	private boolean outsideTime(LocalDateTime fromT1, LocalDateTime toT1, LocalDateTime fromT2, LocalDateTime toT2) {
		if(toT2.isBefore(fromT1) || fromT2.isAfter(toT1)) return true;
		return false;
	}

	@Override
	public List<Room> getAllFreeRooms(LocalDateTime from, LocalDateTime to) {
		List<Room> rooms = em.createQuery("SELECT r FROM Room r order by r.name", Room.class).getResultList();
		List<Room> freeRooms = new ArrayList<>();
		
		for(Room r : rooms) {
			if(!r.isReserved()) freeRooms.add(r);
			List<ReserveRoom> reserved = 
					em.createQuery("SELECT r FROM ReserveRoom r WHERE r.room = :room", ReserveRoom.class)
					.setParameter("room", r).getResultList();
			boolean isFree = false;
			for(ReserveRoom res : reserved) {
				if(outsideTime(res.getFrom(), res.getTo(), from, to)) isFree = true;
				else isFree = false;
			}
			if(isFree) freeRooms.add(r);
		}
		
		return freeRooms;
	}

	@Override
	@Transactional
	public void deleteExericse(int id) {
		em.createNativeQuery("DELETE s FROM outspreaddb.user_sign_exercise s LEFT join outspreaddb.exercise e on s.exercise_id = e.exercise_id where e.exercise_id = :id").setParameter("id", id).executeUpdate();
		
		em.createNativeQuery("DELETE r FROM outspreaddb.RESERVE_ROOM r LEFT join outspreaddb.exercise e on r.exercise_id = e.exercise_id where e.exercise_id = :id").setParameter("id", id).executeUpdate();
		
		em.createNativeQuery("DELETE FROM EXERCISE WHERE EXERCISE_ID = :id").setParameter("id", id).executeUpdate();
	}
}
