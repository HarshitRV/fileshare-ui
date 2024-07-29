import Root from "./routes/Root/Root";
import { createHashRouter, RouterProvider } from "react-router-dom";
import UploadFile from "./components/UploadFile/UploadFile";
import FileLink from "./components/FileLink/FileLink";
import InitializeApp from "./components/InitializeApp/InitializeApp";

const router = createHashRouter([
	{
		path: "/",
		element: <InitializeApp />,
	},
	{
		path: "app",
		element: <Root />,
		errorElement: <div>Something went wrong</div>,
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
