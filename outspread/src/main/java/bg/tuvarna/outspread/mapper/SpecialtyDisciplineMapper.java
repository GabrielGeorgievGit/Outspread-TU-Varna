package bg.tuvarna.outspread.mapper;

import java.util.List;

import bg.tuvarna.outspread.dto.DisciplineDto;
import bg.tuvarna.outspread.dto.SpecialtyDto;
import bg.tuvarna.outspread.entity.Specialty;
import bg.tuvarna.outspread.entity.SpecialtyDiscipline;

public class SpecialtyDisciplineMapper {
	public static List<SpecialtyDto> mapSpecialties(List<Specialty> list) {
		return list.stream().map(specialty -> new SpecialtyDto(specialty.getId(), specialty.getName(), mapDisciplines(specialty.getSpecialtyDisciplines()))).toList();
	}
	
	public static List<DisciplineDto> mapDisciplines(List<SpecialtyDiscipline> list) {
		return list.stream().map(d -> new DisciplineDto(d.getDiscipline().getId(), d.getDiscipline().getName(), d.getSemester())).toList();
	}
}
