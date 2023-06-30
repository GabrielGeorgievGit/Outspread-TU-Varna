package bg.tuvarna.outspread.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.dto.ExerciseDto;
import bg.tuvarna.outspread.entity.Exercise;
import bg.tuvarna.outspread.repository.ExerciseRepository;

@Service
public class ExerciseServiceImpl implements ExerciseService {

	@Autowired
	private ExerciseRepository er;
	
	@Override
	public List<Exercise> getAllExercises() {
		return er.getAllExercises();
	}
	
	@Override
	public Exercise findExercise(int id) {
		return er.findExercise(id).get();//.orElseThrow(NotFoundException::new);
	}
	@Override
	public Exercise createExercise(ExerciseDto dto) {
		return er.createExercise(dto.getOwnerId(), dto.getTitle(), dto.getDisciplineId(), dto.getInfo(), dto.getTime(), dto.getDuration(), dto.getRoom(), dto.getSigned()).get();
	}
}
