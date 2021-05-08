# KiPrendKoi
KiPrendKoi is an app that allows you to organize your events by defining who takes what.

## Features

- Create a new event with its list associated
- Define a list of categorised items for your friends to bring
- Share your list with all your friends

## Tech stack

KiPrendKoi uses a number of technologies/packages to work properly:

- ASP.NET (MVC architecture)
- C#
- EntityFramework
- Automapper
- Azure Web & Sql Server
- HTML/CSS 
- xUnit for unit testing

## Configuration

### Use our Azure SQL Server

To launch the project successfully with the right Azure SqlDatabase, please create a "creds.json" file with the following structure:
```sh
{
    "username": USERNAME,
    "password": PASSWORD
}
```

Then launch the WebApplication project with your Visual Studio.


### Use a local SQL Server

To do that, you can do a right click on the name of the database project in the solution explorer and press publish.
A window will appear, you need to select Browse and then enter your server name and the name you want to give to your database then press the button « ok » to proceed. 

Your database will be created in the server you gave. You need then to change the connection string in the file `WebApplication/DataAccess/EfModels/kiprendkoiContext.cs` and in the function named «  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) ». Replace the Connection String with this new one : `"Data Source=<YOUR_SERVER>;Initial Catalog=<YOUR_DATABASE>;Trusted_Connection=True;Integrated Security=SSPI;"` 
Define the WebApplication project as the starting project, you can run now.

## Website

KiPrendKoi is currently hosted on an Azure Webserver and available on the following link:
https://kiprendkoi.azurewebsites.net/
