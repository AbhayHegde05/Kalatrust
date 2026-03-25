import React from 'react';

const About = () => {
  const leadership = [
    { name: 'Prasanna Parameshwara Hegde', role: 'President' },
    { name: 'Gautam R Hegde', role: 'Secretary' },
    { name: 'Ganapati V Hegde', role: 'Member' },
    { name: 'M P Hegde', role: 'Member' },
    { name: 'Bhuvaneshwari Hegde', role: 'Member' },
    { name: 'Gangadhara Nayak', role: 'Member' },
    { name: 'Purushottama Hegde', role: 'Member' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-deep-terracotta mb-4">About Saraswathi Kala Trust</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded on September 9, 2022, by Mr. Prasanna Parameshwara Hegde, we are dedicated to preserving and promoting India's rich cultural heritage.
          </p>
        </div>

        {/* Mission Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card">
            <h2 className="text-3xl font-serif text-deep-terracotta mb-6">Art & Culture Preservation</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Promoting Yakshagana, Folk Arts, and Music for future generations</li>
              <li>• Organizing accessible cultural programs in rural and urban areas</li>
              <li>• Teaching traditional arts to children and youth</li>
              <li>• Supporting emerging artists through festivals and mentorship</li>
              <li>• Honoring master artists and recognizing new talent</li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-3xl font-serif text-deep-terracotta mb-6">Holistic Development</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Integrating yoga, meditation, and wellness with cultural practice</li>
              <li>• Environmental conservation and sustainability initiatives</li>
              <li>• Supporting elderly and orphaned community members</li>
              <li>• Promoting organic farming and traditional livestock care</li>
              <li>• Organizing workshops for arts and sustainable agriculture</li>
            </ul>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gold/20">
          <h2 className="text-4xl font-serif text-center text-deep-terracotta mb-12">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((member, index) => (
              <div key={index} className="text-center p-6 bg-cream rounded-lg border border-terracotta/20">
                <div className="w-20 h-20 bg-terracotta rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-cream font-bold">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-serif text-deep-terracotta mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;