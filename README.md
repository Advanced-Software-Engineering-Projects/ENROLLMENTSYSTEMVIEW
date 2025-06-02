### 🌐 Frontend Setup ###

1. Open a terminal in VSCode IDE and navigate to the frontend folder:
   bash
   cd client
   

2. Install frontend dependencies:
   bash
   npm install
   

3. Start the development server:
   npm run dev
   

4. The React app will open in the browser at:
   
   http://localhost:5173
   

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

#### ✅ React JS (Frontend)
- npm (comes with react js)
- Required npm packages (installed via `npm install`):
  - `axios`
  - `react-router-dom`
  - `tailwindcss` (if styling is used)
  - `@mui/material` (optional UI frameworks)


---

## 6. ✅ Testing Details

### 🧪 Unit Testing
- Framework: xUnit
- Test Target: GradeService.cs, EnrollmentController.cs
- Tools Used: xUnit, Moq, Visual Studio Test Explorer

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
