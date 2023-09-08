const jwt = require("jsonwebtoken");
const { getImage } = require("../aws/ImageUpload");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
let emailvalid =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
let namevalid = /^[a-zA-Z]{1,20}$/;

/////////////////////~CreateUser ~/////////////////////////
const createUser = async function (req, res) {
  try {
    let files = req.files;
    let { Name, Email, Mobile, Password } = req.body;
    let finalDetails = {};
    if (!Name)
      return res.status(400).send({ message: "Pls Provide User Name" });
    if (!namevalid.test(Name))
      return res.status(400).send({ message: "Pls Provide valid User Name" });
    else {
      finalDetails.name = Name;
    }
    if (!Email)
      return res.status(400).send({ message: "Pls Provide User Email" });
    if (!emailvalid.test(Email))
      return res.status(400).send({ message: "Pls Provide valid User Email" });
    else {
      finalDetails.email = Email;
    }
    if (!Mobile)
      return res.status(400).send({ message: "Pls Provide User Mobile" });
    else {
      finalDetails.mobile = Mobile;
    }
    if (!Password)
      return res.status(400).send({ message: "Pls Provide User Name" });
    else {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(Password, salt);
      finalDetails.password = secPass;
    }
    if (files.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Please provide Profile Image" });
    finalDetails.profileImg = await getImage(files);

    let UserDetails = await userModel.create(finalDetails);
    return res.status(201).send({ massage: "Successful", data: UserDetails });
  } catch (error) {
    console.log("This is the error :", error.message);
    res.status(500).send({ msg: "Error", error: error.message });
  }
};

/////////////////////////////////////////////////////////////
const userLogin = async (req, res) => {
  try {
    let { Email, Password } = req.body;
    if (!Email) {
      return res
        .status(400)
        .send({ status: false, message: "Pls provide email" });
    }
    if (!Password) {
      return res
        .status(400)
        .send({ status: false, message: "Pls provide password" });
    }
    if (!emailvalid.test(Email)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid Email Id" });
    }
    let userDetails = await userModel.findOne({ email: Email });
    if (!userDetails) {
      return res
        .status(404)
        .send({ status: false, message: "User not registered" });
    }
    let hash = userDetails.password;
    let finalPaswword = (result) => {
      if (result == true) {
        let token = jwt.sign(
          {
            userId: userDetails._id.toString(),
          },
          "cendro_01",
          {
            expiresIn: "24h",
            // token expiered in 24 hours
          }
        );
        let userId = userDetails._id;
        return res.status(200).send({
          status: true,
          message: "User login successfull",
          data: {
            userId: userId,
            token: token,
          },
        });
      } else {
        return res
          .status(401)
          .send({ status: false, message: "incorrect Password" });
      }
    };
    await bcrypt.compare(Password, hash, function (err, result) {
      finalPaswword(result);
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    let users = await userModel
      .find()
      .select({ _id: 0, updatedAt: 0, createdAt: 0 });
    return res.status(200).send({ massage: "All Users", data: users });
  } catch (error) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

////////////////////////////////////////////////////////////////////////

const userUpdate = async (req, res) => {
  try {
    const _id = req.params.userId;
    const files = req.files;
    const { Name, Email, Password, Mobile } = req.body;

    let finalDetails = {};
    if (Name) {
      if (!namevalid.test(Name))
        return res.status(400).send({ message: "Pls Provide valid User Name" });
      else {
        finalDetails.name = Name;
      }
    }
    if (Email) {
      if (!emailvalid.test(Email))
        return res
          .status(400)
          .send({ message: "Pls Provide valid User Email" });
      else {
        finalDetails.email = Email;
      }
    }
    if (Mobile) {
      finalDetails.mobile = Mobile;
    }
    if (Password) {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(Password, salt);
      finalDetails.password = secPass;
    }

    if (files.length != 0) {
      finalDetails.profileImg = await getImage(files);
    }
    const userDeatils = await userModel.findById(_id);
    if (!userDeatils)
      return res.status(404).send({ massage: "user not found" });
    const updateUserDetails = await userModel.findByIdAndUpdate(
      _id,
      finalDetails,
      { new: true }
    );
    return res
      .status(200)
      .send({ message: "update Successfuly", data: updateUserDetails });
  } catch (error) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

////////////////////////////////////////////////////////////////////////////

const deleteUser = async (req, res) => {
  try {
    const _id = req.params.userId;
    const userDeatils = await userModel.findById(_id);
    if (!userDeatils)
      return res.status(404).send({ massage: "user not found" });

    let removeUser = await userModel.findByIdAndDelete(_id);
    if (removeUser) {
      return res.status(200).send({ message: "Deleted Successfuly" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//////////////////////~Exports Module~///////////////////////
module.exports = { createUser, userLogin, getUsers, userUpdate, deleteUser };
