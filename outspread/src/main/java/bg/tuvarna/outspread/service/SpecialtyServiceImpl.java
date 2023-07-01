package bg.tuvarna.outspread.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.entity.Discipline;
import bg.tuvarna.outspread.entity.Specialty;
import bg.tuvarna.outspread.repository.SpecialtyRepository;

@Service
public class SpecialtyServiceImpl implements SpecialtyService {
	
	@Autowired
	private SpecialtyRepository sr;
	
	@Override
	public Specialty createSpecialty(String name) {
		return sr.createSpecialty(name).get();
	}
	
	@Override
	public Discipline createDiscipline(String name) {
		return sr.createDiscipline(name).get();
	}

}
