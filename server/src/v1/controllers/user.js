const User = require('../models/user')
const CryptoJS = require('crypto-js')
const jsonwebtoken = require('jsonwebtoken')

exports.register = async (req, res) => {
  const { password } = req.body
  try {
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    )
    const user = await User.create(req.body)
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '24h' }
    )
    res.status(201).json({ user, token })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username }).select('password username')
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: 'username',
            msg: 'Invalid username or password'
          }
        ]
      })
    }

    const decryptedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8)

    if (decryptedPass !== password) {
      return res.status(401).json({
        errors: [
          {
            param: 'username',
            msg: 'Invalid username or password'
          }
        ]
      })
    }

    user.password = undefined

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '24h' }
    )

    res.status(200).json({ user, token })

  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getAll = async (req, res) => {
  try {
    // const boards = await Board.find({ user: req.user._id }).sort('-position')
    const user = await User.find({}, 'firstname lastname username role')
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Get a single user by id
exports.getUser = async (req, res) => {
   try {
    const user = await User.findById(req.params.userId, 'firstname lastname username role');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  } 
}


// Update a user by id
exports.updateUser = async (req, res) => {
  try {
    // Check if the password field is present in the request
    if (req.body.password) {
      // Hash the new password
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET_KEY
      ).toString();
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    ).lean(); // Use .lean() to get a plain JavaScript object if you don't need a mongoose document

    // Optionally, remove the password field from the response
    delete updatedUser.password;

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a user by id
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: 'User has been deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
}