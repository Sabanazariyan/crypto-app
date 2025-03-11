import styles from "./Layout.module.css";
function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
        <p>React.js Full Course</p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by Saba with ❤️</p>
      </footer>
    </>
  );
}

export default Layout;
