import Link from "next/link"

export const Logo = () => {
    return (
        <Link href="/">
            <div></div>
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <p>Logo</p>
                <p className="text-lg text-neutral-700 pb-1">
                    Trello Clone
                </p>
            </div>

        </Link>
    );
};