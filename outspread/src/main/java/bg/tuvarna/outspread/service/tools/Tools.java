package bg.tuvarna.outspread.service.tools;

import java.time.LocalDateTime;
import java.time.LocalTime;

public class Tools {
	public static LocalDateTime addLocaltime(LocalDateTime dateTime, LocalTime time) {
		return dateTime.plusHours(time.getHour()).plusMinutes(time.getMinute());
	}
}
