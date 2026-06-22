const STATUS_COLORS = {
  Applied: "#3b82f6",
  Interview: "#f59e0b",
  Rejected: "#ef4444",
  Offer: "#22c55e",
};

const StatsBar = ({ jobs }) => {
  const counts = {
    Total: jobs.length,
    Applied: jobs.filter((j) => j.status === "Applied").length,
    Interview: jobs.filter((j) => j.status === "Interview").length,
    Offer: jobs.filter((j) => j.status === "Offer").length,
    Rejected: jobs.filter((j) => j.status === "Rejected").length,
  };

  const stats = [
    { label: "Total", value: counts.Total, color: "#6366f1" },
    { label: "Applied", value: counts.Applied, color: STATUS_COLORS.Applied },
    { label: "Interview", value: counts.Interview, color: STATUS_COLORS.Interview },
    { label: "Offer", value: counts.Offer, color: STATUS_COLORS.Offer },
    { label: "Rejected", value: counts.Rejected, color: STATUS_COLORS.Rejected },
  ];

  return (
    <div className="stats-bar">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-item">
          <span className="stat-value" style={{ color: stat.color }}>
            {stat.value}
          </span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
export { STATUS_COLORS };
