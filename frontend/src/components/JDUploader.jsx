function JDUploader({ jobDescription, setJobDescription, setJdFile }) {

    const handleJDFile = (e) => {
        setJdFile(e.target.files[0]);
    }

    return (
        <div className="card">
            <h2>Job Description</h2>

            <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste Job Description here..."
            rows="10"
            ></textarea>

            <div className="jd-upload">
                <label className="upload-jd-btn">
                    Upload JD File

                    <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    hidden
                    onChange={handleJDFile}
                    />
                </label>
            </div>
        </div>
    );
}

export default JDUploader;