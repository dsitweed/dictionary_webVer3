import React from "react";
import TraCuu from "../../pages/TraCuu";
import ThemSua from "../../pages/ThemSua";
import KiemTra from "../../pages/KiemTra";
import BieuDo from "../../pages/BieuDo";
import Result from "../../pages/Result";

import "./Header.css";

import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
} from "react-router-dom";

export default function Header() {
    return (
        <Router>
            <div className="linkContainer">
                <Link to="/" className="link"> Home</Link>
                <Link to="/add-new-word" className="link">Add new word</Link>
                <Link to="/do-exam" className="link">Do exam</Link>
                <Link to="/graph" className="link">Graph</Link>
                <Link to="/get-results" className="link"> Result</Link>
            </div>
          <div>
              <Routes>
                <Route path="/" element={<TraCuu />} />
                <Route path="/add-new-word" element={<ThemSua />} />
                <Route path="/do-exam" element={<KiemTra /> } />
                <Route path="/graph" element={<BieuDo />} />
                <Route path="/get-results" element={<Result />} />
            </Routes>
          </div>
        </Router>
    );
}