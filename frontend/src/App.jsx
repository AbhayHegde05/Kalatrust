import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Events from './pages/Events.jsx';
import EventDetails from './pages/EventDetails.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/admin/Login.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import EventForm from './pages/admin/EventForm.jsx';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Login Route */}
          <Route path="/admin" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="event/new" element={<EventForm />} />
            <Route path="event/edit/:id" element={<EventForm />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;