import Navbar from "@/components/Navbar/Navbar";
import styles from "./Root.module.css";
import { Outlet } from "react-router-dom";

export default function Root() {
	return (
		<div className={styles.app}>
			<header>
				<Navbar />
			</header>
			<main className={styles.main}>
				<Outlet />
			</main>
			<footer>&#169; HarshitRV {new Date().getFullYear()}</footer>
		</div>
	);
}
