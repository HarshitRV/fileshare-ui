import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import URLContainer from "../URLContainer/URLContainer";
import { Button } from "../ui/button";
import { UploadIcon } from "lucide-react";

import styles from "./FileLink.module.css";

export default function FileLink() {
	const navigate = useNavigate();
	const { longurl, shorturl } = useAppSelector((state) => state.fileShare);

	return (
		<Card className={styles.card}>
			<CardHeader>
				<CardTitle>File Link</CardTitle>
				<CardDescription>Your cloud storage link.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<URLContainer
					url={longurl}
					type="Long"
				/>

				<URLContainer
					url={shorturl}
					type="Short"
				/>
			</CardContent>
			<CardFooter className={styles.cardFooter}>
				<div className="w-full">
					<Button
						className="w-full flex gap-2"
						variant="outline"
						onClick={() => navigate("/app")}>
						<UploadIcon width={16} />
						Upload another
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
