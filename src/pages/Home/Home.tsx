import styles from "./Home.module.css";

const Home = () => {
  const userNombre = localStorage.getItem("nombreUser");
  console.log(localStorage.getItem("userNombre"));
  return (
    <div className={styles.contG}>
      <h1>Bienvenido {userNombre}!!</h1>
    </div>
  );
};

export default Home;
