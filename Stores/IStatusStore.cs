using InterviewTest.Model;
using System.Collections.Generic;

namespace InterviewTest.Stores
{
  public interface IStatusStore
  {
    public List<Status> GetStatuses();
  }
}
