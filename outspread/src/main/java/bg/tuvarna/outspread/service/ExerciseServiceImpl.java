package bg.tuvarna.outspread.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.dto.ExerciseDto;
import bg.tuvarna.outspread.entity.Exercise;
import bg.tuvarna.outspread.mapper.ExerciseMapper;
import bg.tuvarna.outspread.repository.ExerciseRepository;

@Service
public class ExerciseServiceImpl implements ExerciseService {

	@Autowired
	private ExerciseRepository er;
	
	@Override
	public List<ExerciseDto> getAllExercises() {
		return ExerciseMapper.mapExercises(er.getAllExercises());
	}
	
	@Override
	public ExerciseDto findExercise(int id) {
		return ExerciseMapper.mapExercise(er.findExercise(id).get());//.orElseThrow(NotFoundException::new);
	}
	
	@Override
	public Exercise createExercise(ExerciseDto dto) {
		return er.createExercise(dto.getOwnerId(), dto.getTitle(), dto.getDisciplineId(), dto.getInfo(), dto.getTime(), dto.getDuration(), dto.getRoom(), dto.getSigned()).get();
	}
	
//	@Override
//	public Exercise paginateExercises(ExerciseDto dto) {
//		return er.createExercise(dto.getOwnerId(), dto.getTitle(), dto.getDisciplineId(), dto.getInfo(), dto.getTime(), dto.getDuration(), dto.getRoom(), dto.getSigned()).get();
//	}
}
