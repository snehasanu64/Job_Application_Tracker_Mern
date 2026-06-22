import { useState } from "react";

const JobForm = ({ onJobAdded }) => {
  const getTodayString = () => new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    dateApplied: getTodayString(),
    status: "Applied",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.company || !formData.role || !formData.dateApplied) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      await onJobAdded(formData);
      setFormData({
        company: "",
        role: "",
        dateApplied: getTodayString(),
        status: "Applied",
      });
    } catch (err) {
      setError("Failed to add job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2 className="form-title">Add Application</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Google"
            required
          />
        </div>

        <div className="form-group">
          <label>Role / Position</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            required
          />
        </div>

        <div className="form-group">
          <label>Date Applied</label>
          <input
            type="date"
            name="dateApplied"
            value={formData.dateApplied}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>
        </div>

        <button type="submit" className="btn-add" disabled={loading}>
          {loading ? "Adding..." : "+ Add Job"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
