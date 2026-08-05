import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./app/layouts/MainLayout";
import Home from "./app/routes/Home";
import About from "./app/routes/About";
import Products from "./app/routes/Products";
import Industries from "./app/routes/Industries";
import Contact from "./app/routes/Contact";
import NotFound from "./app/routes/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="industries" element={<Industries />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
