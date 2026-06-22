import { useState, useEffect } from "react";
import StatsBar from "./components/StatsBar";
import JobForm from "./components/JobForm";
import JobCard from "./components/JobCard";
import { getJobs, addJob, updateJob, deleteJob } from "./api";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [fetchError, setFetchError] = useState("");

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const fetchJobs = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const response = await getJobs();
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setFetchError(
        "Could not connect to the server. Make sure the backend is running and reachable."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = async (formData) => {
    try {
      const response = await addJob(formData);
      setJobs([response.data, ...jobs]);
      showToast(`Added ${formData.company}`);
    } catch (error) {
      console.error("Failed to add job:", error);
      showToast("Failed to save job application.");
      throw error;
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await updateJob(id, { status: newStatus });
      setJobs(jobs.map((job) => (job._id === id ? response.data : job)));
      showToast(`Updated status to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update status:", error);
      showToast("Failed to update status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      await deleteJob(id);
      setJobs(jobs.filter((job) => job._id !== id));
      showToast("Application deleted");
    } catch (error) {
      console.error("Failed to delete job:", error);
      showToast("Failed to delete application.");
    }
  };

  const filteredJobs =
    filterStatus === "All" ? jobs : jobs.filter((job) => job.status === filterStatus);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div>
            <h1 className="app-title">Job Application Tracker</h1>
          </div>
        </div>
      </header>

      <main className="app-main">
        <StatsBar jobs={jobs} />

        <div className="layout">
          <aside className="sidebar">
            <JobForm onJobAdded={handleAddJob} />
          </aside>

          <section className="job-list-section">
            <div className="filter-tabs">
              {["All", "Applied", "Interview", "Offer", "Rejected"].map((status) => (
                <button
                  key={status}
                  className={`filter-tab ${filterStatus === status ? "active" : ""}`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>

            {fetchError ? (
              <div className="empty-state">
                <p>{fetchError}</p>
              </div>
            ) : loading ? (
              <p className="loading-text">Loading applications...</p>
            ) : filteredJobs.length === 0 ? (
              <div className="empty-state">
                <p>No applications found.</p>
                <small>Add your first job using the form on the left!</small>
              </div>
            ) : (
              <div className="job-list">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <div className={`toast ${toast.show ? "show" : ""}`}>
        <span>ℹ️</span> {toast.message}
      </div>
    </div>
  );
};

export default App;
