'use client'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { Input } from "@heroui/react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ModalSearch({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [searchValue, setSearchValue] = useState("")
    const [selectedValue, setSelectedValue] = useState("")
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

    console.log('selectedvalue', selectedValue)
    const handleSearch = (e: any) => {
        e.preventDefault();
        onClose()
        router.push(`/search?query=${searchValue}&price=${selectedValue}`)

    }
    const handleSuggestion = (e: any) => {
        e.preventDefault();
        router.push(`/suggestions?userId=1`)
    }
    return (
        <>
            {isOpen &&
                <div className="fixed inset-0 bg-black opacity-40 z-10 2xl:hidden block "></div>
            }
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                placement="center"
                isDismissable={false}
                className="bg-white px-10 py-5 rounded-2xl 2xl:hidden block w-[90%] z-50"
                classNames={{
                    closeButton: "flex justify-center items-center right-4 top-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-black text-xl hover:text-gray-800 transition-all"
                }}

            >
                <ModalContent>

                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-xl mb-5">Tìm kiếm</ModalHeader>
                            <ModalBody className='relative'>

                                <form className=" max-w-md mx-auto" onSubmit={handleSearch}>
                                    <div className="flex flex-row sm:flex-row relative focus:outline-none gap-2">
                                        <div className=" flex items-center border border-gray-300 rounded-lg shadow-md p-2">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                            <input
                                                type="search"
                                                id="default-search"
                                                className=" w-full p-1 ps-10 text-lg text-gray-900  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none "
                                                placeholder="Tìm kiếm..."
                                                onChange={(e) => setSearchValue(e.target.value || "")}
                                            />
                                        </div>
                                        {/* filter */}
                                        <div className="flex flex-row gap-2 justify-end">
                                            <Dropdown>
                                                <DropdownTrigger>
                                                    <div className="cursor-pointer shadow-md border-1 border-gray-300 rounded-lg p-1 flex flex-row items-center justify-center">
                                                        <Button variant="bordered">Giá</Button>
                                                        <ChevronDownIcon className="size-6 text-black" />
                                                    </div>
                                                </DropdownTrigger>
                                                <DropdownMenu
                                                    disallowEmptySelection
                                                    aria-label="Multiple selection example"
                                                    closeOnSelect={false}
                                                    selectionMode="none"
                                                    variant="flat"
                                                    onSelectionChange={(keys) => {
                                                        const key = Array.from(keys)[0];
                                                        if (key === selectedValue) setSelectedValue("")
                                                        else setSelectedValue(key.toString());
                                                    }}
                                                    className="bg-white border-1 border-gray-300 rounded-lg shadow-md"
                                                >
                                                    {items.map((item: any) => (
                                                        <DropdownItem
                                                            key={item.key}
                                                            className={`text-danger p-2 border-b border-gray-300 hover:bg-gray-500 ${selectedValue === item.key ? "bg-gray-400" : ""}`}
                                                            onClick={() => {
                                                                if (item.key === selectedValue) setSelectedValue("")
                                                                else setSelectedValue(item.key);
                                                            }}
                                                        >
                                                            {item.label}
                                                        </DropdownItem>
                                                    ))}
                                                </DropdownMenu>
                                            </Dropdown>


                                        </div>
                                    </div>
                                </form>


                            </ModalBody>
                            <ModalFooter className="flex flex-row mt-1">
                                <button className="flex w-full flex-row gap-2 justify-start items-center rounded-lg bg-gradient-to-r from-blue-300 to-purple-500 px-3 py-1 cursor-pointer"
                                    onClick={(e) => handleSuggestion(e)}
                                >
                                    <Image
                                        src="/ai-technology.png"
                                        alt="AI icon"
                                        width={0}
                                        height={0}
                                        unoptimized
                                        className="w-[2em] h-auto object-contain"
                                    />
                                    <p className="text-lg font-semibold text-start">Gợi ý sản phẩm phù hợp</p>
                                </button>
                                <button
                                    onClick={(e) => {
                                        //    onClose()
                                        handleSearch(e);
                                    }}
                                    className="ursor-pointer text-white end-1.5 top-1 bottom-1 bg-ctBlue-header hover:bg-ctBlue-header shadow-md focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4"
                                >
                                    Tìm kiếm
                                </button>


                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    );
}