import { Route, Routes } from "react-router-dom";
import Services from "./pages/Services";
import Navigation from "./components/Navigation";
import Customer from "./pages/Customer";

function App() {
  return (
    <div className="container mx-auto ">
      <Navigation />
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </div>
  );
}

export default App;
