using InterviewTest.Model;
using Microsoft.Data.Sqlite;
using System.Collections.Generic;

namespace InterviewTest.Stores
{
  public class DepartmentStore : IDepartmentStore
  {
    private string connectionString;

    public DepartmentStore()
    {
      var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
      connectionString = connectionStringBuilder.ConnectionString;
    }

    public List<Department> GetAllDepartments()
    {
      var departments = new List<Department>();

      using (var connection = new SqliteConnection(connectionString))
      {
        connection.Open();

        var queryCmd = connection.CreateCommand();
        queryCmd.CommandText = @"SELECT Id, Name, Location FROM Departments";
        using (var reader = queryCmd.ExecuteReader())
        {
          while (reader.Read())
          {
            departments.Add(new Department
            {
              Id = reader.GetInt32(0),
              Name = reader.GetString(1),
              Location = reader.GetString(2),
            });
          }
        }
      }

      return departments;
    }

    public List<DepartmentWithData> GetDepartmentsWithData()
    {
      var departments = new List<DepartmentWithData>();

      using (var connection = new SqliteConnection(connectionString))
      {
        connection.Open();

        var queryCmd = connection.CreateCommand();
        queryCmd.CommandText = "SELECT Departments.Id, Departments.Name, Location, COUNT(Employees.Id) AS EmployeesCount FROM Departments LEFT JOIN Employees ON Departments.Id = Employees.Department GROUP BY Departments.Id";
        using (var reader = queryCmd.ExecuteReader())
        {
          while (reader.Read())
          {
            departments.Add(new DepartmentWithData
            {
              Id = reader.GetInt32(0),
              Name = reader.GetString(1),
              Location = reader.GetString(2),
              EmployeesCount = reader.GetInt32(3)
            });
          }
        }
      }

      return departments;
    }

    public Department GetDepartment(int id)
    {
      Department department = null;

      using (var connection = new SqliteConnection(connectionString))
      {
        connection.Open();

        var queryCmd = connection.CreateCommand();
        queryCmd.CommandText = @"SELECT Id, Name, Location FROM Departments WHERE Id = @id";
        queryCmd.Parameters.AddWithValue("@id", id);

        using (var reader = queryCmd.ExecuteReader())
        {
          if (reader.Read())
          {
            department = new Department
            {
              Id = reader.GetInt32(0),
              Name = reader.GetString(1),
              Location = reader.GetString(2)
            };
          }
        }
      }

      return department;
    }

    public void UpdateDepartment(Department department)
    {
      using (var connection = new SqliteConnection(connectionString))
      {
        connection.Open();

        var queryCmd = connection.CreateCommand();
        queryCmd.CommandText = @"UPDATE Employees SET Value=@v, Name=@n WHERE Id=@i";
        queryCmd.Parameters.AddWithValue("@i", department.Id);
        queryCmd.Parameters.AddWithValue("@n", department.Name);
        queryCmd.Parameters.AddWithValue("@v", department.Location);
        queryCmd.ExecuteNonQuery();
      }
    }
  }
}
