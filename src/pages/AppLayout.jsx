// import AppNav from "../components/AppNav";
import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";
function AppLayout() {
  return (
    <div>
      {/* <AppNav />
      <p>App</p> */}
      <div className={styles.app}>
        <SideBar />
      </div>
    </div>
  );
}
export default AppLayout;
