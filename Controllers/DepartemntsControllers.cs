using InterviewTest.Model;
using InterviewTest.Stores;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace InterviewTest.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class DepartmentsController : ControllerBase
  {
    private readonly IDepartmentStore store;

    public DepartmentsController(IDepartmentStore store)
    {
      this.store = store;
    }

    [HttpGet]
    public List<Department> Get()
    {
      return store.GetAllDepartments();
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      var department = store.GetDepartment(id);
      if (department == null)
      {
        return NotFound();
      }
      return Ok(department);
    }

    // TODO: Update & Add
  }
}
