import argon2 from 'argon2';
import validator from 'validator';
import User from '../models/User.js';

// register user
const registerUser = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    username,
    fullName,
    password,
    phone,
    level = 'free',
    tagLine = 'New User',
    pictureId,
    lastOnline,
  } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid Email.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // hash the password using argon2
    const hashedPassword = await argon2.hash(password);

    const newUser = new User({
      email,
      firstName,
      lastName,
      username,
      fullName,
      password: hashedPassword,
      phone,
      level,
      tagLine,
      pictureId,
      lastOnline,
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export default registerUser;
