import styles from "./Navigation.module.css";

function Navigation({ onNavigate }) {
  return (
    <nav className={styles.Nav}>
      <a href="/" onClick={onNavigate.bind(null, -1)} title="previous">
        Back
      </a>
      <a href="/" onClick={onNavigate.bind(null, +1)} title="next">
        Next
      </a>
    </nav>
  );
}

export default Navigation;
