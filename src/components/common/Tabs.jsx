export function Tabs({ tabs = [], active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button
          key={t}
          type="button"
          className={"tab" + (t === active ? " active" : "")}
          onClick={() => onChange && onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
