import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./routes/Home";
import About from "./routes/About";
import Products from "./routes/Products";
import Industries from "./routes/Industries";
import Contact from "./routes/Contact";
import NotFound from "./routes/NotFound";
import AdminLogin from "./routes/admin/AdminLogin";
import AdminDashboard from "./routes/admin/AdminDashboard";
import AdminMessages from "./routes/admin/AdminMessages";
import ProtectedRoute from "../components/admin/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="industries" element={<Industries />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Routes - No Layout */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <AdminMessages />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
