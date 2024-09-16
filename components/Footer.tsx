import Image from 'next/image'
import logo from '@/public/logo.svg'

//Minimalistic Footer component
export const Footer = () => {
    return (
        <div className="w-full h-48 h-full bg-secondary text-primary flex flex-row items-center justify-between px-20">
            <div className="flex flex-col items-center">
                <Image src={logo} alt="alt" className="w-[100px] h-auto invert mb-4" />
                <p className="text-xs text-gray-400 max-w-[150px]">Innovative solutions for progressive people and businesses.</p>
            </div>
        </div>
    )
}
