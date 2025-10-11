import { apiError } from "../utils/api.error.js";
import { apiResponse } from "../utils/api.response.js";
import { razorpayInstance } from "../utils/razorpay.js";
import { subsciptionAmount } from "../utils/subscription.js";

export async function createOrder(req, res) {
  try {
    const { amount, user_id } = req.body;
    const options = {
      amount: amount, // amount in paisa (₹600.00)
      currency: "INR",
      receipt: user_id,
      notes: {
          user_id: user_id, 
      }
    };
    await razorpayInstance.orders.create(options, (err, order) => {
      if (err) throw new apiError(400, err.message);
      else res.json(new apiResponse(200, order, "Order created successfully"));
    });
  } catch (error) {
    next(error);
  }
}
