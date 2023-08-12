package bg.tuvarna.outspread.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bg.tuvarna.outspread.dto.ExerciseCreateDto;
import bg.tuvarna.outspread.dto.ExerciseDto;
import bg.tuvarna.outspread.dto.RoomDto;
import bg.tuvarna.outspread.mapper.ExerciseMapper;
import bg.tuvarna.outspread.repository.ExerciseRepository;
import bg.tuvarna.outspread.service.tools.Tools;

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
	public ExerciseDto createExercise(ExerciseCreateDto dto) {
		int room = getRoom(dto);
		return ExerciseMapper.mapExercise(er.createExercise(dto.getIdOwner(), dto.getTitle(), dto.getIdDiscipline(), dto.getDescription(), dto.getTime(), dto.getDuration(), room).get());
	}
	
	private int getRoom(ExerciseCreateDto dto) {
		int room = dto.getRoom();
		
		if(room < 1) return findFreeRoom(dto.getTime(), Tools.addLocaltime(dto.getTime(), dto.getDuration()));
		else return room;
	}
	
	public int findFreeRoom(LocalDateTime from, LocalDateTime to) {
		return er.findFreeRoom(from, to).getId();
	}

	@Override
	public List<RoomDto> getAllRooms() {
		return ExerciseMapper.mapRooms(er.getAllRooms());
	}
	
//	@Override
//	public Exercise paginateExercises(ExerciseDto dto) {
//		return er.createExercise(dto.getOwnerId(), dto.getTitle(), dto.getDisciplineId(), dto.getInfo(), dto.getTime(), dto.getDuration(), dto.getRoom(), dto.getSigned()).get();
//	}
}
