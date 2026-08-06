import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./app/layouts/MainLayout";
import Home from "./app/routes/Home";
import About from "./app/routes/About";
import Products from "./app/routes/Products";
import Industries from "./app/routes/Industries";
import Contact from "./app/routes/Contact";
import NotFound from "./app/routes/NotFound";
import AdminLogin from "./app/routes/admin/AdminLogin";
import AdminDashboard from "./app/routes/admin/AdminDashboard";
import AdminMessages from "./app/routes/admin/AdminMessages";
import ProtectedRoute from "./app/routes/admin/ProtectedRoute";

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
