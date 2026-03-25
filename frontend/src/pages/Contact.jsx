import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const leadership = [
    {
      name: 'Prasanna Parameshwara Hegde',
      role: 'President',
      phone: '+91 94807 46537'
    },
    {
      name: 'Gautam R Hegde',
      role: 'Secretary',
      phone: '+91 94812 84793'
    }
  ];

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-deep-terracotta mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our leadership team or support our cultural initiatives through donations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Leadership Contact */}
          <div className="card">
            <h2 className="text-3xl font-serif text-deep-terracotta mb-8">Leadership Team</h2>
            <div className="space-y-6">
              {leadership.map((member, index) => (
                <div key={index} className="flex items-center p-4 bg-cream rounded-lg border border-terracotta/20">
                  <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center mr-4">
                    <span className="text-cream font-bold text-lg">{member.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-deep-terracotta">{member.name}</h3>
                    <p className="text-gray-600 mb-1">{member.role}</p>
                    <a
                      href={`tel:${member.phone}`}
                      className="text-terracotta hover:text-deep-terracotta font-semibold transition-colors"
                    >
                      📞 {member.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bank Details */}
          <div className="card">
            <h2 className="text-3xl font-serif text-deep-terracotta mb-8">Support Our Mission</h2>
            <div className="bg-gold/10 p-6 rounded-lg border border-gold/30">
              <h3 className="text-xl font-serif text-deep-terracotta mb-4">Bank Transfer Details</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-semibold">Bank Name:</span>
                  <span>[Bank Name]</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Account Number:</span>
                  <span>[Account Number]</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">IFSC Code:</span>
                  <span>[IFSC Code]</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Account Holder:</span>
                  <span>Saraswathi Kala Trust</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-terracotta/10 rounded-lg">
                <p className="text-sm text-gray-600">
                  💝 Your generous donations help preserve Karnataka's rich cultural heritage and support upcoming generations of artists.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Contact Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gold/20 text-center">
          <h2 className="text-3xl font-serif text-deep-terracotta mb-6">Get Involved</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Whether you're an artist, patron, or cultural enthusiast, we welcome your participation in our mission to preserve and promote traditional arts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@saraswathikalatrust.org"
              className="btn-primary"
            >
              ✉️ Send us an Email
            </a>
            <Link to="/events" className="border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-cream font-semibold py-3 px-8 rounded-lg transition-all duration-300">
              🎭 Join Our Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;