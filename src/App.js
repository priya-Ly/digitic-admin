import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Home";
import Colorlist from "./pages/Colotlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Couponlist from "./pages/Couponlist";
import AddCoupon from "./pages/AddCoupon";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
import Homelist from "./pages/HomeEdit.js";
import Home from "./pages/Home";
import HomeEdit from "./pages/HomeEdit.js";
import HomeDelete from "./pages/HomeDelete.js";
import HomeAdd from "./pages/HomeAdd.js";
import About from "./pages/About.js";
import AboutAdd from "./pages/AboutAdd.js";
import AboutEdit from "./pages/AboutEdit.js";
import AboutDelete from "./pages/AboutDelete.js";
import MainAbout from "./pages/MainAbout.js";
import MainAboutAdd from "./pages/MainAboutAdd.js";
import MainAboutEdit from "./pages/MainAboutEdit.js";
import MainAboutDelete from "./pages/MainAboutDelete.js";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnq />} /> */}
          {/* <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog/:id" element={<Addblog />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category/:id" element={<Addblogcat />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<ViewOrder />} /> */}
          <Route path="home" element={<Home />} />
          <Route path="home/add/" element={<HomeAdd />} />
          <Route path="home/:id" element={<HomeEdit />} />
          <Route path="home/delete/:id" element={<HomeDelete />} />
          <Route path="about" element={<About />} />
          <Route path="about/add/" element={<AboutAdd />} />
          <Route path="about/delete/:id" element={<AboutDelete />} />
          <Route path="about/:id" element={<AboutEdit />} />
          <Route path="aboutus" element={<MainAbout />} />
          <Route path="aboutus/add/" element={<MainAboutAdd />} />
          <Route path="aboutus/:id" element={<MainAboutEdit />} />
          <Route path="aboutus/delete/:id" element={<MainAboutDelete />} />
          {/* <Route path="list-color" element={<Colorlist />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="color/:id" element={<Addcolor />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="category" element={<Addcat />} />
          <Route path="category/:id" element={<Addcat />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
