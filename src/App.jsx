import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button, Drawer } from "flowbite-react";
import Home from "./components/Home/Home";
import Country from "./components/Country/Country";

function App() {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Router>
      <div className="max-w-[900px] mx-auto">
        <header className="flex justify-between items-center py-4">
          <Link to="/" className="text-lg font-bold">
            Logo
          </Link>
          <Button onClick={() => setDrawerOpen(true)}>Tanlanganlar</Button>
        </header>

        <Drawer show={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Drawer.Header>Tanlanganlar</Drawer.Header>
          <Drawer.Body>
            {selectedCountries.length > 0 ? (
              <ul>
                {selectedCountries.map((country, index) => (
                  <li key={index} className="my-2">
                    {country.name.common}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Hech qanday davlat tanlanmagan.</p>
            )}
          </Drawer.Body>
        </Drawer>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                selectedCountries={selectedCountries}
                setSelectedCountries={setSelectedCountries}
              />
            }
          />
          <Route path="/country/:name" element={<Country />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
