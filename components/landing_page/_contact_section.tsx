import * as Components from "..";
import { useState } from "react";
import Image from "next/image";

export const ContactSection: React.FC = (): JSX.Element => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    if (message == "") {
      return;
    }

    await fetch(
      `https://api.telegram.org/bot${"2132485521:AAFGNewhCnktF6bKCpKHwFJ8MxRKU-Xu4kc"}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: "@blogcuahuy",
          parse_mode: "Markdown",
          text: `Message from *${
            name == "" ? "Anonymous" : name
          }*:\n"${message}"`,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    setMessage("");
    setSending(false);
    setSent(true);
  };
  return (
    <div
      id={Components.Type.LandingPageSectionType_Contact}
      className="space-y-10 pb-10 lg:pb-36"
    >
      <h1 className="mb-0">
        Để lại lời nhắn cho
        <br />
        mình tại đây
      </h1>
      <div className="">
        <form
          onSubmit={handleSendMessage}
          className="flex flex-col w-full space-y-4"
        >
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Tên (Không bắt buộc)"
            className="py-3 px-4 bg-gray-100 rounded-lg"
            onChange={(e) => {
              setName(e.target.value);
              setSent(false);
            }}
            value={name}
          />
          <textarea
            id="message"
            name="message"
            placeholder="Nội dung"
            className="py-3 px-4 resize-none bg-gray-100 rounded-lg h-44 w-full"
            maxLength={200}
            onChange={(e) => {
              setMessage(e.target.value);
              setSent(false);
            }}
            value={message}
            required
          />
          <div className="flex justify-end items-end">
            <button
              className="font-bold text-xl flex justify-center items-center rounded-lg space-x-2 px-3"
              type="submit"
            >
              <div className="m-0 mt-1">Gửi </div>
              {sending ? (
                <Image
                  className="animate-spin"
                  src="/icons/spinner-icon.svg"
                  width="20"
                  height="20"
                />
              ) : sent ? (
                <Image src="/icons/sent-icon.svg" width="20" height="20" />
              ) : (
                <Image src="/icons/send-icon.svg" width="20" height="20" />
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="w-full flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
        <div className="w-5/12">
          <h3 className="mt-0">Mạng xã hội</h3>
          <div className="flex space-x-3">
            <a href="https://www.linkedin.com/in/Dragonol/">
              <div className="w-6 h-6">
                <Image
                  src="/icons/linkedin-icon.svg"
                  width="1000"
                  height="1000"
                />
              </div>
            </a>

            <a href="https://www.fb.me/Dragonol">
              <div className="w-6 h-6">
                <Image
                  src="/icons/facebook-icon.svg"
                  width="1000"
                  height="1000"
                />
              </div>
            </a>
          </div>
        </div>
        <div className="md:w-5/12 w-full">
          <h3 className="mt-0">Hộp thư</h3>
          <div className="flex items-center space-x-3 -mt-1">
            <div className="w-6 h-6">
              <Image src="/icons/mail-icon.svg" width="1000" height="1000" />
            </div>
            <p className="m-0 break-all">huyhnc81@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
