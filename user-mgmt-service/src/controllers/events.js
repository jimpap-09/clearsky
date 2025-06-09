// controllers/importUsersController.js

const User = require('../models/User');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');

exports.handleEvent = async (req, res) => {
    const { type, data } = req.body;

    if (type === 'FETCH_USERS_BY_IDS') {
        try {
        const userIds = data.studentIds;
        const userData = await User.findAll({
            where: { id: userIds },
            attributes: ['id', 'name']
        });

        return res.status(200).json(userData);
        } catch (err) {
        console.error('FETCH_USERS_BY_IDS failed:', err.message);
        return res.status(500).json({ error: 'Failed to fetch users' });
        }
    }
    else {
        try {
            const usersToCreate = [];
            const { grades } = data;

            // Skip the header row
            for (let i = 3; i < grades.length; i++) {
                const row = grades[i];
                const studentId = row[0];
                const name = row[1];
                const email = row[2];
                if (!studentId || !email || !name) continue;

                const existingUser = await User.findByPk(studentId);
                if (!existingUser) {
                    const passwordHash = await bcrypt.hash('pass', 10);

                    usersToCreate.push({
                        id: studentId, // Assuming you're using studentId as the User ID
                        email,
                        passwordHash,
                        role: 'STUDENT',
                        name,
                    });
                }
            }

            // Bulk create users
            await User.bulkCreate(usersToCreate);
            console.log("Users created:", usersToCreate);
            res.status(200).json({ message: `${usersToCreate.length} users created.` });
        } catch (err) {
            console.error('User import error:', err);
            res.status(500).json({ error: 'Failed to create users from grades data.' });
        }
    }
};