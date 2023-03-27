using InterviewTest.Model;
using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;

namespace InterviewTest.Stores
{
  public class EmployeeStore : IEmployeeStore
  {
    private string connectionString;

    public EmployeeStore()
    {
      var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
      connectionString = connectionStringBuilder.ConnectionString;
    }

    public List<ListEmployee> GetAllEmployees()
    {
      var employees = new List<ListEmployee>();

      using (var connection = new SqliteConnection(connectionString))
      {
        connection.Open();

        var queryCmd = connection.CreateCommand();
        queryCmd.CommandText = @"SELECT Employees.Id, Employees.Name, Employees.Value, Departments.Name AS department_name, Departments.Location, Status.Name AS status_name, Employees.Photo FROM Employees INNER JOIN Departments ON Employees.Department = Departments.Id INNER JOIN Status ON Employees.Status = Status.Id";

        using (var reader = queryCmd.ExecuteReader())
        {
          while (reader.Read())
          {
            employees.Add(new ListEmployee
            {
              Id = reader.GetInt32(0),
              Name = reader.GetString(1),
              Value = reader.GetInt32(2),
              Department = reader.GetString(3),
              Location = reader.GetString(4),
              Status = reader.GetString(5),
              Photo = reader.GetString(6)
            });
          }
        }
      }

      return employees;
    }

    public Employee GetEmployeeById(int id)
    {
      Employee employee = null;

      using (var connection = new SqliteConnection(connectionString))
      {
        connection.Open();

        var queryCmd = connection.CreateCommand();
        queryCmd.CommandText = @"SELECT Id, Name, Value, Department, Status, Photo FROM Employees WHERE Id = @id";
        queryCmd.Parameters.AddWithValue("@id", id);

        using (var reader = queryCmd.ExecuteReader())
        {
          if (reader.Read())
          {
            employee = new Employee
            {
              Id = reader.GetInt32(0),
              Name = reader.GetString(1),
              Value = reader.GetInt32(2),
              Department = reader.GetInt32(3),
              Status = reader.GetInt32(4),
              Photo = reader.GetString(5)
            };
          }
        }
      }

      return employee;
    }

    public bool DeleteEmployee(int id)
    {
      using (var connection = new SqliteConnection(connectionString))
      {
        connection.Open();

        var queryCmd = connection.CreateCommand();
        queryCmd.CommandText = @"DELETE FROM Employees WHERE Id=@i";
        queryCmd.Parameters.AddWithValue("@i", id);
        queryCmd.ExecuteNonQuery();
      }
      return true;
    }

    public bool HandleEmployeeInput(Employee employee, bool isUpdating)
    {
      using (var connection = new SqliteConnection(connectionString))
      {
        connection.Open();

        var queryCmd = connection.CreateCommand();
        if (isUpdating)
        {
          queryCmd.CommandText = @"UPDATE Employees SET Name = @n, Value = @v, Department = @d, Status = @s, Photo = @p WHERE Id = @id";
          queryCmd.Parameters.AddWithValue("@id", employee.Id);
        }
        else
        {
          queryCmd.CommandText = @"INSERT INTO Employees(Name, Value, Department, Status, Photo) VALUES(@n, @v, @d, @s, @p)";
        }

        try
        {
          queryCmd.Parameters.AddWithValue("@n", employee.Name);
          queryCmd.Parameters.AddWithValue("@v", employee.Value);
          queryCmd.Parameters.AddWithValue("@d", Convert.ToInt32(employee.Department));
          queryCmd.Parameters.AddWithValue("@s", Convert.ToInt32(employee.Status));
          queryCmd.Parameters.AddWithValue("@p", employee.Photo);
          queryCmd.ExecuteNonQuery();
          return true;
        }
        catch (System.Exception ex)
        {
          Console.WriteLine(ex);
          return false;
        }
      }
    }

  }
}
