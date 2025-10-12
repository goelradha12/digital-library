import db from "../db.js";
import { apiError } from "../utils/api.error.js";
import { apiResponse } from "../utils/api.response.js";
import { dbquery } from "../utils/db.helper.js";
import { razorpayInstance } from "../utils/razorpay.js";

import crypto from "crypto";
export async function createOrder(req, res, next) {
  try {
    const { amount, visitor_id } = req.body;
    const options = {
      amount: amount, // amount in paisa (₹600.00)
      currency: "INR",
      receipt: visitor_id + new Date().getTime().toString(), // a unique ID
      notes: {
        visitor_id: visitor_id,
      },
    };
    await razorpayInstance.orders.create(options, (err, order) => {
      if (err) throw new apiError(400, err.message);
      else res.json(new apiResponse(200, order, "Order created successfully"));
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyPayment(req, res, next) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // ✅ Step 1: Fetch order details from Razorpay
    let orderDetails;
    try {
      orderDetails = await razorpayInstance.orders.fetch(razorpay_order_id);
    } catch (fetchError) {
      console.error("Razorpay Order Fetch Error:", fetchError);
      return next(
        new apiError(
          404,
          { success: false },
          "Order not found or invalid Razorpay Order ID.",
        ),
      );
    }

    // ✅ Step 2: Verify Razorpay signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      throw new apiError(
        400,
        { success: false },
        "Payment verification failed — invalid signature.",
      );
    }

    // ✅ Step 3: Extract Visitor_ID from order notes
    const visitorId = orderDetails.notes.visitor_id; // e.g. VIS000000035

    // ✅ Step 4: Handle DB operations in a transaction
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      // Find or create a User
      const [existingUser] = await connection.query(
        "SELECT User_ID FROM User WHERE Visitor_ID = ?",
        [visitorId],
      );
      console.log("User: ", existingUser);
      let userId;
      if (existingUser.length === 0) {
        await connection.query("INSERT INTO User (Visitor_ID) VALUES (?)", [
          visitorId,
        ]);
        userId = (
          await connection.query(
            "SELECT User_ID FROM User WHERE Visitor_ID = ?",
            [visitorId],
          )
        )[0].User_ID;
      } else {
        userId = existingUser[0].User_ID;
      }

      // Insert into Transaction table
      await connection.query(
        "INSERT INTO Transaction (Transaction_ID, User_ID, Amount_Paid, Payment_Method) VALUES (?, ?, ?, ?)",
        [orderDetails.id, userId, orderDetails.amount / 100, "Razorpay"],
      );

      await connection.commit();

      // ✅ Success Response
      res.json(
        new apiResponse(
          200,
          {
            success: true,
            userId,
            transactionID: orderDetails.id,
          },
          "Payment verified and recorded successfully.",
        ),
      );
    } catch (dbError) {
      console.error("Database Error:", dbError);
      await connection.rollback();

      // ✅ Step 5: Trigger refund since payment is captured but DB failed
      try {
        const refund = await razorpayInstance.payments.refund(
          razorpay_payment_id,
          {
            amount: orderDetails.amount, // refund full amount
            speed: "optimum",
          },
        );

        console.log("Refund issued:", refund);

        return next(
          new apiError(
            500,
            { success: false, refund },
            "Payment verified but failed to record transaction. Refund initiated.",
          ),
        );
      } catch (refundError) {
        console.error("Refund Error:", refundError);
        return next(
          new apiError(
            500,
            { success: false },
            "Payment verified but DB operation and refund both failed. Manual intervention required.",
          ),
        );
      }
    } finally {
      connection.release();
    }
  } catch (error) {
    next(error);
  }
}
