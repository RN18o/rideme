const captainModel = require("../models/Captain.model");
const { validationResult } = require("express-validator");
const CaptainService = require("../services/Captain.services");
const blackListTokenModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isAlreadyCaptain = await captainModel.findOne({ email });

  if (isAlreadyCaptain) {
    return res.status(400).json({ message: "Captain Already Exist" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await CaptainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.getAuthToken();

  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(400).json({ message: "Captain not found" });
  }
  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  const token = captain.getAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, captain, message: "Captain Login Successfully" });
};

module.exports.getCaptainProfile = async (req, res) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await blackListTokenModel.create({ token });

  res.clearCookie("token");

  res.status(200).json({ message: "Logout successfully" });
};
