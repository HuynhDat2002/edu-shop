'use client'
import Image from "next/image";
import { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from 'next/navigation';
import SearchBar from "./SearchBar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ModalSearch from './ModalSearch'
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Header() {
    const [isOpenModalSearch, setOpenModalSearch] = useState(false)
    const router = useRouter();
    const items = [
        {
            key: "home",
            label: "Trang chủ",
        },
        {
            key: "wish-list",
            label: "Đã thích",
        },
        {
            key: "watched",
            label: "Lịch sử xem",
        }

    ];

    const hanleClickDropDown = (key: string) => {
        if (key === "home") {
            router.push("/")
        }
        if (key === "wish-list") {
            router.push("/wish-list")
        }
        if (key === "watched") {
            router.push("/watched")
        }

    }
    return (
        <>
            <header className="fixed top-0 left-0 right-0 w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 shadow-xs flex flex-row py-2 place-content-between border-b border-gray-200 z-10">

                {/* logo  */}
                <div className=" cursor-pointer flex flex-row items-center pl-5">
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        width={50}
                        height={50}
                        className="rounded-full fill-red-500 stroke-blue-500"
                        style={{ fill: "red" }}
                    />
                    <p className="text-2xl font-bold ml-2" onClick={() => router.push("/")}>

                        EduShop
                    </p>
                </div>
                {/* search bar */}
                <div className="flex justify-center items-center hidden 2xl:block">
                    <SearchBar />
                </div>

                {/* more */}
                <div className="flex  font-semibold items-center ">
                    <div className="flex justify-center items-center block 2xl:hidden mr-5">
                        <MagnifyingGlassIcon className="size-7 text-black"
                            onClick={() => setOpenModalSearch(true)}
                        />
                    </div>
                    <div className="text-xl md:flex md:justify-center md:items-center hidden md:block md:flex md:flex-row md:gap-3 md:pr-5">
                        <div className="cursor-pointer transition duration-300 ease-in-out hover:p-0.5 hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-500 hover:rounded-3xl">
                            <p className=" hover:text-black hover:p-1 hover:bg-white hover:rounded-2xl"
                                onClick={() => router.push("/")}
                            >
                                Trang chủ
                            </p>
                        </div>
                        {/* <div className="border-l border-gray-500 pl-3 cursor-pointer transition duration-300 ease-in-out hover:p-0.5 hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-500 hover:rounded-3xl">
                            <p className="hover:p-1 hover:text-black hover:bg-white hover:rounded-2xl">
                                Giới thiệu
                            </p>
                        </div> */}
                        <div className="border-l border-gray-500 pl-3 cursor-pointer transition duration-300 ease-in-out hover:p-0.5 hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-500 hover:rounded-3xl"
                            onClick={() => router.push('/wish-list')}
                        >
                            <p className="hover:p-1 hover:text-black hover:bg-white hover:rounded-2xl">
                                Đã thích
                            </p>
                        </div>
                        <div className="border-l border-gray-500 pl-3 cursor-pointer transition duration-300 ease-in-out hover:p-0.5 hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-500 hover:rounded-3xl"
                            onClick={() => router.push('/watched')}
                        >
                            <p className="hover:p-1 hover:text-black hover:bg-white hover:rounded-2xl">
                                Lịch sử xem
                            </p>
                        </div>
                        <div className="border-l border-gray-500 pl-3 cursor-pointer transition duration-300 ease-in-out hover:p-0.5 hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-500 hover:rounded-3xl"
                            onClick={() => router.push('/cart')}
                        >
                            <p className="hover:p-1 hover:text-black hover:bg-white hover:rounded-2xl">
                                <ShoppingCartIcon className="size-6 text-black"/>
                            </p>
                        </div>

                    </div>
                    <div className="flex flex-row gap-5 md:hidden pr-5">
                         <div className="flex justify-center items-center pl-3 cursor-pointer transition duration-300 ease-in-out hover:p-0.5 hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-500 hover:rounded-3xl"
                            onClick={() => router.push('/cart')}
                        >
                            <p className="hover:p-1 hover:text-black hover:bg-white hover:rounded-2xl">
                                <ShoppingCartIcon className="size-6 text-black" />
                            </p>
                        </div>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button className="cursor-pointer border-1 border-gray-300 rounded-lg p-2 shadow-md" variant="bordered">
                                    <Bars3BottomRightIcon className="size-6 text-black" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dynamic Actions" items={items}
                                className="bg-white border-1 border-gray-300 rounded-lg shadow-md"
                            >
                                {(item: any) => (
                                    <DropdownItem
                                        key={item.key as string}
                                        className={"text-danger p-2 border-b border-gray-300 hover:bg-gray-100"}
                                        onClick={() => hanleClickDropDown(item.key as string)}
                                    >
                                        {item.label}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </header>
            {isOpenModalSearch &&
                // <div className="flex justify-center items-center">

                <ModalSearch isOpen={isOpenModalSearch} onClose={() => setOpenModalSearch(false)} />
                // </div>
            }
        </>
    )
}

