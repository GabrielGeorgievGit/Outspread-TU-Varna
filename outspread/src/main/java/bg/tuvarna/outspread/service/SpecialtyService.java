package bg.tuvarna.outspread.service;

import java.util.List;

import bg.tuvarna.outspread.dto.SpecialtyDto;
import bg.tuvarna.outspread.entity.Discipline;
import bg.tuvarna.outspread.entity.Specialty;

public interface SpecialtyService {
	Specialty createSpecialty(String name);
	Discipline createDiscipline(String name);
	List<SpecialtyDto> getAllSpecialties();
	SpecialtyDto getSpecialty(int id);
}	
