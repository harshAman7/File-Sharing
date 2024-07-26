import { useState, useRef } from "react";
import "./App.css";
import { uploadFile } from "./service/api";

const App = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const fileInputRef = useRef();

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Prepare file for upload
      const data = new FormData();
      data.append("file", selectedFile);

      try {
        // Upload the file and get the permanent URL
        const response = await uploadFile(data);
        console.log(response.path); // Assume response.path contains the permanent URL
        setFile(selectedFile);
        setResult(response.path); // Set the permanent URL
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="text-center mb-4">Upload an Image</h1>
        <form className="d-flex flex-column align-items-center">
          <div className="form-group text-center">
            <button type="button" className="btn btn-primary" onClick={triggerFileInput}>
              Upload
            </button>
            <input
              type="file"
              className="d-none"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </form>

        {result && (
          <div className="mt-3 text-center">
            <p>
              Image URL:{" "}
              <a
                href={result}
                target="_blank"
                rel="noopener noreferrer"
              >
                {result}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
