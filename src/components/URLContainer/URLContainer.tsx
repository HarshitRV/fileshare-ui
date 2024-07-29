import { useState } from "react";
import { CopyIcon, CheckIcon, ServerCrash } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import styles from "./URLContainer.module.css";

interface URLContainerProps {
	url: string;
	type: "Short" | "Long";
}

export default function URLContainer({ url, type }: URLContainerProps) {
	const [toggleIcon, setToggleIcon] = useState<boolean>(false);
	const handleCopyToClipboard = async () => {
		await navigator.clipboard.writeText(url);
		setToggleIcon(true);
		setTimeout(() => setToggleIcon(false), 3000);
	};

	return (
		<div className="space-y-2">
			<h4>{type} URL</h4>
			{url ? (
				<div
					className={`rounded-md border border-input p-2 ${styles.urlContainer}`}>
					<div>
						<a
							className={styles.link}
							href={url}
							target="_blank"
							rel="noreferrer noopener">
							{url}
						</a>
					</div>
					<div className={`${styles.copyIconContainer}`}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									{toggleIcon ? (
										<CheckIcon
											width={18}
											color="#39FF14"
										/>
									) : (
										<CopyIcon
											className={styles.copyIcon}
											width={18}
											onClick={handleCopyToClipboard}
										/>
									)}
								</TooltipTrigger>
								<TooltipContent>
									<p>Copy to clipboard</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			) : (
				<p className="flex gap-2">
					404 Not Found{" "}
					<span>
						<ServerCrash
							width={16}
							color="#FF3131"
						/>
					</span>
				</p>
			)}
		</div>
	);
}
