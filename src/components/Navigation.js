import styles from "./Navigation.module.css";

function Navigation({ onNavigate }) {
  return (
    <nav className={styles.Nav}>
      <a
        href="/"
        onClick={onNavigate.bind(null, -1)}
        title="previous"
        dangerouslySetInnerHTML={{ __html: "&laquo;" }}
      />
      <a
        href="/"
        onClick={onNavigate.bind(null, +1)}
        title="next"
        dangerouslySetInnerHTML={{ __html: "&raquo;" }}
      />
    </nav>
  );
}

export default Navigation;
