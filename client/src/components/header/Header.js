import React from "react";
import Test from "./Test";
import TraCuu from "../../pages/TraCuu";
import ThemSua from "../../pages/ThemSua";
import KiemTra from "../../pages/KiemTra";
import BieuDo from "../../pages/BieuDo";

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
            <Link to="/home" className="link"> Home</Link>
            <Link to="/tracuu" className="link">Tra cứu/ Sửa</Link>
            <Link to="/themsua" className="link">Thêm từ mới</Link>
            <Link to="/kiemtra" className="link">Kiểm tra</Link>
            <Link to="/bieudo" className="link">Biểu đồ</Link>
          <div>
              <Routes>
                <Route path="/home" element={<Test />} />
                <Route path="/tracuu" element={<TraCuu />} />
                <Route path="/themsua" element={<ThemSua />} />
                <Route path="/kiemtra" element={<KiemTra /> } />
                <Route path="/bieudo" element={<BieuDo />} />
            </Routes>
          </div>
        </Router>
    );
}