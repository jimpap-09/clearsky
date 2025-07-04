// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { id, email, password, role, name } = req.body;
    console.log("REGISTER REQUEST:", req.body); // 👈 Βλέπεις τι έφτασε πραγματικά

    try {
        // Hash password
        const hash = await bcrypt.hash(password, 10);

        if (!['STUDENT', 'INSTRUCTOR', 'ADMIN'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });  
        }
        // Create user
        const user = await User.create({
            id,
            email,
            passwordHash: hash,
            role,
            name
        });

        res.status(201).json({ message: 'User created', user: { id: user.id, email, role, name } });
    } catch (err) {
        console.error('Registration error:', err.message || err);
        res.status(500).json({ error: err.message || 'Registration failed' });
    }};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });

        console.log('User login');
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const result = await User.findAll({attributes: ['id', 'email', 'name']});
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({error: 'Failed to fetch user'});
    }
}

exports.getUsersByIds = async (req, res) => {
    try {
        const userIds = req.params.ids.split(',');
        const userData = await User.findAll({
            where: { id: userIds },
            attributes: ['id', 'name']
        });

        if (!userData || userData.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Στέλνεις όλο το array με τους χρήστες
        res.status(200).json(userData);

    } catch(err) {
        console.error('Error fetching user:', err.message);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}

exports.changePassword = async (req, res) => {
    const { id, newPassword, username } = req.body;

    if (!id || !newPassword || !username) {
        return res.status(400).json({ error: 'Missing id, username or password' });
    }

    try {
        const user = await User.findOne({
            where: {
                id: id,
                name: username
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);
        user.passwordHash = passwordHash;

        await user.save();

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Password change error:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};
