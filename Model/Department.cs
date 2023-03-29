namespace InterviewTest.Model
{
  public class Department
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Location { get; set; }
  }

  public class DepartmentWithData
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Location { get; set; }
    public int EmployeesCount { get; set; }
  }
}
