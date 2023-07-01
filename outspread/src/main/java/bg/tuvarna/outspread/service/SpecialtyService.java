package bg.tuvarna.outspread.service;

import bg.tuvarna.outspread.entity.Discipline;
import bg.tuvarna.outspread.entity.Specialty;

public interface SpecialtyService {
	Specialty createSpecialty(String name);
	Discipline createDiscipline(String name);
}	
