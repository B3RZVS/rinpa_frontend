import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { UserProvider } from "./user/contexts/userContext/UserProvider";
import { ToasterProvider } from "./shared/contexts/toasterContext/ToasterProvider";
import AppShell from "./AppShell";
import LoginPage from "./user/pages/Login/LoginPage";
import ScrollToTop from "./shared/components/ScrollToTop/ScrollToTop";
import Unauthorized from "./shared/components/Unauthorized/Unauthorized";
import BotonDescarga from "./shared/components/BotonDescarga/BotonDescaga";

const App: React.FC = () => {
  return (
    <Router>
      <ToasterProvider>
        <UserProvider>
          <div>
            <BotonDescarga />
            <ScrollToTop />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/*" element={<AppShell />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
          </div>
        </UserProvider>
      </ToasterProvider>
    </Router>
  );
};

export default App;
