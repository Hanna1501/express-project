//@des Get all details
//@route GET /api/details
//@access private
const getDetails = (req, res) => {
    res.status(200).json({message: "get all details"});
};
const createDetails = (req, res) => {
    console.log("The request body is: ", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    res.status(201).json({message: "create a detail"});
};
const getDetail = (req, res) => {
    res.status(200).json({message: `get detail of ${req.params.id}`});
};
const updateDetails = (req, res) => {
    res.status(200).json({message: `update detail for ${req.params.id}`});
};
const deleteDetails = (req, res) => {
    res.status(200).json({message: `delete detail of ${req.params.id}`});
};

module.exports = {
    getDetails,
    createDetails,
    getDetail,
    updateDetails,
    deleteDetails
}