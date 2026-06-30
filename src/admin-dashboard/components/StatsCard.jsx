const StatCard = ({ title, value, icon, color = "#00ED64", trend }) => (
  <div className="bg-[#0D2137] border border-[#1C3347] rounded-xl p-6 flex items-start justify-between">
    <div>
      <p className="text-[#89979B] text-xs font-semibold uppercase tracking-wider mb-2">
        {title}
      </p>
      <h3 className="text-white text-3xl font-bold">{value ?? "—"}</h3>
      {trend !== undefined && (
        <p className="text-xs mt-2" style={{ color: trend >= 0 ? "#00ED64" : "#EF4444" }}>
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% this month
        </p>
      )}
    </div>
    <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}18` }}>
      <span style={{ color }} className="text-xl">{icon}</span>
    </div>
  </div>
);

export default StatCard;