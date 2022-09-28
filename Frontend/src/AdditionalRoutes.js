import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import DashboardWrapper from  "./pages/dashboard/dashboard";
import CanteenDashboard from "./pages/components/CanteenDashboard";
import AddCategory from "./pages/baseTable/addCategory";
import TotalOrder from "./pages/baseTable/TotalDetails";
import CancelledDetails from "./pages/baseTable/cancelledDetail";
import MenuItems from "./pages/components/MenuItem";

function AdditionalRoutes() {
  return (
    <>
      <Router>
        <DashboardWrapper>
          <Routes> 
            {/* Dashboard */}
            <Route path="/dashboard/canteen" element={<CanteenDashboard/>}/>
            <Route path="/dashboard/canteen/add-category" element={<AddCategory/>}/>
            <Route path="/dashboard/canteen/total-order" element={<TotalOrder/>}/>
            <Route path="/dashboard/canteen/cancelled-order" element={<CancelledDetails/>}/>
            <Route path="/dashboard/canteen/menu-book" element={<MenuItems/>}/>
          </Routes>
        </DashboardWrapper>
      </Router>
    </>
  );
}

export default AdditionalRoutes;