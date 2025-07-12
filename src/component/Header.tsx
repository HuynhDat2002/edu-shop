'use client'
import Image from "next/image";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";

export default function Header() {
    const items = [
        {
            key: "home",
            label: "Trang chủ",
        },
        {
            key: "about",
            label: "Giới thiệu",
        },
        {
            key: "contact",
            label: "Liên hệ",
        }
    ];
    return (

        <header>
            <div className="sticky top-0 shadow-xs flex flex-row my-3 place-content-between pb-3 border-b border-gray-200 fixed top-0 left-0 right-0 z-50">

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
                    <p className="text-2xl font-bold ml-2">

                        EduShop
                    </p>
                </div>

                {/* more */}
                <div className="  font-semibold items-center ">
                    <div className="hidden md:block md:flex md:flex-row md:gap-3 md:pr-5">
                        <div className="cursor-pointer transition duration-300 ease-in-out hover:p-0.5 hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-500 hover:rounded-3xl">
                            <p className=" hover:text-black hover:p-1 hover:bg-white hover:rounded-2xl">
                                Trang chủ
                            </p>
                        </div>
                        <div className="cursor-pointer transition duration-300 ease-in-out hover:p-0.5 hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-500 hover:rounded-3xl">
                            <p className="hover:p-1 hover:text-black hover:bg-white hover:rounded-2xl">
                                Giới thiệu
                            </p>
                        </div>
                        <div className="cursor-pointer transition duration-300 ease-in-out hover:p-0.5 hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-500 hover:rounded-3xl">
                            <p className="hover:p-1 hover:text-black hover:bg-white hover:rounded-2xl">
                                Liên hệ
                            </p>
                        </div>
                    </div>
                    <div className="md:hidden pr-5 cursor-pointer">
                        <Dropdown>
                            <DropdownTrigger>
                                <div className="cursor-pointer shadow-md border-1 border-gray-300 rounded-lg p-2 flex flex-row items-center justify-center">
                                    <Button variant="bordered">Giá</Button>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dynamic Actions" items={items}
                                className="bg-white border-1 border-gray-300 rounded-lg shadow-md"
                            >
                                {(item: any) => (
                                    <DropdownItem
                                        key={item.key}
                                        className={"text-danger p-2 border-b border-gray-300 hover:bg-gray-100"}
                                        
                                    >
                                        {item.label}
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header>
    )
}

