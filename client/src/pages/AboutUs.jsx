import React from "react";
import { Linkedin, Github } from "lucide-react";
import Footer from "../components/Footer";
const AboutUs = () => {
  return (<div>
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200 min-h-screen py-12 px-6">
      {/* Hero Section */}
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent  bg-gradient-to-r from-blue-500 via-purple-500 to-purple-900 bg-clip-text">
          Digital Library Management System
        </h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          The <b>Digital Library Management System (DLMS)</b> is designed to
          revolutionize how students, faculty, and administrators access and
          manage knowledge. Centralized, secure, and user-friendly.
        </p>
      </header>

      {/* Objectives Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-400 mb-6 text-center">
          Objectives
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Centralised Information",
              desc: "Store e-books, research papers, and multimedia content securely.",
            },
            {
              title: "Remote Access",
              desc: "Access resources anytime, anywhere using desktop or mobile.",
            },
            {
              title: "User Roles",
              desc: "Secure login with specific permissions for students, faculty, and admins.",
            },
            {
              title: "Analytics",
              desc: "Track popular books, user activity, and generate usage reports.",
            },
          ].map((obj, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-lg hover:shadow-blue-500/20 transition"
            >
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                {obj.title}
              </h3>
              <p className="text-gray-400 text-sm">{obj.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Future Enhancements */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-400 mb-6 text-center">
          Future Enhancements
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "AI Recommendations",
              desc: "Personalized book suggestions based on user history.",
            },
            {
              title: "Accessibility",
              desc: "Text-to-speech, adjustable fonts, high-contrast themes.",
            },
            {
              title: "Gamification",
              desc: "Badges, leaderboards, and achievements to motivate users.",
            },
            {
              title: "AI Chatbot",
              desc: "Virtual assistant to help users find resources and answer queries.",
            },
          ].map((enhance, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-lg hover:shadow-purple-500/20 transition"
            >
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                {enhance.title}
              </h3>
              <p className="text-gray-400 text-sm">{enhance.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-400 mb-6 text-center">
          Team Members
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              name: "Surbhi Kumari",
              role: "Frontend Developer",
              linkedin: "https://www.linkedin.com/in/surbhi-kumari-194046316/",
              github: "https://github.com/surbhi-kumari",
            },
            {
              name: "Radha Goyal",
              role: "Full-stack Developer",
              linkedin: "https://www.linkedin.com/in/goyalradha123/",
              github: "https://github.com/radha-goyal",
            },
            {
              name: "Akriti Sharma",
              role: "Database Engineer",
              linkedin: "https://www.linkedin.com/in/akriti0424/",
              github: "https://github.com/akriti-sharma",
            },
            {
              name: "Hariom Patidar",
              role: "UI/UX Designer",
              linkedin: "https://www.linkedin.com/in/hariom-patidar-985b04320/",
              github: "https://github.com/hariom-patidar",
            },
            {
              name: "Shivangi Gupta",
              role: "Frontend Developer",
              linkedin:
                "https://www.linkedin.com/in/shivangi-gupta-nitbhopal/",
              github: "https://github.com/shivangi-gupta",
            },
            {
              name: "Ankit Kumar",
              role: "Frontend Developer",
              linkedin: "https://www.linkedin.com/in/ankitkumarazm/",
              github: "https://github.com/ankit-kumar",
            },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-blue-500/20 transition transform hover:scale-105"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-blue-300">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-400">{member.role}</p>
                <div className="flex space-x-4 text-gray-400">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-400 mb-6 text-center">
          Technology Stack
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {["React", "Node.js", "Express", "MongoDB", "Analytics & AI"].map(
            (tech, i) => (
              <div
                key={i}
                className="bg-white/5 px-4 py-2 rounded-lg shadow hover:shadow-blue-400/20 transition"
              >
                {tech}
              </div>
            )
          )}
        </div>
      </section>

    </div>
      <Footer />
    </div>



  );
};

export default AboutUs;
