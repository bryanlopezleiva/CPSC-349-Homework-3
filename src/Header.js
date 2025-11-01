import "./Styles.css";

export default function Header({
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
}) {
  return (
    <div>
      <div className="header">
        <h1 className="header-title">Movie Explorer</h1>
      </div>
      <div className="actions">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for a movie..."
        />
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="option1">Sort By</option>
          <option value="option2">Release Date (Asc)</option>
          <option value="option3">Release Date (Desc)</option>
          <option value="option4">Rating (Asc)</option>
          <option value="option5">Rating (Desc)</option>
        </select>
      </div>
    </div>
  );
}
