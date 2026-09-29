import mongoose, { Schema } from "mongoose";

const heroSchema = new Schema(
  {
    title: {
      line1: { type: String, required: true },
      line2: { type: String, required: true },
    },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    button1: {
      text: { type: String, default: "" },
      link: { type: String, default: "" },
      leftIcon: { type: String, default: "" },
      rightIcon: { type: String, default: "" },
    },
    button2: {
      text: { type: String, default: "" },
      link: { type: String, default: "" },
      leftIcon: { type: String, default: "" },
      rightIcon: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const Hero = mongoose.models.Hero || mongoose.model("Hero", heroSchema);

export default Hero;