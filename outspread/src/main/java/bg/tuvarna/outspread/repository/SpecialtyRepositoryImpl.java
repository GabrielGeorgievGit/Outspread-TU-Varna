package bg.tuvarna.outspread.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import bg.tuvarna.outspread.dto.DisciplineShortDto;
import bg.tuvarna.outspread.entity.Discipline;
import bg.tuvarna.outspread.entity.Specialty;
import bg.tuvarna.outspread.entity.SpecialtyDiscipline;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Repository
public class SpecialtyRepositoryImpl implements SpecialtyRepository {

	@Autowired
	private EntityManager em;
	
	@Override
	public List<Specialty> getAllSpecialties() {
		List<Specialty> specialties = new ArrayList<>();
		specialties.addAll(em.createQuery("SELECT s from Specialty s ORDER BY s.id", Specialty.class).getResultList());
		
		return specialties;
	}
	
	@Override
	public List<Discipline> getAllDisciplines() {
		List<Discipline> disciplines = new ArrayList<>();
		disciplines.addAll(em.createQuery("SELECT d from Discipline d ORDER BY d.id", Discipline.class).getResultList());
		
		return disciplines;
	}
	
	@Override
	public List<Specialty> getAllSpecialtiesSemester(char semester) {
		List<Specialty> specialties = new ArrayList<>();
		specialties.addAll(em.createQuery("SELECT s from Specialty s INNER JOIN SpecialtyDiscipline sd on s.id = sd.specialty.id WHERE sd.semester = :semester ORDER BY s.id, sd.discipline.id", Specialty.class)
				.setParameter("semester", semester)
				.getResultList());
		
		return specialties;
	}
	
	@Override
	public List<Specialty> getSpecialtiesSemester(int specialtyId, char semester) {
		List<Specialty> specialties = new ArrayList<>();
		specialties.addAll(em.createQuery("SELECT s from Specialty s INNER JOIN SpecialtyDiscipline sd on s.id = sd.specialty.id WHERE s.id = :specialtyId AND sd.semester = :semester ORDER BY s.id, sd.discipline.id", Specialty.class)
				.setParameter("specialtyId", specialtyId)
				.setParameter("semester", semester)
				.getResultList());
		
		return specialties;
	}
	
	@Override
	public Specialty getSpecialty(int id) {
		Specialty s = em.find(Specialty.class, id);
		return s;
	}
	
	@Override
	@Transactional
	public Optional<Specialty> createSpecialty(String name) {
		Specialty specialty = new Specialty();
		specialty.setName(name);
		em.persist(specialty);
		return Optional.of(specialty);
	}
	
	@Override
	@Transactional
	public Optional<Specialty> editSpecialty(int id, String name) {
		Specialty specialty = em.find(Specialty.class, id);
		specialty.setName(name);
		em.persist(specialty);
		return Optional.of(specialty);
	}
	
	@Override
	@Transactional
	public void deleteSpecialty(int id) {
		Specialty specialty = em.find(Specialty.class, id);
		em.remove(specialty);
	}

	@Override
	@Transactional
	public Optional<Discipline> createDiscipline(String name) {
		Discipline discipline = new Discipline();
		discipline.setName(name);
		em.persist(discipline);
		return Optional.of(discipline);
	}

	@Override
	@Transactional
	public Optional<Discipline> editDiscipline(int id, String name) {
		Discipline discipline = em.find(Discipline.class, id);
		discipline.setName(name);
		em.persist(discipline);
		return Optional.of(discipline);
	}

	@Override
	@Transactional
	public void deleteDiscipline(int id) {
		Discipline discipline = em.find(Discipline.class, id);
		em.remove(discipline);
	}
	
	@Override
	@Transactional
	public void changeNameDisciplines(int specialtyId, String specialtyName, char semester, List<DisciplineShortDto> disciplines) {
		Specialty specialty = em.find(Specialty.class, specialtyId);
		specialty.setName(specialtyName);
		
		em.createQuery("DELETE from SpecialtyDiscipline sd WHERE sd.specialty.id = :specialtyId and sd.semester = :semester")
		.setParameter("specialtyId", specialtyId)
		.setParameter("semester", semester).executeUpdate();
		
		List<Discipline> disc = disciplines.stream().map(d -> em.find(Discipline.class, d.getId())).toList();
		disc.forEach(d -> em.persist(new SpecialtyDiscipline(specialty, d, semester)));
	}
}
