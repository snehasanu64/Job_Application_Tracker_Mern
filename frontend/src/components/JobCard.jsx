import { useState } from "react";
import { STATUS_COLORS } from "./StatsBar";

const JobCard = ({ job, onStatusChange, onDelete }) => {
  const [updating, setUpdating] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleStatusChange = async (e) => {
    setUpdating(true);
    await onStatusChange(job._id, e.target.value);
    setUpdating(false);
  };

  return (
    <div className="job-card">
      <div className="status-bar" style={{ backgroundColor: STATUS_COLORS[job.status] }} />

      <div className="card-body">
        <div className="card-header">
          <div>
            <h3 className="company-name">{job.company}</h3>
            <p className="role-name">{job.role}</p>
          </div>

          <span
            className="status-badge"
            style={{
              backgroundColor: STATUS_COLORS[job.status] + "22",
              color: STATUS_COLORS[job.status],
              border: `1px solid ${STATUS_COLORS[job.status]}44`,
            }}
          >
            {job.status}
          </span>
        </div>

        <div className="card-footer">
          <span className="date-applied">📅 {formatDate(job.dateApplied)}</span>

          <div className="card-actions">
            <select
              value={job.status}
              onChange={handleStatusChange}
              disabled={updating}
              className="status-select"
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Rejected</option>
              <option>Offer</option>
            </select>

            <button
              onClick={() => onDelete(job._id)}
              className="btn-delete"
              title="Delete this job"
            >
              🗑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
