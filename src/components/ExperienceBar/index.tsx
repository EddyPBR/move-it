import "./styles.css";

export function ExperienceBar() {
  return (
    <header className="experience-bar">
      <span>0 xp</span>
      <div>
        <div style={{ width: "50%" }} />
        <span style={{ left: '50%' }}></span>
      </div>
      <span>600 px</span>
    </header>
  );
}

export default ExperienceBar;
