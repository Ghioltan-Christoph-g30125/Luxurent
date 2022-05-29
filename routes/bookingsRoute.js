const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel")
const Car = require('../models/carModel')
const stripe = require('stripe')('sk_test_51L1wJJCsfVTUgcc2x7WjcnWPQ2d8bURJwJNrp3zgoV8f5z3FyMLMMMRIMd3Wl4E88kjZ51XcvRe6O8kMnUh0q5Pt00qTI5r6NJ')
const { v4: uuidv4 } = require('uuid');

router.post("/bookcar", async (req, res) => {

    const { token } = req.body
    try {

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create({
            amount: req.body.totalAmount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        })

        if (payment) {
            req.body.transactionId = payment.source.id;
            const newbooking = new Booking(req.body);
            await newbooking.save();
            const car = await Car.findOne({ _id: req.body.car });
            car.bookedTimeSlots.push(req.body.bookedTimeSlots);

            await car.save();
            res.send('Your booking is successful.');
        } else {
            return res.status(400).json(error);
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/getallbookings", async (req, res) => {

    try {
        const bookings = await Booking.find().populate('car')
        res.send(bookings)
    } catch (error) {
        return res.status(400).json(error);
    }

})

module.exports = router