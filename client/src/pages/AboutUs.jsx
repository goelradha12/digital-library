import React from 'react';
import { Linkedin, Github } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';
const AboutUs = () => {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center px-6 py-12">
        {/* Background pattern */}
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: "url('/bookshelf-pattern.svg')",
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
            The <b>Digital Library Management System (DLMS)</b> is designed to revolutionize how
            students, faculty, and administrators access and manage knowledge. Centralized, secure,
            and user-friendly.
          </p>
        </header>

        {/* Objectives Section */}
        <section className="relative max-w-6xl w-full mb-12 z-10">
          <h2 className="text-2xl font-semibold text-[#A56F6E] mb-6 text-center">Objectives</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Centralised Information',
                desc: 'Store e-books, research papers, and multimedia content securely.',
              },
              {
                title: 'Remote Access',
                desc: 'Access resources anytime, anywhere using desktop or mobile.',
              },
              {
                title: 'User Roles',
                desc: 'Secure login with specific permissions for students, faculty, and admins.',
              },
              {
                title: 'Analytics',
                desc: 'Track popular books, user activity, and generate usage reports.',
              },
            ].map((obj, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg shadow-[#A56F6E]/30 p-6 hover:shadow-[#A56F6E]/50 transition"
              >
                <h3 className="text-lg font-semibold text-[#A56F6E] mb-2">{obj.title}</h3>
                <p className="text-gray-600 text-sm">{obj.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Future Enhancements */}
        <section className="relative max-w-6xl w-full mb-12 z-10">
          <h2 className="text-2xl font-semibold text-[#A56F6E] mb-6 text-center">
            Future Enhancements
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'AI Recommendations',
                desc: 'Personalized book suggestions based on user history.',
              },
              {
                title: 'Accessibility',
                desc: 'Text-to-speech, adjustable fonts, high-contrast themes.',
              },
              {
                title: 'Gamification',
                desc: 'Badges, leaderboards, and achievements to motivate users.',
              },
              {
                title: 'AI Chatbot',
                desc: 'Virtual assistant to help users find resources and answer queries.',
              },
            ].map((enhance, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg shadow-[#A56F6E]/30 p-6 hover:shadow-[#A56F6E]/50 transition"
              >
                <h3 className="text-lg font-semibold text-[#A56F6E] mb-2">{enhance.title}</h3>
                <p className="text-gray-600 text-sm">{enhance.desc}</p>
              </div>
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
                role: 'Full-stack Developer',
                linkedin: 'https://www.linkedin.com/in/goyalradha123/',
                github: 'https://github.com/radha-goyal',
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
                github: 'https://github.com/shivangi-gupta',
              },
              {
                name: 'Ankit Kumar',
                role: 'Frontend Developer',
                linkedin: 'https://www.linkedin.com/in/ankitkumarazm/',
                github: 'https://github.com/ankit-kumar',
              },
            ].map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg shadow-[#A56F6E]/30 p-6 flex flex-col items-center space-y-4 hover:shadow-[#A56F6E]/50 transition transform hover:scale-105"
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
                    className="hover:text-[#A56F6E]"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-800"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="relative max-w-6xl w-full mb-12 z-10 text-center">
          <h2 className="text-2xl font-semibold text-[#A56F6E] mb-6">Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Node.js', 'Express', 'MongoDB', 'Analytics & AI'].map((tech, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl px-4 py-2 shadow-lg shadow-[#A56F6E]/30 hover:shadow-[#A56F6E]/50 transition"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
