import Root from "./routes/Root/Root";
import { createHashRouter, RouterProvider } from "react-router-dom";
import UploadFile from "./components/UploadFile/UploadFile";
import { Link } from "react-router-dom";
import FileLink from "./components/FileLink/FileLink";

const router = createHashRouter([
	{
		path: "/",
		element: (
			<h1>
				<Link to={"app"}>Go to app</Link>
			</h1>
		),
	},
	{
		path: "app",
		element: <Root />,
		children: [
			{
				index: true,
				element: <UploadFile />,
			},
			{
				path: "file",
				element: <FileLink />,
			},
		],
	},
]);
function App() {
	return <RouterProvider router={router} />;
}

export default App;
