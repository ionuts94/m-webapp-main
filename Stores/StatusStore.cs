using InterviewTest.Model;
using Microsoft.Data.Sqlite;
using System.Collections.Generic;

namespace InterviewTest.Stores
{
  public class StatusStore : IStatusStore
  {
    private string connectionString;

    public StatusStore()
    {
      var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
      connectionString = connectionStringBuilder.ConnectionString;
    }

    public List<Status> GetStatuses()
    {
      var statuses = new List<Status>();

      using (var connection = new SqliteConnection(connectionString))
      {
        connection.Open();

        var queryCmd = connection.CreateCommand();
        queryCmd.CommandText = @"SELECT Id, Name FROM Status";
        using (var reader = queryCmd.ExecuteReader())
        {
          while (reader.Read())
          {
            statuses.Add(new Status
            {
              Id = reader.GetInt32(0),
              Name = reader.GetString(1),
            });
          }
        }
      }

      return statuses;
    }
  }
}
