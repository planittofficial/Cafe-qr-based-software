const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    lastTableNumber: { type: Number, default: null },
    lastCafeId: { type: mongoose.Schema.Types.ObjectId, ref: "Cafe", default: null },
  },
  { timestamps: true }
);

customerSchema.index({ phone: 1 }, { unique: true });

module.exports = mongoose.model("Customer", customerSchema);
