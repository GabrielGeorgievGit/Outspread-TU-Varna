package bg.tuvarna.outspread.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.dto.SpecialtyDto;
import bg.tuvarna.outspread.entity.Discipline;
import bg.tuvarna.outspread.entity.Specialty;
import bg.tuvarna.outspread.mapper.SpecialtyDisciplineMapper;
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

	@Override
	public List<SpecialtyDto> getAllSpecialties() {
		return SpecialtyDisciplineMapper.mapSpecialties(sr.getAllSpecialties());
	}
	
	@Override
	public List<SpecialtyDto> getSpecialtiesSemester(int specialtyId, char semester) {
		return SpecialtyDisciplineMapper.mapSpecialties(sr.getSpecialtiesSemester(specialtyId, semester));
	}
	
	@Override
	public List<SpecialtyDto> getAllSpecialtiesSemester(char semester) {
		return SpecialtyDisciplineMapper.mapSpecialties(sr.getAllSpecialtiesSemester(semester));
	}


	@Override
	public SpecialtyDto getSpecialty(int id) {
		return SpecialtyDisciplineMapper.mapSpecialty(sr.getSpecialty(id));
	}
}
