// routes/contactRoutes.js
module.exports = (app, { Contact, User }) => {
    // Create a new contact for a user
    app.post('/contacts', async(req, res) => {
        try {
            const { userId, contactNumber, contactName } = req.body;

            // Check if the user exists
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Create a new contact
            const newContact = await Contact.create({
                userId,
                contactNumber,
                contactName,
            });

            return res.status(201).json(newContact);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Get all contacts for a user
    app.get('/contacts/:userId', async(req, res) => {
        try {
            const userId = req.params.userId;

            // Check if the user exists
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Get all contacts for the user
            const contacts = await Contact.findAll({ where: { userId } });

            return res.status(200).json(contacts);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Search for a contact by phone number in the global database
    app.get('/contacts/search/:phoneNumber', async(req, res) => {
        try {
            const phoneNumber = req.params.phoneNumber;

            // Search for contacts with the given phone number
            const contacts = await Contact.findAll({ where: { contactNumber: phoneNumber } });

            return res.status(200).json(contacts);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};