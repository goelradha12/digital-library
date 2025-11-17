import React, { useRef } from 'react';
import { Linkedin, Github, BookOpen, ClipboardList, Clock, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Header from '../components/Header';

const AboutUs = () => {
  const clickSound = useRef(null);

  // Play click sound on click
  const handleClick = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    }
  };

  return (
    <>
      {/* Sound Effect */}
      <audio ref={clickSound} src="/click.mp3" preload="auto"></audio>

      <Header />

      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center px-6 py-12 relative">
        {/* Background pattern */}
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: "url('/library-pattern.svg')",
            backgroundSize: '100px',
            opacity: 0.1,
            zIndex: 0,
          }}
        ></div>

        {/* Hero Section */}
        <header className="relative max-w-3xl text-center mb-12 bg-white rounded-2xl shadow-lg shadow-[#A56F6E]/30 p-8 w-full z-10 mt-15">
          <h1 className="text-3xl md:text-4xl font-serif text-[#A56F6E] mb-4">
            Digital Library Management System
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            The <b>Digital Library Management System (DLMS)</b> is a web-based platform that allows
            users to read and download <b>digital books and learning materials</b> anytime and
            anywhere. It provides an easy interface to browse, search, and access e-books stored in
            a <b>MySQL database</b>, promoting paperless and accessible learning.
          </p>
        </header>

        {/* Why Choose Our Library Section */}
        <section className="relative max-w-6xl w-full mb-16 z-10">
          <h2 className="text-2xl font-semibold text-[#A56F6E] mb-8 text-center">
            Why Choose Our Library
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <BookOpen className="w-12 h-12 text-[#A56F6E]" />,
                title: 'Extensive Collection',
                desc: 'Access thousands of books across various genres and topics.',
              },
              {
                icon: <ClipboardList className="w-12 h-12 text-[#A56F6E]" />,
                title: 'Easy Management',
                desc: 'Simple admin tools to add,categorize and delete book data.',
              },
              {
                icon: <Clock className="w-12 h-12 text-[#A56F6E]" />,
                title: '24/7 Access',
                desc: 'Browse and manage your books anytime, anywhere.',
              },
              {
                icon: <Search className="w-12 h-12 text-[#A56F6E]" />,
                title: 'Smart Search',
                desc: 'Find your next read with our search system.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                onClick={handleClick}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6, ease: 'easeOut' }}
                whileHover={{
                  scale: 1.05,
                  rotate: [-1, 1, 0],
                  transition: { duration: 0.3 },
                }}
                className="bg-white rounded-2xl shadow-lg shadow-[#A56F6E]/30 p-8 flex flex-col items-center text-center hover:shadow-[#A56F6E]/50 cursor-pointer transform transition"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-[#A56F6E] mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Key Features Section */}
        <section className="relative max-w-6xl w-full mb-12 z-10">
          <h2 className="text-2xl font-semibold text-[#A56F6E] mb-6 text-center">Key Features</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'E-Book Access', desc: 'Users can read and download e-books directly.' },
              { title: 'Book Management', desc: 'Admins can upload, edit, or remove books.' },
              {
                title: 'Search Functionality',
                desc: 'Quickly find books by title, author, or category.',
              },
              {
                title: 'Reading Interface',
                desc: 'Simple, user-friendly layout for comfortable reading.',
              },
              { title: 'Download Option', desc: 'Download e-books for offline reading anytime.' },
              {
                title: 'Category Sorting',
                desc: 'Books are organized by subject and genre for easy browsing.',
              },
              { title: 'Responsive Design', desc: 'Works smoothly on all screen sizes.' },
              { title: 'Database Integration', desc: 'MySQL securely stores all e-book data.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                onClick={handleClick}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-lg shadow-[#A56F6E]/30 p-6 hover:shadow-[#A56F6E]/50 transition cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-[#A56F6E] mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="relative max-w-6xl w-full mb-12 z-10">
          <h2 className="text-2xl font-semibold text-[#A56F6E] mb-6 text-center">Team Members</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Surbhi Kumari',
                role: 'Frontend Developer',
                linkedin: 'https://www.linkedin.com/in/surbhi-kumari-194046316/',
                github: 'https://github.com/surbhi-kumari',
              },
              {
                name: 'Radha Goyal',
                role: 'Full Stack Developer',
                linkedin: 'https://www.linkedin.com/in/goyalradha123/',
                github: 'https://github.com/goelradha12',
              },
              {
                name: 'Akriti Sharma',
                role: 'Database Engineer',
                linkedin: 'https://www.linkedin.com/in/akriti0424/',
                github: 'https://github.com/akriti-sharma',
              },
              {
                name: 'Hariom Patidar',
                role: 'UI/UX Designer',
                linkedin: 'https://www.linkedin.com/in/hariom-patidar-985b04320/',
                github: 'https://github.com/hariom-patidar',
              },
              {
                name: 'Shivangi Gupta',
                role: 'Frontend Developer',
                linkedin: 'https://www.linkedin.com/in/shivangi-gupta-nitbhopal/',
                github: 'https://github.com/shivangi-guptaa',
              },
              {
                name: 'Ankit Kumar',
                role: 'Frontend Developer',
                linkedin: 'https://www.linkedin.com/in/ankitkumarazm/',
                github: 'https://github.com/ankit-kumar',
              },
            ].map((member, i) => (
              <motion.div
                key={i}
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg shadow-[#A56F6E]/30 p-6 flex flex-col items-center space-y-4 hover:shadow-[#A56F6E]/50 transition cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-[#A56F6E] flex items-center justify-center text-white font-bold text-xl">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-[#A56F6E]">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
                <div className="flex space-x-4 text-gray-500">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick();
                    }}
                    className="hover:text-[#A56F6E]"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick();
                    }}
                    className="hover:text-gray-800"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="relative max-w-6xl w-full mb-12 z-10 text-center">
          <h2 className="text-2xl font-semibold text-[#A56F6E] mb-6">Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'].map((tech, i) => (
              <motion.div
                key={i}
                onClick={handleClick}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl px-4 py-2 shadow-lg shadow-[#A56F6E]/30 hover:shadow-[#A56F6E]/50 transition cursor-pointer"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;