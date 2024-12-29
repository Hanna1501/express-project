const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@des Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@des Create new contacts
//@route POST /api/contacts
//@access private
const createContacts = asyncHandler(async(req, res) => {
    console.log("The request body is: ", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    //if not empty, create a contact
    const contact= await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contact);
});

//@des Get a contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@des Update a contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}  //a query option
    );
    res.status(200).json(updatedContact);
});

//@des Delete a contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContacts = asyncHandler(async(req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete other user contacts");
    }
    // await contact.remove();
    res.status(200).json(contact);
});

module.exports = {getContacts, createContacts, getContact, updateContact, deleteContacts};