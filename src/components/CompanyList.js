import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const fetched = await JoblyApi.getCompanies();
        setCompanies(fetched);
      } catch (err) {
        console.error("Error loading companies", err);
      }
    }
    fetchCompanies();
  }, []);

  async function handleSearch(evt) {
    evt.preventDefault();
    try {
      const results = await JoblyApi.getCompanies(searchTerm);
      setCompanies(results);
    } catch (err) {
      console.error("Search failed", err);
    }
  }

  return (
    <div className="container">
      <h1 style={{ color: "#007bff" }}>Companies</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search companies..."
          onChange={evt => setSearchTerm(evt.target.value)}
        />
        <button>Search</button>
      </form>

      {companies.length ? (
        companies.map(c => (
          <CompanyCard
            key={c.handle}
            handle={c.handle}
            name={c.name}
            description={c.description}
            numEmployees={c.numEmployees}
          />
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default CompanyList;




