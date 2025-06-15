import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    photo: {
      type: String,
      required: false,
      default: 'null',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactModel = mongoose.model('Contact', contactSchema);

//type: mongoose.Schema.Types.ObjectId, ===> _id: ObjectId('68371e7de6c56b851ad52170')
//буде ідентифікатор user якому нажить contact

// при створенні contact
// _id: ObjectId('6830ab293545415702aedafc')
// name: "Joi 1"
// phoneNumber: "+380000000055"
// email: "joi1@example.com"
// isFavourite: true
// contactType: "work"
// createdAt: 2025-05-23T17:06:49.031+00:00
// updatedAt: 2025-05-23T17:06:49.031+00:00

// userId: ObjectId('683d7bd1e625d9fa33a7a4ab')    ===>  user -> _id: ObjectId('683d7bd1e625d9fa33a7a4ab')
//=======================================================================
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
