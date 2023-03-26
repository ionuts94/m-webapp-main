using InterviewTest.Stores;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace InterviewTest
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
      PrepareDB();
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllersWithViews();

      // In production, the React files will be served from this directory
      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "ClientApp/build";
      });

      // Inject employee store
      services.AddScoped<IEmployeeStore, EmployeeStore>();
      services.AddScoped<IDepartmentStore, DepartmentStore>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseStaticFiles();
      app.UseSpaStaticFiles();

      app.UseRouting();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllerRoute(
                  name: "default",
                  pattern: "{controller}/{action=Index}/{id?}");
      });

      app.UseSpa(spa =>
      {
        spa.Options.SourcePath = "ClientApp";

        if (env.IsDevelopment())
        {
          spa.UseReactDevelopmentServer(npmScript: "start");
        }
      });
    }

    private void PrepareDB()
    {
      var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
      using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
      {
        connection.Open();

        var delTableCmd = connection.CreateCommand();
        delTableCmd.CommandText = "DROP TABLE IF EXISTS Employees";
        delTableCmd.ExecuteNonQuery();

        var createTableCmd = connection.CreateCommand();
        createTableCmd.CommandText = "CREATE TABLE Employees (Id INTEGER, Name VARCHAR(50), Value INT, Department INTEGER NOT NULL, Status INTEGER NOT NULL, Photo VARCHAR(50), PRIMARY KEY(Id AUTOINCREMENT), FOREIGN KEY(Department) REFERENCES Departments(Id), FOREIGN KEY(Status) REFERENCES Status(Id))";
        createTableCmd.ExecuteNonQuery();

        var deleteDepartmentsTable = connection.CreateCommand();
        deleteDepartmentsTable.CommandText = "DROP TABLE IF EXISTS Departments";
        deleteDepartmentsTable.ExecuteNonQuery();

        var createDepartmentsTableCmd = connection.CreateCommand();
        createDepartmentsTableCmd.CommandText = "CREATE TABLE Departments(Id INTEGER NOT NULL, Name VARCHAR(50) NOT NULL, Location VARCHAR(50),	PRIMARY KEY(Id AUTOINCREMENT))";
        createDepartmentsTableCmd.ExecuteNonQuery();

        var deleteStatusTable = connection.CreateCommand();
        deleteStatusTable.CommandText = "DROP TABLE IF EXISTS Status";
        deleteStatusTable.ExecuteNonQuery();

        var createStatusTableCmd = connection.CreateCommand();
        createStatusTableCmd.CommandText = "CREATE TABLE Status(Id INTEGER NOT NULL, Name VARCHAR(50) NOT NULL,	PRIMARY KEY(Id AUTOINCREMENT))";
        createStatusTableCmd.ExecuteNonQuery();

        //Fill with data
        using (var statusTransaction = connection.BeginTransaction())
        {
          var insertCmd = connection.CreateCommand();
          insertCmd.CommandText = @"INSERT INTO Status(Name) VALUES
                        ('active'),
                        ('holiday'),
                        ('fired')";
          insertCmd.ExecuteNonQuery();
          statusTransaction.Commit();
        }

        using (var departmentsTransaction = connection.BeginTransaction())
        {
          var insertCmd = connection.CreateCommand();
          insertCmd.CommandText = @"INSERT INTO Departments(Name, Location) VALUES
                        ('IT', 'London'),
                        ('HR', 'Manchester'),
                        ('Sales', 'Brighton')";
          insertCmd.ExecuteNonQuery();
          departmentsTransaction.Commit();
        }

        using (var transaction = connection.BeginTransaction())
        {
          var insertCmd = connection.CreateCommand();
          insertCmd.CommandText = @"INSERT INTO Employees(Name, Value, Department, Status, Photo) VALUES
                        ('Ionut', 1557, 1, 1, 'https://media.licdn.com/dms/image/C4D03AQH3QSWeho29rQ/profile-displayphoto-shrink_800_800/0/1597879405852?e=1685577600&v=beta&t=PIn71bqofNpUq3AG5rPH6UWHehbNyKyymlQgU2V4PZw'),
                        ('Abul', 1357, 2, 1, ''),
                        ('Adolfo', 1224, 1, 1, ''),
                        ('Alexander', 2296, 1, 2, ''),
                        ('Amber', 1145, 1, 2, ''),
                        ('Amy', 4359, 1, 1, ''),
                        ('Andy', 1966, 1, 1, ''),
                        ('Anna', 4040, 1, 3, ''),
                        ('Antony', 449, 1, 2, ''),
                        ('Ashley', 8151, 1, 1, ''),
                        ('Borja', 9428, 1, 2, ''),
                        ('Cecilia', 2136, 1, 1, ''),
                        ('Christopher', 9035, 1, 1, ''),
                        ('Dan', 1475, 1, 1, ''),
                        ('Dario', 284, 1, 1, ''),
                        ('David', 948, 1, 1, ''),
                        ('Elike', 1860, 1, 1, ''),
                        ('Ella', 4549, 1, 1, ''),
                        ('Ellie', 5736, 1, 1, ''),
                        ('Elliot', 1020, 1, 1, ''),
                        ('Emily', 7658, 1, 1, ''),
                        ('Faye', 7399, 1, 1, ''),
                        ('Fern', 1422, 1, 1, ''),
                        ('Francisco', 5028, 1, 1, ''),
                        ('Frank', 3281, 1, 1, ''),
                        ('Gary', 9190, 1, 1, ''),
                        ('Germaine', 6437, 1, 1, ''),
                        ('Greg', 5929, 1, 1, ''),
                        ('Harvey', 8471, 1, 1, ''),
                        ('Helen', 963, 1, 1, ''),
                        ('Huzairi', 9491, 1, 1, ''),
                        ('Izmi', 8324, 1, 1, ''),
                        ('James', 6994, 1, 1, ''),
                        ('Jarek', 6581, 1, 1, ''),
                        ('Jim', 202, 1, 1, ''),
                        ('John', 261, 1, 1, ''),
                        ('Jose', 1605, 1, 1, ''),
                        ('Josef', 3714, 1, 1, ''),
                        ('Karthik', 4828, 1, 1, ''),
                        ('Katrin', 5393, 1, 1, ''),
                        ('Lee', 269, 1, 1, ''),
                        ('Luke', 5926, 1, 1, ''),
                        ('Madiha', 2329, 1, 1, ''),
                        ('Marc', 3651, 1, 1, ''),
                        ('Marina', 6903, 1, 1, ''),
                        ('Mark', 3368, 1, 1, ''),
                        ('Marzena', 7515, 1, 1, ''),
                        ('Mohamed', 1080, 1, 1, ''),
                        ('Nichole', 1221, 1, 1, ''),
                        ('Nikita', 8520, 1, 1, ''),
                        ('Oliver', 2868, 1, 1, ''),
                        ('Patryk', 1418, 1, 1, ''),
                        ('Paul', 4332, 1, 1, ''),
                        ('Ralph', 1581, 1, 1, ''),
                        ('Raymond', 7393, 1, 1, ''),
                        ('Roman', 4056, 1, 1, ''),
                        ('Ryan', 252, 1, 1, ''),
                        ('Sara', 2618, 1, 1, ''),
                        ('Sean', 691, 1, 1, ''),
                        ('Seb', 5395, 1, 1, ''),
                        ('Sergey', 8282, 1, 1, ''),
                        ('Shaheen', 3721, 1, 1, ''),
                        ('Sharni', 7737, 1, 1, ''),
                        ('Sinu', 3349, 1, 1, ''),
                        ('Stephen', 8105, 1, 1, ''),
                        ('Tim', 8386, 1, 1, ''),
                        ('Tina', 5133, 1, 1, ''),
                        ('Tom', 7553, 1, 1, ''),
                        ('Tony', 4432, 1, 1, ''),
                        ('Tracy', 1771, 1, 1, ''),
                        ('Tristan', 2030, 1, 1, ''),
                        ('Victor', 1046, 1, 1, ''),
                        ('Yury', 1854, 1, 1, '')";
          insertCmd.ExecuteNonQuery();
          transaction.Commit();
        }
      }
    }
  }
}
