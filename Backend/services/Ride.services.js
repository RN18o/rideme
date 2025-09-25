const rideModel = require("../models/Ride.model");
const mapServices = require("./Map.services");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distancetime = await mapServices.getDistanceTime(pickup, destination);

  const baseFare = {
      auto: 30,
      car: 50,
      moto: 20,
    },
    perKmRate = {
      auto: 10,
      car: 15,
      moto: 8,
    },
    perMinRate = {
      auto: 2,
      car: 3,
      moto: 1.5,
    };
  console.log(distancetime);

  const fare = {
    auto:
      Math.floor(baseFare.auto +
      ((distancetime.distance.value / 1000) * perKmRate.auto) +
      ((distancetime.duration.value / 60) * perMinRate.auto)),
    car:
      Math.floor(baseFare.car +
      ((distancetime.distance.value / 1000) * perKmRate.car) +
      ((distancetime.duration.value / 60) * perMinRate.car)),
    moto:
      Math.floor(baseFare.moto +
      ((distancetime.distance.value / 1000) * perKmRate.moto) +
      ((distancetime.duration.value / 60) * perMinRate.moto)),
  };
  return fare;
}

console.log(getFare);

module.exports.getFare = getFare;

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });
  return ride;
};
