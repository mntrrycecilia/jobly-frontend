// src/components/JobList.js
import React, { useEffect, useState } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await JoblyApi.getJobs();
        setJobs(res);
      } catch (err) {
        console.error("Error loading jobs:", err);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div className="JobList">
      <h1>Job Listings</h1>
      {jobs.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          {jobs.map(job => {
            console.log("rendering JobCard with job:", job);
            return (
            <JobCard

              id={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity}
              companyName={job.companyName}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default JobList;

