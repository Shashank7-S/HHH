// Here spam routing is Covered
module.exports = (app, { SpamReport, User }) => {
    // Report a number as spam
    app.post('/spam-reports', async(req, res) => {
        try {
            const { reporterId, reportedNumber } = req.body;

            // Check if the user exists
            const reporter = await User.findByPk(reporterId);
            if (!reporter) {
                return res.status(404).json({ error: 'Reporter not found' });
            }

            // Report the number as spam
            const newReport = await SpamReport.create({
                reporterId,
                reportedNumber,
            });

            return res.status(201).json(newReport);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Get all spam reports for a user
    app.get('/spam-reports/:reporterId', async(req, res) => {
        try {
            const reporterId = req.params.reporterId;

            // Check if the user exists
            const reporter = await User.findByPk(reporterId);
            if (!reporter) {
                return res.status(404).json({ error: 'Reporter not found' });
            }

            // Get all spam reports for the user
            const spamReports = await SpamReport.findAll({ where: { reporterId } });

            return res.status(200).json(spamReports);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};