import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import CompanyRegister from "./pages/Company/CompanyRegister";
import DashBoard from "./pages/Company/DashBoard";
import Package from "./pages/Company/Package";
import Employee from "./pages/Company/Employee";

function App() {
  const comp = JSON.parse(localStorage.getItem("comp"));

  const Validation = (component) => {
    return comp ? component : <CompanyRegister />;
  };
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/org/:id" element={<CompanyRegister />} />
      <Route
        path="/orgDetails/:id"
        element={comp ? <DashBoard /> : <CompanyRegister />}
      />
      <Route
        path="/package/:action/:id"
        element={comp ? <Package /> : <CompanyRegister />}
      />
      <Route
        path="/employees/:action/:id"
        element={comp ? <Employee /> : <CompanyRegister />}
      />
    </Routes>
  );
}

export default App;
