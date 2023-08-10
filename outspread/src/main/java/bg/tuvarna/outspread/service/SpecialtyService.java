package bg.tuvarna.outspread.service;

import java.util.List;

import bg.tuvarna.outspread.dto.DisciplineShortDto;
import bg.tuvarna.outspread.dto.SpecialtyChangeDto;
import bg.tuvarna.outspread.dto.SpecialtyDto;
import bg.tuvarna.outspread.entity.Discipline;
import bg.tuvarna.outspread.entity.Specialty;

public interface SpecialtyService {
	Specialty createSpecialty(String name);
	Discipline createDiscipline(String name);
	
	List<SpecialtyDto> getAllSpecialties();
	List<SpecialtyDto> getSpecialtiesSemester(int specialtyId, char semester);
	List<SpecialtyDto> getAllSpecialtiesSemester(char semester);
	
	SpecialtyDto getSpecialty(int id);
	
	List<DisciplineShortDto> getAllDisciplines();
	
	void changeNameDisciplines(SpecialtyChangeDto dto);
}	
