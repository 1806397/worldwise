import Map from "../components/Map";
import SideBar from "../components/SideBar";
import styles from "./AppLayout.module.css";
function AppLayout() {
  return (
    <div>
      {/* <AppNav />
      <p>App</p> */}
      <div className={styles.app}>
        <SideBar />
        <Map />
      </div>
    </div>
  );
}
export default AppLayout;
