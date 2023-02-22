const { User, Product, Address } = require("../db.js");

const getAllUsers = async () => {
  const allUsers = await User.findAll({
    include: [
      {
        model: Product,
        as: "favorites",
      },
      { model: Address },
    ],
  });
  return allUsers;
};

const getUserAdresses = async (email) => {
  const findUser = await User.findOne({
    where: {
      email: email,
    },
    include: {
      model: Address,
    },
  });
  return findUser.Addresses;
};

const loginUser = async (value) => {
  const findUser = await User.findOrCreate({
    where: {
      email: value.email,
    },
    defaults: {
      name: value.name,
      img: value.picture,
    },
    include: [
      {
        model: Address
      }
      
    ],
  });
  return findUser;
};

const putUsers = async (value) => {
  let user = await User.findByPk(value.id);
  if (value.name) {
    user.name = value.name;
  }
  /*   if (value.password) {
    user.password = value.password;
  }
  */
  if (value.email) {
    user.email = value.email;
  }
  if (value.img) {
    user.img = value.img;
  }
  if (value.isAdmin) {
    user.isAdmin = value.isAdmin;
  }
  await user.save();
};

const getPurchasesByUser = async ({email}) =>{
  const user = await User.findOne({
    where: {
      email: email
    },
    includes: {
      model: Product,
      as: 'purchases'
    }
  })
  return user.purchases
}

module.exports = {
  getAllUsers,
  loginUser,
  getUserAdresses,
  putUsers,
  getPurchasesByUser
};
