import "../styles/header.css";
function Header({ onClearAll }) {
  return (
    <div className="header">

      <div className="logo">
        Resume Screener
      </div>

      <button className="clear-btn"
      onClick={() => {
        const confirmed = window.confirm("Clear all uploaded data?");

        if (confirmed) {
          onClearAll();
        }
      }}
      >
        Clear All
      </button>

    </div>
  );
}

export default Header;