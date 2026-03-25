import React from 'react';
import { Link } from 'react-router-dom';
import bannerBackground from '../assets/background.png';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bannerBackground})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="hero-text mb-6">
            A Mirror to Indian Art & Culture
          </h1>
          <p className="text-xl md:text-2xl text-cream/90 mb-8 font-light">
            Preserving the timeless traditions of Yakshagana, Carnatic Music, and Folk Arts for generations to come
          </p>
          <Link to="/events" className="btn-primary inline-block">
            Explore Events
          </Link>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-center text-deep-terracotta mb-16">
            Our Cultural Pillars
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-2xl font-serif mb-4">Yakshagana</h3>
              <p className="text-gray-600">
                The dramatic dance-theatre tradition that brings ancient epics to life through vibrant costumes, music, and storytelling.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-2xl font-serif mb-4">Carnatic Music</h3>
              <p className="text-gray-600">
                Classical South Indian music tradition featuring intricate ragas, talas, and devotional compositions.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-6xl mb-4">🌿</div>
              <h3 className="text-2xl font-serif mb-4">Folk Arts</h3>
              <p className="text-gray-600">
                Rich tapestry of regional folk traditions, crafts, and performing arts that reflect local heritage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-deep-terracotta text-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-6">Join Our Cultural Journey</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the depth of Indian classical arts through our events, workshops, and community programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events" className="bg-gold hover:bg-yellow-500 text-deep-terracotta font-semibold py-3 px-8 rounded-lg transition-all duration-300">
              View Events
            </Link>
            <Link to="/contact" className="border-2 border-cream text-cream hover:bg-cream hover:text-deep-terracotta font-semibold py-3 px-8 rounded-lg transition-all duration-300">
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;