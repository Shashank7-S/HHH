// routes/userRoutes.js
const bcrypt = require('bcrypt');

module.exports = (app, { User }) => {
    // Register a new user
    app.post('/register', async(req, res) => {
        try {
            const { name, phoneNumber, password, email } = req.body;

            // Check if the phone number is already registered
            const existingUser = await User.findOne({ where: { phoneNumber } });
            if (existingUser) {
                return res.status(409).json({ error: 'Phone number already registered' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = await User.create({
                name,
                phoneNumber,
                password: hashedPassword,
                email,
            });

            return res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Login user
    app.post('/login', async(req, res) => {
        try {
            const { phoneNumber, password } = req.body;

            // Check if the user exists
            const user = await User.findOne({ where: { phoneNumber } });
            if (!user) {
                return res.status(401).json({ error: 'Invalid phone number or password' });
            }

            // Verify the password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid phone number or password' });
            }

            // Provide user details without the password
            const userWithoutPassword = {
                id: user.id,
                name: user.name,
                phoneNumber: user.phoneNumber,
                email: user.email,
            };

            return res.status(200).json(userWithoutPassword);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Get user details
    // app.get('/users/:userId', async(req, res) => {
    //     try {
    //         const userId = req.params.userId;

    //         // Check if the user exists
    //         const user = await User.findByPk(userId, {
    //             attributes: { exclude: ['password'] },
    //         });
    //         if (!user) {
    //             return res.status(404).json({ error: 'User not found' });
    //         }

    //         return res.status(200).json(user);
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // });

    const { Op } = require('sequelize');

    // Search by name
    app.get('/users/name/:userName', async(req, res) => {
        const userName = req.params.userName;

        try {
            const users = await User.findAll({
                where: {
                    name: {
                        [Op.like]: `${userName}%`, // Case-insensitive LIKE query
                    },
                },
                attributes: ['name', 'phoneNumber'],
            });

            return res.status(200).json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Search by phone number
    app.get('/users/number/:phoneNumber', async(req, res) => {
        const phoneNumber = req.params.phoneNumber;

        try {
            const users = await User.findAll({
                where: {
                    phone_number: {
                        [Sequelize.Op.iLike]: `${phoneNumber}%`, // Case-insensitive LIKE query
                    },
                },
                attributes: ['name', 'phoneNumber'],
            });

            return res.status(200).json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Get user by ID
    app.get('/users/:userId', async(req, res) => {
        try {
            const userId = req.params.userId;

            const user = await User.findByPk(userId, {
                attributes: { exclude: ['password'] },
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

};