### 💻 Backend Setup (ASP.NET Core with Visual Studio)

1. **Open Solution File**  
   Open the file `ENROLLMENTSYSTEMBACKEND.sln` in **Visual Studio 2022 or newer**.

2. **Set Startup Project**  
   - In the Solution Explorer, right-click on `ENROLLMENTSYSTEMBACKEND` and select **Set as Startup Project**.

3. **Restore NuGet Packages**  
   - In **Tools > NuGet Package Manager > Manage NuGet Packages for Solution**, click **Restore**.
   - Or use the terminal:
     ```bash
     dotnet restore
     ```

4. **Configure Connection String**  
   - Open `appsettings.json`
   - Update the connection string under `ConnectionStrings:DefaultConnection` to match your SQL Server setup:
     ```json
     "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=EnrollmentSystemDb;Trusted_Connection=True;MultipleActiveResultSets=true"
     }
     ```
     > Replace `YOUR_SERVER_NAME` with `localhost`, `localhost\SQLEXPRESS`, or your actual SQL Server instance.

5. **Apply Database Migrations**  
   Open the **Package Manager Console** (`Tools > NuGet Package Manager > Package Manager Console`) and run:
   ```powershell
   Update-Database
   ```
   > This command applies all pending migrations and creates the database if it doesn’t exist.

6. **Run the Backend**  
   - Press `F5` or `Ctrl+F5` to start the backend.
   - A browser window will open with the **Swagger UI** to interact with your API.

---

### 🗄 Database Configuration (SQL Server)

- Ensure **SQL Server (LocalDB)** or **SQL Server Express** is installed and running.
- Confirm that `EnrollmentSystemDb` is created after running `Update-Database`.
- You can verify and manage the database using:
  - **SQL Server Management Studio (SSMS)**
  - **Azure Data Studio**

> 💡 Tip: The database schema and relationships are defined using **Entity Framework Core Code First Migrations**.

---

### 🌐 Frontend Setup 

1. Open a terminal in VSCode IDE and navigate to the frontend folder:
   ```bash
   cd client
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The React app will open in the browser at:
   ```
   http://localhost:3000
   ```

5. If needed, update the API endpoint in:
   - `client/src/api/config.js` (or wherever the base URL is configured)
   - Set it to `http://localhost:5000` or the actual backend URL.

---

### 📦 Required Dependencies

#### ✅ Visual Studio (.NET Backend)
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- Visual Studio 2022 (with ASP.NET and web development workload)
- NuGet packages used:
  - `Microsoft.EntityFrameworkCore`
  - `Microsoft.EntityFrameworkCore.SqlServer`
  - `Microsoft.EntityFrameworkCore.Tools`
  - `Swashbuckle.AspNetCore`
  - `BCrypt.Net-Next`
  - `Newtonsoft.Json`

#### ✅ Node.js (Frontend)
- [Node.js LTS](https://nodejs.org/en/download/)
- npm (comes with Node.js)
- Required npm packages (installed via `npm install`):
  - `axios`
  - `react-router-dom`
  - `tailwindcss` (if styling is used)
  - `@mui/material` or `bootstrap` (optional UI frameworks)


## 6. ✅ Testing Details

### 🧪 Unit Testing
- **Framework:** xUnit
- **Test Target:** GradeService.cs, EnrollmentController.cs
- **Tools Used:** xUnit, Moq, Visual Studio Test Explorer

### ✅ Executed Test Cases:
- `GetTranscriptAsync_ReturnsTranscript`
- `CalculateGPAAsync_ReturnsCorrectGpa`
- `GetProgramAuditAsync_EligibilityCheck`
- `GetGpaTrendAsync_ReturnsTrendData`

### 📊 Test Report:
All unit tests passed successfully with expected outputs.

### 🔍 Swagger API Testing:
- Manual testing for all endpoints via `https://localhost:5001/swagger`
- Verified:
  - `/api/grades/transcript/{id}`
  - `/api/grades/gpa/{id}`
  - `/api/grades/audit/{id}`
  - `/api/grades/gpa-trend/{id}`
