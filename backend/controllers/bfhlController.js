const handleBFHL = (req, res) => {
    try {
        const body = req.body || {};
        const { data } = body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input format"
            });
        }

        res.json({
            message: "API is working",
            received_data: data
        });

    } catch (error) {
        console.error(error);   // 👈 ADD THIS LINE

        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

module.exports = { handleBFHL };