import mongoose from "mongoose";

import { mongoUri } from "./config";

mongoose.connect(
  mongoUri,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500
  },
  err => {
    if (err) {
      console.log(err);
      process.exit(-1);
    }
  }
);

export default mongoose;
