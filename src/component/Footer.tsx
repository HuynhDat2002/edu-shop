'use client'
import Image from "next/image";
export default function Footer() {
  return (
    <>
      <footer className="flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 w-screen border-t border-gray-300  flex gap-2 justify-center items-center pb-3">
        <div className=" cursor-pointer flex flex-row justify-center items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={30}
            height={30}
            className="rounded-full"
          />
          <p className="text-lg font-bold ml-2" >
            EduShop
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <Image
            src="/github-mark.png"
            alt="footer"
            width={20}
            height={20}
            className="rounded-lg "
          />
          <a
            href="https://github.com/HuynhDat2002"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 cursor-pointer text-lg"
          >
            https://github.com/HuynhDat2002
          </a>
        </div>
      </footer>
    </>
  )
}