const Footer = () => {
    return (
      <footer
        style={{ background: "#f8f9fa", padding: "1rem", textAlign: "center" }}
      >
        <p>
          &copy; {new Date().getFullYear()} Ecommerce Store. All rights reserved.
        </p>
        <div style={{ marginTop: "0.5rem" }}>
          <a
            href="/about"
            style={{ margin: "0 0.5rem", textDecoration: "none", color: "#333" }}
          >
            About Us
          </a>
          <a
            href="/contact"
            style={{ margin: "0 0.5rem", textDecoration: "none", color: "#333" }}
          >
            Contact
          </a>
          <a
            href="/privacy"
            style={{ margin: "0 0.5rem", textDecoration: "none", color: "#333" }}
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  