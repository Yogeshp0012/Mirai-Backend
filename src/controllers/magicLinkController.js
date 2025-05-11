// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// // import sendEmail from '../utils/mailer.js';

// export const requestMagicLink = async (req, res) => {
//   const { email } = req.body;
//   if (!email) return res.status(400).json({ message: 'Email is required.' });

//   try {
//     const user = await User.findOne({ email });

//     // optional : adjust mechanism
//     // if (!user) {
//     //   user = new User({ email });
//     //   await user.save();
//     // }

//     // const token = jwt.sign(
//     //   { userId: user._id, email: user.email },
//     //   process.env.JWT_SECRET,
//     //   {
//     //     expiresIn: process.env.JWT_EXPIRES_IN || '15m', // adjust expiry window
//     //   },
//     // );

//     // const link = `${process.env.BASE_URL}/auth/verify-magic?token=${token}`;

//     // await sendEmail({
//     //   from: process.env.EMAIL_FROM,
//     //   to: email,
//     //   subject: 'Your Magic Sign-In Link',
//     //   html: `<p>Click to sign in: <a href="${link}">${link}</a></p>`, // todo: create an email template later
//     // });

//     res.json({ message: 'Magic link sent to your email address.' });
//   } catch (err) {
//     console.error('Error sending magic link:', err);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// };

// export const verifyMagicLink = async (req, res) => {
//   const { token } = req.query;
//   if (!token) return res.status(400).json({ message: 'Token is required.' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     res.status(200).json({ message: `Welcome back, ${user.email}` });
//   } catch (err) {
//     console.error('Token verification failed:', err);
//     res.status(401).json({ message: 'Invalid or expired token.' });
//   }
// };
