package bg.tuvarna.outspread.repository;

import java.util.List;
import java.util.Optional;

import bg.tuvarna.outspread.entity.Discipline;
import bg.tuvarna.outspread.entity.Specialty;

public interface SpecialtyRepository {
	Optional<Specialty> createSpecialty(String name);
	Optional<Specialty> editSpecialty(int id, String name);
	void deleteSpecialty(int id);
	List<Specialty> getAllSpecialties();
	
	Optional<Discipline> createDiscipline(String name);
	Optional<Discipline> editDiscipline(int id, String name);
	void deleteDiscipline(int id);
}
