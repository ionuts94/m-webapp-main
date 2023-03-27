using InterviewTest.Model;
using InterviewTest.Stores;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace InterviewTest.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class StatusesController : ControllerBase
  {
    private readonly IStatusStore store;

    public StatusesController(IStatusStore store)
    {
      this.store = store;
    }

    [HttpGet]
    public List<Status> Get()
    {
      return store.GetStatuses();
    }
  }
}
