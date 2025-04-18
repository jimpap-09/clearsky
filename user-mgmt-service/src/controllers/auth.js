const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { id, email, password, role } = req.body;
    
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
            role
        });
    

        res.status(201).json({ message: 'User created', user: { id: user.id, email, role } });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        console.log('User login');
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
};
