function ResumeUploader({ files, setFiles }) {

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));

        e.target.value = null;
    };

    return (
        <div className="card">
            <h2>Upload Resumes</h2>

            <label className="upload-box">
                <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                hidden
                />
                <p>Drag & Drop resumes here</p> 
                <span>or click to browse</span> 
            </label>

            {files.length > 0 && (
                <div className="file-list">
                    {files.map((file, index) => (
                        <div key={index} className="file-item">
                            {file.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ResumeUploader;