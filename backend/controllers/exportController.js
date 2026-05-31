const { Parser } = require("json2csv");

const exportResults = async (req, res) => {
    try {
        const candidates = req.body;

        const fields = [
            "rank",
            "name",
            "email",
            "score",
            "level"
        ];

        const parser = new Parser({ fields });

        const csv = parser.parse(candidates);

        res.header("content-Type", "text/csv");
        res.attachment("candidate-results.csv");

        return res.send(csv);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

module.exports = { exportResults };