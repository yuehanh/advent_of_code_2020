const parseInput = require("../util");

const inputs = parseInput("d4", "\n\n");

const interpretPassport = (input) => {
  const fields = input.split(/\s/);
  const fieldPairs = {};
  for (const field of fields) {
    const [k, v] = field.split(":");
    fieldPairs[k] = v;
  }
  return fieldPairs;
};

const validatePassport = (passport) => {
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  return requiredFields.every((field) => passport.hasOwnProperty(field));
};

const numValidPassports = () => {
  const passportObjs = inputs.map(interpretPassport);

  let validCount = 0;

  for (passport of passportObjs) {
    if (validatePassport(passport)) {
      validCount++;
    }
  }

  return validCount;
};

console.log(numValidPassports());

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.

const validYear = (data, field, min, max) => {
  if (data[field] === undefined) return false;
  const num = Number(data[field]);
  return min <= num && num <= max;
};

const validByr = (data) => {
  return validYear(data, "byr", 1920, 2002);
};
const validIyr = (data) => {
  return validYear(data, "iyr", 2010, 2020);
};
const validEyr = (data) => {
  return validYear(data, "eyr", 2020, 2030);
};

const validHgt = (data) => {
  if (data.hgt === undefined) return false;

  const unit = data.hgt.slice(-2);
  const num = Number(data.hgt.slice(0, -2));
  switch (unit) {
    case "in":
      return 59 <= num && num <= 76;
    case "cm":
      return 150 <= num && num <= 193;
    default:
      return false;
  }
};

const validHcl = (data) => {
  if (data.hcl === undefined) return false;

  return data.hcl.match(/^#([0-9a-f]{6})$/);
};

const validEcl = (data) => {
  const validColors = new Set([
    "amb",
    "blu",
    "brn",
    "gry",
    "grn",
    "hzl",
    "oth",
  ]);

  return validColors.has(data.ecl);
};

const validPid = (data) => {
  if (data.pid === undefined) return false;

  return data.pid.match(/^([0-9]{9})$/);
};
const validatePassportStrictRules = (passport) => {
  const validators = [
    validByr,
    validIyr,
    validEyr,
    validHgt,
    validHcl,
    validEcl,
    validPid,
  ];

  return validators.every((validator) => validator(passport));
};

const numValidPassportsStrictRules = () => {
  const passportObjs = inputs.map(interpretPassport);

  let validCount = 0;

  for (passport of passportObjs) {
    if (validatePassportStrictRules(passport)) {
      validCount++;
    }
  }

  return validCount;
};

console.log(numValidPassportsStrictRules());
