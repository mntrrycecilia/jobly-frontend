import React, { useContext } from "react";
import JoblyApi from "../api";
import UserContext from "../UserContext";

function JobCard({ id, title, salary, equity }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  // Log current user for debugging
  console.log("currentUser:", JSON.stringify(currentUser, null, 2));

  // Check if this job is already applied to
  const hasApplied = currentUser?.applications?.includes(Number(id));

  console.log("Checking if user has applied to job ID:", id);
  console.log("User's applications:", currentUser?.applications);
  console.log("hasApplied result:", hasApplied);


  async function handleApply() {
    try {
      console.log("Applying to job ID:", id);
      await JoblyApi.applyToJob(currentUser.username, id);
      // Update the global user context with the new application
      setCurrentUser(user => ({
        ...user,
        applications: [...user.applications, id]
      }));
    } catch (err) {
      console.error("Failed to apply:", err);
    }
  }

  return (
    <div className="JobCard container">
  <h5>{title}</h5>
  <p><strong>Salary:</strong> {salary ? `$${salary.toLocaleString()}` : "N/A"}</p>
  <p><strong>Equity:</strong> {equity || "N/A"}</p>

  {hasApplied ? (
    <button disabled>Applied</button>
  ) : (
    <button onClick={handleApply}>Apply</button>
  )}
</div>
  );
}

export default JobCard;


