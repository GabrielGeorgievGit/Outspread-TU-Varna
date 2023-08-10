package bg.tuvarna.outspread.repository;

import java.util.List;
import java.util.Optional;

import bg.tuvarna.outspread.dto.DisciplineShortDto;
import bg.tuvarna.outspread.entity.Discipline;
import bg.tuvarna.outspread.entity.Specialty;

public interface SpecialtyRepository {
	Optional<Specialty> createSpecialty(String name);
	Optional<Specialty> editSpecialty(int id, String name);
	void deleteSpecialty(int id);
	List<Specialty> getAllSpecialties();
	List<Specialty> getSpecialtiesSemester(int specialtyId, char semester);
	List<Specialty> getAllSpecialtiesSemester(char semester);
	
	Specialty getSpecialty(int id);
	
	List<Discipline> getAllDisciplines();
	Optional<Discipline> createDiscipline(String name);
	Optional<Discipline> editDiscipline(int id, String name);
	void deleteDiscipline(int id);
	
	void changeNameDisciplines(int specialtyId, String specialtyName, char semester, List<DisciplineShortDto> disciplines);
	
//	List<SpecialtyDiscipline> getAllSpecialtiesDisciplines();
}
