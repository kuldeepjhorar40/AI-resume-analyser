const UserModel = require("../Models/user");


/**
 * Registers authenticated application users in MongoDB while maintaining
 * idempotent behavior for returning users. Existing accounts are returned
 * instead of creating duplicate records for the same normalized email.
 */
exports.register = async (req, res) => {
  try {
    console.log("REQ BODY =", req.body);

    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing",
      });
    }

    const {
      name,
      email,
      photoUrl,
    } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim()
    ) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    const userExist = await UserModel.findOne({
      email: normalizedEmail,
    });

    if (!userExist) {
      const newUser = new UserModel({
        name: name.trim(),
        email: normalizedEmail,
        photoUrl: photoUrl || "",
      });

      await newUser.save();

      return res.status(200).json({
        message: "User Registered Successfully",
        user: newUser,
      });
    }

    return res.status(200).json({
      message: "Welcome Back",
      user: userExist,
    });

  } catch (err) {
    console.error(
      "User Registration Error:",
      err
    );

    if (err.code === 11000) {
      return res.status(409).json({
        error: "Conflict",
        message: "A user with this email already exists",
      });
    }

    return res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
};