// src/components/CompanyDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCard from "./JobCard";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const res = await JoblyApi.getCompany(handle);
        setCompany(res);
      } catch (err) {
        console.error("Error loading company:", err);
      }
    }

    fetchCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="CompanyDetail">
      <h2>{company.name}</h2>
      <p>{company.description}</p>

      <h3>Jobs at {company.name}</h3>
      {company.jobs.length ? (
        company.jobs.map(job => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
          />
        ))
      ) : (
        <p>No jobs listed.</p>
      )}
    </div>
  );
}

export default CompanyDetail;


