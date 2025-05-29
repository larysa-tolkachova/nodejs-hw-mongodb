import mongoose from 'mongoose';

//creat user
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

//перевизначемо метод JSON для видалення password при поверненні
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserModel = mongoose.model('User', userSchema);
//===============
// Створіть модель Session з такими полями:

// const sessionSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     accessToken: { type: String, required: true },
//     refreshToken: { type: String, required: true },
//     accessTokenValidUntil: { Date, required: true },
//     refreshTokenValidUntil: { Date, required: true },
//   },
//   { timestamps: true, versionKey: false },
// );

// export const SessionModel = mongoose.model('Session', sessionSchema);
