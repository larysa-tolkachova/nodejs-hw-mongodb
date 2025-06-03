import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const SessionModel = mongoose.model('Session', sessionSchema);

//type: mongoose.Schema.Types.ObjectId, ===> _id: ObjectId('68371e7de6c56b851ad52170')

//при створенні session

// _id: ObjectId('683d7d35934c52206702c0f1')
// userId: ObjectId('683d7bd1e625d9fa33a7a4ab')
// accessToken: "4Q5XBvslbJGVcwSGerFzCyk8BHCdPRgSRFrwLmYn"
// refreshToken: "9OVO4yG4lbA49QaGiTVIE7sZPdbEp4dcyCjtewrF"
// accessTokenValidUntil: 2025-06-02T10:45:13.996+00:00
// refreshTokenValidUntil: 2025-07-02T10:30:13.996+00:00
// createdAt: 2025-06-02T10:30:14.010+00:00
// updatedAt: 2025-06-02T10:30:14.010+00:00
