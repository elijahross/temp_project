import Image from "next/image"
import logo from "../public/logo.svg"

// Minimalistic Header component
export const Header = () => {
    return (
        <div className="p-8 sm:px-20 px-8 items-startw-full">
            <Image src={logo} alt="alt" className="w-[100px] h-auto" />
        </div>
    )
}
