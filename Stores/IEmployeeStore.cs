using InterviewTest.Model;
using System.Collections.Generic;

namespace InterviewTest.Stores
{
  public interface IEmployeeStore
  {
    public List<ListEmployee> GetAllEmployees();
    public Employee GetEmployeeById(int id);
    public bool HandleEmployeeInput(Employee employee, bool isUpdating);
    public bool DeleteEmployee(int id);
  }
}
