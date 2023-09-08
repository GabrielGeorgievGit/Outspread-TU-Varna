package bg.tuvarna.outspread.tools;

import static org.junit.Assert.assertTrue;

import java.time.LocalDateTime;
import java.time.LocalTime;

import org.junit.jupiter.api.Test;

import bg.tuvarna.outspread.service.tools.Tools;

public class ToolsTest {
	
	@Test
	public void testAddLocalTime() {
		LocalDateTime datetime = LocalDateTime.of(2023, 10, 8, 13, 20);
		LocalTime time = LocalTime.of(2, 30);
		
		assertTrue(Tools.addLocaltime(datetime, time).isEqual(LocalDateTime.of(2023, 10, 8, 15, 50)));
	}
}
