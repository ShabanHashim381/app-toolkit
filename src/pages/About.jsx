import React from "react";

function About() {
  return (
    <div
      className="w-full  bg-cover bg-center py-14 px-4 flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1710162734135-8dc148f53abe?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        height: "600px",
      }}
    >
      <div className="max-w-4xl bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-12 space-y-8 border border-gray-200">
        <h1 className="text-5xl text-center font-serif text-gray-900 tracking-wide">
          <span className="text-cyan-600 italic drop-shadow-sm">About</span>
        </h1>
        <p className="text-lg leading-relaxed text-gray-800 font-light text-justify font-sans">
          <strong className="font-semibold text-blue-600">
            🧰 App -{" "}
            <span className="underline decoration-cyan-400">Toolkit</span>
          </strong>{" "}
          is a thoughtfully crafted collection of tools, libraries, and
          utilities designed to empower developers and streamline app
          development. Rather than starting from scratch, a toolkit provides a
          curated foundation—complete with responsive layouts, reusable
          components, efficient state management, and intuitive routing.
        </p>
        <p className="text-lg leading-relaxed text-gray-800 font-light text-justify font-sans">
          By leveraging a well-designed app toolkit, developers save valuable
          time on boilerplate setup, enabling them to focus on crafting rich,
          engaging user experiences. It ensures code consistency, improves
          scalability, and promotes best practices across teams. For instance,
          in a React ecosystem, this could include essentials like a Sidebar,
          Navbar, Footer, global Context providers, and seamless animations
          powered by Framer Motion.
        </p>
        <p className="text-lg leading-relaxed text-gray-800 font-light text-justify font-sans">
          Whether building a dashboard, a productivity suite, or an e-commerce
          platform, an App Toolkit serves as both a launchpad and a long-term
          structure—simplifying your workflow and reinforcing a strong design
          system.
        </p>
      </div>
    </div>
  );
}

export default About;
