import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from "./CUSTOMER/components/Navbar/Navbar.jsx"; // Customer Navbar
import AdminNavbar from "./ADMIN/components/Navbar/AdminNavbar.jsx"; // Admin Navbar

import AdminPanel from './ADMIN/pages/AdminPanel.jsx'; // Admin Panel page
import OfferingPage from './CUSTOMER/pages/OfferingPage.jsx'; // Customer Offering page
import AddOffering from './ADMIN/pages/AddOffering.jsx'; // Admin Add Offering page 
import ProductPage from './CUSTOMER/pages/ProductPage.jsx'; // Customer Product Page
import AdminProductPage from './ADMIN/pages/AdminProductPage.jsx'; // Admin Product Page
import AdminOfferingPage from './ADMIN/pages/AdminOfferingPage.jsx'; // Admin Offering Page
import EditProductPage from './ADMIN/pages/EditProductPage.jsx'; // Admin Edit Product Page
import Home from './CUSTOMER/pages/Home.jsx';
import BannerManagement from './ADMIN/pages/BannerManagement.jsx'; // Admin Banner Management page
import ViewVideos from './ADMIN/pages/ViewVideos.jsx';
import EditVideo from './ADMIN/pages/EditVideo.jsx'; // Admin Edit Video page
import SendMessage from './ADMIN/pages/SendMessage.jsx';
import AboutUs from './CUSTOMER/pages/AboutUs.jsx';
import Blogs from './CUSTOMER/pages/Blogs.jsx';
import Contact from './CUSTOMER/pages/Contact.jsx'; // Customer Contact page
import KnowYourself from './CUSTOMER/pages/KnowYourself.jsx';
import AdminLogin from './ADMIN/pages/AdminLogin.jsx';
import ProtectedRoute from './ADMIN/components/ProtectedRoute.jsx'; // Admin Protected Route
import NotFound from './CUSTOMER/pages/NotFound.jsx';

const App = () => {
  return (
    <Router>
      <MainRouter />
    </Router>
  );
};

// This component chooses between Admin and Customer routing based on path
const MainRouter = () => {
  const location = useLocation();

  // Check if path starts with /dipika-2004 (admin routes)
  const isAdmin = location.pathname.startsWith('/dipika-2004');

  return isAdmin ? <AdminRoutes /> : <CustomerRoutes />;
};

const CustomerRoutes = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/offerings/:slug" element={<OfferingPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/blog" element={<Blogs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/know-yourself" element={<KnowYourself />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const AdminRoutes = () => (
  <Router basename="/dipika-2004">
    <>
      <AdminNavbar />
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/offerings" element={<ProtectedRoute><AdminOfferingPage /></ProtectedRoute>} />
        <Route path="/offerings/:slug" element={<ProtectedRoute><AdminOfferingPage /></ProtectedRoute>} />
        <Route path="/offerings/:slug/add" element={<ProtectedRoute><AddOffering /></ProtectedRoute>} />
        <Route path="/offerings/:slug/update" element={<ProtectedRoute><AddOffering /></ProtectedRoute>} />
        <Route path="/view-banner" element={<ProtectedRoute><BannerManagement /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><AdminProductPage /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><AdminProductPage /></ProtectedRoute>} />
        <Route path="/product/add" element={<ProtectedRoute><AdminProductPage /></ProtectedRoute>} />
        <Route path="/product/:id/update" element={<ProtectedRoute><EditProductPage /></ProtectedRoute>} />
        <Route path="/product/:id/delete" element={<ProtectedRoute><AdminProductPage /></ProtectedRoute>} />
        <Route path="/banner-management" element={<ProtectedRoute><BannerManagement /></ProtectedRoute>} />
        <Route path="/view-videos" element={<ProtectedRoute><ViewVideos /></ProtectedRoute>} />
        <Route path="/videos/edit/:id" element={<ProtectedRoute><EditVideo /></ProtectedRoute>} />
        <Route path="/send-message" element={<ProtectedRoute><SendMessage /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  </Router>
);

export default App;
