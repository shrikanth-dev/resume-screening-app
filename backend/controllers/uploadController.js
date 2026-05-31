const uploadResumes = async (
  req,
  res
) => {

  try {

    const uploadedFiles = req.files;

    if (
      !uploadedFiles ||
      uploadedFiles.length === 0
    ) {
      return res.status(400).json({
        message: "No files uploaded"
      });
    }

    const fileData = uploadedFiles.map(
      (file) => ({
        filename: file.filename,
        originalName: file.originalname,
        size: file.size
      })
    );

    res.status(200).json({
      message: "Files uploaded successfully",
      files: fileData
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  uploadResumes
};