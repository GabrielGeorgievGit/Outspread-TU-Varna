package bg.tuvarna.outspread.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import bg.tuvarna.outspread.entity.Discipline;
import bg.tuvarna.outspread.entity.Specialty;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Repository
public class SpecialtyRepositoryImpl implements SpecialtyRepository {

	@Autowired
	private EntityManager em;
	
	@Override
	public List<Specialty> getAllSpecialties() {
		List<Specialty> specialties = new ArrayList<>();
		specialties.addAll(em.createQuery("SELECT s from Specialty s", Specialty.class).getResultList());
		
		return specialties;
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

}
