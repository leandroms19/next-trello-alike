import Image from "next/image";
import Link from "next/link"

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <Image src="/unicalogo.jpeg" alt="logo" height={40} width={40} />
                <p className="text-lg text-neutral-700">
                    Única Task
                </p>
            </div>

        </Link>
    );
};