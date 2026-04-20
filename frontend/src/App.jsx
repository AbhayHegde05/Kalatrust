import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Loader from './components/Loader.jsx';

// Lazy load all page components for code splitting
const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Events = lazy(() => import('./pages/Events.jsx'));
const EventDetails = lazy(() => import('./pages/EventDetails.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Login = lazy(() => import('./pages/admin/Login.jsx'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.jsx'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'));
const EventForm = lazy(() => import('./pages/admin/Eventform.jsx'));

// Preload critical routes
const preloadHome = () => {
  const HomeComponent = import('./pages/Home.jsx');
  return HomeComponent;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:slug" element={<EventDetails />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin Login Route */}
              <Route path="/admin/login" element={<Login />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="event/new" element={<EventForm />} />
                <Route path="event/edit/:id" element={<EventForm />} />
              </Route>
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;