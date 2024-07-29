import { useGetApiStatusQuery } from "@/services/fileshare.service";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { ServerCrash } from "lucide-react";

import styles from "./InitializeApp.module.css";

export default function InitializeApp() {
	const [initialText, setInitialText] = useState<string>(
		"Initializing App....."
	);

	const { isFetching, isSuccess, isError } = useGetApiStatusQuery();
	const navigate = useNavigate();

	if (isSuccess) {
		navigate("/app");
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setInitialText((prevText) => {
				if (prevText.endsWith(".....")) {
					return "Initializing App.";
				} else {
					return prevText + ".";
				}
			});
		}, 500);

		return () => clearInterval(interval);
	}, []);

	return (
		<main className={styles.main}>
			{isFetching && (
				<div className="space-y-2">
					<h1 className="text-2xl">{initialText}</h1>
					<div className={styles.loaderContainer}>
						<Box sx={{ width: "100%" }}>
							<LinearProgress />
						</Box>
					</div>
				</div>
			)}
			{isError && (
				<div className={styles.error}>
					<h1 className="text-2xl">Server seems to not responding</h1>
					<ServerCrash
						width={30}
						color="red"
					/>
				</div>
			)}
		</main>
	);
}
