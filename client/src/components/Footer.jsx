const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto shadow-lg">
      <div className="container">
        <p className="mb-2 fw-semibold">
          &copy; 2026 Student Management System. All Rights Reserved.
        </p>

        <p className="mb-2">
          Developed by <span className="fw-bold">Pratik Kokane</span>
        </p>

        <p className="mb-0">
          Built with{" "}
          <span className="fw-bold">React.js</span> &bull;{" "}
          <span className="fw-bold">Node.js</span> &bull;{" "}
          <span className="fw-bold">Express.js</span> &bull;{" "}
          <span className="fw-bold">MongoDB</span> &bull;{" "}
          <span className="fw-bold">Mongoose</span> &bull;{" "}
          <span className="fw-bold">Bootstrap 5</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;