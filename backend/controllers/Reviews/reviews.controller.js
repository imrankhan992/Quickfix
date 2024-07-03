const Order = require("../../Models/Order/Order");
const registrationModel = require("../../Models/ServiceProvider/registrationModel");

exports.postNewReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, serviceProviderId, feedback } = req.body;

        // Check whether the rating is a number
        const ratingNumber = Number(rating);
        if (isNaN(ratingNumber)) {
            throw new Error("Rating must be a number");
        }


        const { _id } = req.user;
        const fullName = `${req.user.firstname} ${req.user.lastname}`;

        const order = await Order.findById(id);
        if (!order) {
            throw new Error("Order not found");
        }
        if (order.clientId.toString() !== _id.toString()) {
            throw new Error("You are not authorized to give a review for this order");
        }

        const serviceProvider = await registrationModel.findById(serviceProviderId);
        if (!serviceProvider) {
            throw new Error("Service provider not found");
        }
        if (serviceProvider.isBlocked) {
            throw new Error("You cannot give a review to a blocked service provider");
        }
        // i want to check client gives review on which order if he gives review on same order then he can't give review again



        const isReviewed = serviceProvider.reviews.find(
            (item) => item.order.toString() === id.toString()
        );
        console.log(isReviewed, "this is is reviewd");


        if (isReviewed) {
            throw new Error(`You have already given a review for this service provider ${isReviewed}`);
        }

        
        serviceProvider.reviews.push({
            user: _id,
            order: id,
            rating: ratingNumber,
            feedback: feedback,
            name: fullName,
            date: new Date(), 
          });
          



        let avg = 0;
        serviceProvider.ratings = serviceProvider.reviews.forEach((rev) => {
            avg += rev.rating
        })
        serviceProvider.ratings = avg / serviceProvider.reviews.length;
        await serviceProvider.save({ validateBeforeSave: false });


        return res.status(200).json({ success: true, message: "Review added successfully" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
