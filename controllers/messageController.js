import Message from "../models/Message.js";
//for users
export const getMessagesByCategory = async (req, res) => {
  const { type } = req.params;

  const messages = await Message.find({ category: type });
  res.json(messages);
};

export const getRandomMessage = async (req, res) => {
  const messages = await Message.find();
  const random = messages[Math.floor(Math.random() * messages.length)];
  res.json(random);
};
//for admin
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};


export const createMessage = async (req, res) => {
  const message = await Message.create(req.body);
  res.status(201).json(message);
};

export const updateMessage = async (req, res) => {
  const updated = await Message.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deleteMessage = async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
