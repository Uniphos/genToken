import { StreamChat } from 'stream-chat';

export default async function handler(req, res) {
  // Check if the request is a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  // Extract user information from the request body
  const { user_id} = req.body;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID are required' });
  }

  // Your Stream API Key and Secret (replace these with your own values)
  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;

  if (!apiKey || !apiSecret) {
    return res.status(500).json({ message: 'Stream API keys not set' });
  }

  try {
    // Initialize the Stream Chat client
    const chatClient = new StreamChat(apiKey, apiSecret);

    // Generate a user token with the role
    const token = chatClient.createToken(user_id);

    // You can customize the role and other fields as needed
    // Example: Set role on the token
    const userToken = chatClient.createToken(user_id);

    res.status(200).json({ token: userToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating token', error: error.message });
  }
}
