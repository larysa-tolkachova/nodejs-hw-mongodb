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

//при створенні user

// _id: ObjectId('683d7bd1e625d9fa33a7a4ab')
// name: "Nona4"
// email: "nona4@ex.com"
// password: "$2b$10$wXNa19WefGW2lnCG2B29MuN08vcem/rE03HZvbSIbjJQCcUoAc9OW"
// createdAt: 2025-06-02T10:24:17.946+00:00
// updatedAt: 2025-06-02T10:24:17.946+00:00

//при створенні session

// _id: ObjectId('683d7d35934c52206702c0f1')
// userId: ObjectId('683d7bd1e625d9fa33a7a4ab')    ===>  user -> _id: ObjectId('683d7bd1e625d9fa33a7a4ab')
// accessToken: "4Q5XBvslbJGVcwSGerFzCyk8BHCdPRgSRFrwLmYn"
// refreshToken: "9OVO4yG4lbA49QaGiTVIE7sZPdbEp4dcyCjtewrF"
// accessTokenValidUntil: 2025-06-02T10:45:13.996+00:00
// refreshTokenValidUntil: 2025-07-02T10:30:13.996+00:00
// createdAt: 2025-06-02T10:30:14.010+00:00
// updatedAt: 2025-06-02T10:30:14.010+00:00
