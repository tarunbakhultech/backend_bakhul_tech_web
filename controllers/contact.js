const Contact = require("../models/contact");

const getContactData = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({
            msg: 'Contacts retrieved successfully',
            data: {
                contacts: contacts // Wrap the contacts in a nested object called 'contacts'
            }
        });
    } catch (error) {
        console.error('❌ Failed to retrieve contacts:', error);
        res.status(500).json({ error: 'Failed to retrieve contacts' });
    }
};



const saveContactData = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required (name, email, message).' });
    }

    try {
        const newContact = new Contact({ name, email, message });
        const savedContact = await newContact.save();
        res.status(201).json({ msg: 'Contact saved successfully', data: savedContact });
    } catch (error) {
        console.error('❌ Failed to save contact:', error);
        res.status(500).json({ error: 'Failed to save contact' });
    }
};

module.exports = { getContactData, saveContactData };
