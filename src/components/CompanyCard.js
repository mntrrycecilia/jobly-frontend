import React from "react";
import { Link } from "react-router-dom";

function CompanyCard({ handle, name, description, numEmployees }) {
  return (
    <div className="container" style={{ marginBottom: "1.5rem" }}>
      <h3 style={{ color: "#007bff", marginBottom: "0.5rem" }}>{name}</h3>
      <p style={{ marginBottom: "0.5rem" }}>{description}</p>
      <p style={{ fontStyle: "italic", color: "#6c757d" }}>
        {numEmployees ? `${numEmployees} employees` : "Employee count unknown"}
      </p>
      <Link to={`/companies/${handle}`}>
        <button>View Company</button>
      </Link>
    </div>
  );
}

export default CompanyCard;





