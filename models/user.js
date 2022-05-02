import { Model } from 'sequelize'
import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Firstname can not be empty'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Lastname can not be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email address must be valid"
        },
      }
    },
    password:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 100],
          msg: 'Your password is too short'
        }
      }
    },
  }, 
  
  {
    instanceMethods: {

      /**
       * compare the input password with the hashed password stored
       * @param {String} password
       * @returns {Boolean} true or false
       */
      matchPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },

      /**
       * hashes the password before storing
       * @param {String} password
       * @returns {void} no return
       */
      hashPassword() {
        this.password = bcrypt.hashSync(
          this.password.trim(), 
          bcrypt.genSaltSync(10)
        );
      }
    },
    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },

      beforeUpdate(user) {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
