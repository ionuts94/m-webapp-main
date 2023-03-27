using InterviewTest.Model;
using InterviewTest.Stores;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace InterviewTest.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class EmployeesController : ControllerBase
  {
    private readonly IEmployeeStore store;

    public EmployeesController(IEmployeeStore store)
    {
      this.store = store;
    }

    [HttpGet]
    public List<ListEmployee> Get()
    {
      return store.GetAllEmployees();
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      var employee = store.GetEmployeeById(id);
      if (employee == null)
      {
        return NotFound();
      }
      return Ok(employee);
    }

    [HttpPost("/add-employee")]
    public bool AddEmployee([FromBody] Employee employee)
    {
      var employeeAdded = store.HandleEmployeeInput(employee, false);
      return employeeAdded;
    }

    [HttpPut("/update-employee")]
    public bool UpdateEmployee([FromBody] Employee employee)
    {
      var employeeUpdated = store.HandleEmployeeInput(employee, true);
      return employeeUpdated;
    }

    [HttpDelete("/delete-employee")]
    public bool DeleteEmployee([FromBody] Employee employee)
    {
      var done = store.DeleteEmployee(employee.Id);
      return done;
    }
  }
}
