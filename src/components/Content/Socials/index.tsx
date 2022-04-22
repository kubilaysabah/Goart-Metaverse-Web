// React
import type { FC, ReactElement } from "react";
import { memo } from "react";

// Interface
import SocialsProps from "./index.d";

// Icons
import { BsFacebook, BsTelegram } from "react-icons/bs";
import { AiOutlineTwitter, AiOutlineInstagram, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";

const Socials: FC<SocialsProps> = ({
    colors = "text-gray-200 hover:text-gray-700"
}): ReactElement<SocialsProps> => {
    return (
        <nav>
            <ul className={`flex flex-wrap items-center justify-center`}>
                <li className="lg:mr-10">
                    <a href="https://www.facebook.com/goartmetaverse" title="Facebook" target="_blank" rel="noreferrer" className={`block py-2 px-3 text-xs lg:text-base rounded-sm ${colors}`}>
                        <BsFacebook size={24} />
                    </a>
                </li>
                <li className="lg:mr-10">
                    <a href="https://twitter.com/goartmetaverse" title="Twitter" target="_blank" rel="noreferrer" className={`block py-2 px-3 text-xs lg:text-base rounded-sm ${colors}`}>
                        <AiOutlineTwitter size={24} />
                    </a>
                </li>
                <li className="lg:mr-10">
                    <a href="https://www.instagram.com/goartmetaverse" title="Instagram" target="_blank" rel="noreferrer" className={`block py-2 px-3 text-xs lg:text-base rounded-sm ${colors}`}>
                        <AiOutlineInstagram size={24} />
                    </a>
                </li>
                <li className="lg:mr-10">
                    <a href="https://www.linkedin.com/company/goartmetaverse" title="Linkedin" target="_blank" rel="noreferrer" className={`block py-2 px-3 text-xs lg:text-base rounded-sm ${colors}`}>
                        <AiFillLinkedin size={24} />
                    </a>
                </li>
                <li className="lg:mr-10">
                    <a href="https://www.youtube.com/channel/UCo_w1BGnxAwbezuy7aHLXzg/featured" title="Youtube" target="_blank" rel="noreferrer" className={`block py-2 px-3 text-xs lg:text-base rounded-sm ${colors}`}>
                        <AiFillYoutube size={24} />
                    </a>
                </li>
                <li className="lg:mr-10">
                    <a href="https://t.me/goartmetaverse" title="Telegram" target="_blank" rel="noreferrer" className={`block py-2 px-3 text-xs lg:text-base rounded-sm ${colors}`}>
                        <BsTelegram size={24} />
                    </a>
                </li>
                <li className="lg:mr-10">
                    <a href="https://discord.gg/kuXJFgKXE5" title="Discord" target="_blank" rel="noreferrer" className={`block py-2 px-3 text-xs lg:text-base rounded-sm ${colors}`}>
                        <FaDiscord size={24} />
                    </a>
                </li>
            </ul>
        </nav>
    );
};


export default memo(Socials);