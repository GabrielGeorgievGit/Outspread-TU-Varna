package bg.tuvarna.outspread.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.dto.DisciplineShortDto;
import bg.tuvarna.outspread.dto.SpecialtyChangeDto;
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
		Specialty s = null;
		try {
			s = sr.createSpecialty(name).get();
		} catch(Exception e) {
			e.printStackTrace();
		}
		return s;
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
	
	@Override
	public List<DisciplineShortDto> getAllDisciplines() {
		return SpecialtyDisciplineMapper.mapDisciplines(sr.getAllDisciplines()); 
	}
	
	@Override
	public void changeNameDisciplines(SpecialtyChangeDto dto) {
		sr.changeNameDisciplines(dto.getId(), dto.getName(), dto.getSemester(), dto.getDisciplines());
	}
}
