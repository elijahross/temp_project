import Image from "next/image"
import logo from "../public/logo.svg"

// Minimalistic Header component
export const Header = () => {
    return (
        <div className="p-8 px-20 items-startw-full">
            <Image src={logo} alt="alt" className="w-[100px] h-auto" />
        </div>
    )
}
