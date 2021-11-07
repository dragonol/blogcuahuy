import type { NextApiRequest, NextApiResponse } from "next";

type submitMessageReq = {
  name: string;
  message: string;
};

type submitMessageRes = {
  data?: any;
  error?: any;
};

const CHAT_ID = "@blogcuahuy";
const BOT_TOKEN = "2132485521:AAFGNewhCnktF6bKCpKHwFJ8MxRKU-Xu4kc";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<submitMessageRes>
) {
  const reqMessage = req.body as submitMessageReq;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      parse_mode: "Markdown",
      text: `Message from *${
        reqMessage.name == "" ? "Anonymous" : reqMessage.name
      }*:\n"${reqMessage.message}"`,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.ok) {
        console.log(data);
      }
      return res.status(data.ok ? 200 : 500).json({ data: data });
    })
    .catch((err) => res.status(500).json({ error: err }));
}
