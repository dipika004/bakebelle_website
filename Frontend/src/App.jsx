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
      <PageWithNavbar />
    </Router>
  );
};

const PageWithNavbar = () => {
  const location = useLocation();

  // Check if the current route is for admin or customer
  const isAdmin = location.pathname.startsWith('/dipika-2004');

  return (
    <>
      {isAdmin ? <AdminNavbar /> : <Navbar />} {/* Conditionally render Navbar */}
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/offerings/:slug" element={<OfferingPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/know-yourself" element={<KnowYourself />} />

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />

        {/* Admin Routes */}
        <Route path="/dipika-2004/login" element={<AdminLogin />} />
        <Route path="/dipika-2004" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/dipika-2004/offerings" element={<ProtectedRoute><AdminOfferingPage /></ProtectedRoute>} />
        <Route path="/dipika-2004/offerings/:slug" element={<ProtectedRoute><AdminOfferingPage /></ProtectedRoute>} />
        <Route path="/dipika-2004/offerings/:slug/add" element={<ProtectedRoute><AddOffering /></ProtectedRoute>} />
        <Route path="/dipika-2004/offerings/:slug/update" element={<ProtectedRoute><AddOffering /></ProtectedRoute>} />
        <Route path="/dipika-2004/view-banner" element={<ProtectedRoute><BannerManagement /></ProtectedRoute>} />

        {/* Product Routes */}
        <Route path="/dipika-2004/products" element={<ProtectedRoute><AdminProductPage /></ProtectedRoute>} />
        <Route path="/dipika-2004/product/:id" element={<ProtectedRoute><AdminProductPage /></ProtectedRoute>} />
        <Route path="/dipika-2004/product/add" element={<ProtectedRoute><AdminProductPage /></ProtectedRoute>} />
        <Route path="/dipika-2004/product/:id/update" element={<ProtectedRoute><EditProductPage /></ProtectedRoute>} />
        <Route path="/dipika-2004/product/:id/delete" element={<ProtectedRoute><AdminProductPage /></ProtectedRoute>} />

        {/* Other Admin Routes */}
        <Route path="/dipika-2004/banner-management" element={<ProtectedRoute><BannerManagement /></ProtectedRoute>} />
        <Route path="/dipika-2004/view-videos" element={<ProtectedRoute><ViewVideos /></ProtectedRoute>} />
        <Route path="/dipika-2004/videos/edit/:id" element={<ProtectedRoute><EditVideo /></ProtectedRoute>} />
        <Route path="/dipika-2004/send-message" element={<ProtectedRoute><SendMessage /></ProtectedRoute>} />



        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </>
  );
};

export default App;
