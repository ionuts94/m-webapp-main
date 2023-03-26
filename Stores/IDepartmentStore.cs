using InterviewTest.Model;
using System.Collections.Generic;

namespace InterviewTest.Stores
{
  public interface IDepartmentStore
  {
    public List<Department> GetAllDepartments();
    public Department GetDepartment(int id);
    public void UpdateDepartment(Department department);
  }
}
