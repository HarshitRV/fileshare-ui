import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { PasswordInput } from "../common/PasswordInput";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useUploadFileMutation } from "@/services/fileshare.service";
import { useAppDispatch } from "@/store/hooks";
import { setFileshareData } from "@/slice/fileshare";
import { useNavigate } from "react-router-dom";
import { isValidFileType } from "@/services/fileshare.service";
import {
	MAX_FILE_SIZE,
	UNSUPPORTED_FILE_FORMAT,
	FILE_TOO_LARGE,
} from "@/constants/constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { UploadIcon } from "lucide-react";

export default function UploadFile() {
	const navigate = useNavigate();
	const [uploadFile, { isLoading }] = useUploadFileMutation();
	const dispatch = useAppDispatch();

	const [showInputPassword, setShowInputPassword] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [file, setFile] = useState<File | null>(null);
	const [validationError, setValidationError] = useState<
		typeof UNSUPPORTED_FILE_FORMAT | typeof FILE_TOO_LARGE | null
	>(null);

	const handlePasswordProtectCheckChange = (checked: boolean) => {
		setShowInputPassword(checked);
	};
	const handleUploadFileChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files && event.target.files.length > 0) {
			console.log(event.target.files[0]);
			const { size, type } = event.target.files[0];

			if (!isValidFileType(type)) {
				setValidationError(UNSUPPORTED_FILE_FORMAT);
				return;
			}

			if (size > MAX_FILE_SIZE) {
				setValidationError(FILE_TOO_LARGE);
				return;
			}

			setValidationError(null);
			setFile(event.target.files[0]);
		} else {
			setValidationError(null);
			setFile(null);
		}
	};

	const handleFileUpload = () => {
		if (!file) return;
		else {
			const formData = new FormData();
			formData.append("file", file);
			if (password) formData.append("password", password);
			uploadFile(formData)
				.unwrap()
				.then((payload) => {
					dispatch(setFileshareData(payload));
					navigate("file");
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<Card className="max-w-md">
			<CardHeader>
				<CardTitle>Upload a file</CardTitle>
				<CardDescription>
					Supported formats: pdf, doc, docx, txt, zip, pptx, ppt, png, jpeg,
					jpg, gif, epub, odt, rtf
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{validationError ? (
					<div>
						<Alert variant="destructive">
							<ExclamationTriangleIcon className="h-4 w-4" />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>{validationError}</AlertDescription>
						</Alert>
					</div>
				) : (
					<></>
				)}
				<div className="space-y-2">
					<Label htmlFor="file">Add a file</Label>
					<Input
						id="file"
						type="file"
						onChange={handleUploadFileChange}
						required
					/>
				</div>
				{showInputPassword ? (
					<div className="space-y-2">
						<Label htmlFor="password">Add password</Label>
						<PasswordInput
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
				) : (
					<></>
				)}
				<div className="flex items-center gap-2">
					<Switch
						id="password-protect"
						onCheckedChange={handlePasswordProtectCheckChange}
					/>
					<Label htmlFor="password-protect">Password protect link</Label>
				</div>
			</CardContent>
			<CardFooter>
				<Button
					onClick={handleFileUpload}
					className="w-full flex gap-2"
					disabled={isLoading || !file}>
					{isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <UploadIcon width={16}/>}
					Upload
				</Button>
			</CardFooter>
		</Card>
	);
}
