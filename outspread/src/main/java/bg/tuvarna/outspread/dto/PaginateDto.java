package bg.tuvarna.outspread.dto;

public class PaginateDto {
	private int page;
	private int limit;
	private String keywords;
	
	
	public PaginateDto(int page, int limit, String keywords) {
		super();
		this.page = page;
		this.limit = limit;
		this.keywords = keywords;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public String getKeywords() {
		return keywords;
	}
	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}
	
	
}
