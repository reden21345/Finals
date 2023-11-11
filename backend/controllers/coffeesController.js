

exports.getCoffees = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "This route will show all Coffees in the database."
    })
}