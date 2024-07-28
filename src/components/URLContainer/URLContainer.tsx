import { CopyIcon } from "@radix-ui/react-icons";

import styles from "./URLContainer.module.css";
import { Button } from "../ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface URLContainerProps {
	url: string;
	type: "Short" | "Long";
}

export default function URLContainer({ url, type }: URLContainerProps) {
	const handleCopyToClipboard = async () => {
		await navigator.clipboard.writeText(url);
	};

	return (
		<div className="space-y-2">
			<h4>{type} URL</h4>
			{url ? (
				<div className={styles.linkContainer}>
					<a
						className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${styles.link}`}
						href={url}
						target="_blank"
						rel="noreferrer noopener">
						{url}
					</a>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									className={styles.copyIcon}
									onClick={handleCopyToClipboard}>
									<CopyIcon />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Copy to clipboard</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			) : (
				<p>Link not found</p>
			)}
		</div>
	);
}
