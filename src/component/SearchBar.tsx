'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";


export default function SearchBar() {
    const [searchValue, setSearchValue] = useState("")
    const router = useRouter()
    const items = [
        {
            key: "lt500",
            label: "< 500k",
        },
        {
            key: "from500to1m",
            label: "500k - 1000k",
        },
        {
            key: "gt1m",
            label: "> 1000k",
        }
    ];
    const handleSearch = (e: any) => {
        e.preventDefault();
        router.push(`/search?query=${searchValue}&page=1`)
    }
    return (
        <div className="z-100 mt-5 p-5 border-2 border-gray-300 rounded-lg bg-white  shadow-md w-full  justify-center items-center">
            <div className="flex flex-col lg:flex-row flex-1 justify-center items-center gap-2" >
                <form className=" max-w-md mx-auto " onSubmit={handleSearch}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="flex flex-col sm:flex-row relative focus:outline-none gap-2">
                        <div className=" flex items-center border border-gray-300 rounded-lg shadow-md p-2">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <input
                                type="search"
                                id="default-search"
                                className=" w-full p-2 ps-10 text-sm text-gray-900  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none "
                                placeholder="Tìm kiếm..."
                                required
                                onChange={(e) => setSearchValue(e.target.value || "")}
                            />
                        </div>
                        {/* filter */}
                        <div className="flex flex-row gap-2 justify-end">
                            <Dropdown>
                                <DropdownTrigger>
                                    <div className="cursor-pointer shadow-md border-1 border-gray-300 rounded-lg p-2 flex flex-row items-center justify-center">
                                        <Button variant="bordered">Giá</Button>
                                        <ChevronDownIcon className="size-6 text-black" />
                                    </div>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Dynamic Actions" items={items}
                                    className="bg-white border-1 border-gray-300 rounded-lg shadow-md"
                                >
                                    {(item: any) => (
                                        <DropdownItem
                                            key={item.key}
                                            className={"text-danger p-2 border-b border-gray-300 hover:bg-gray-500"}
    
                                        >
                                            {item.label}
                                        </DropdownItem>
                                    )}
                                </DropdownMenu>
                            </Dropdown>

                            <button
                                type="submit"
                                className="ct-button-search"
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </form>
                <div className="flex flex-row gap-2 justify-center items-center rounded-lg bg-gradient-to-r from-blue-300 to-purple-500 p-3 px-10 cursor-pointer">
                    <Image
                        src="/ai-technology.png"
                        alt="AI icon"
                        width={0}
                        height={0}
                        unoptimized
                        className="w-[2em] h-auto object-contain"
                    />
                    <p className="text-lg font-semibold">Gợi ý bởi AI </p>
                </div>
            </div>
        </div>
    );
}