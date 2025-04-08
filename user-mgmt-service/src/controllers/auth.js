const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { email, password, name, academicId, role } = req.body;

    try {
        // Hash password
        const hash = await bcrypt.hash(password, 10);


        // Create user
        const user = await User.create({
            email,
            password: hash,
            name,
            academicId,
            role
        });
    
        // Sign JWT
        const token = jwt.sign({ id: user.id, role });

        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


        const token = jwt.sign({ id: user.id, role: user.role });

        console.log('User login');
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
};
