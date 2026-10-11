import { Heart, LogIn, Menu, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
    return (
        <>
            <div className="bg-gray-100">
                <div className="w-[90%] mx-auto p-5 flex justify-between items center">

                    <div className="left-nav flex items-center gap-5">

                        <Link href="/" className="logo flex items-center gap-1">
                            <ShoppingCart color="green" />
                            <h2 className="font-semibold text-2xl">fresh cart</h2>
                        </Link>

                        <ul className="hidden lg:flex items-center gap-5">
                            <li>
                                <Link
                                    className="hover:text-green-300 transition-all duration-500"
                                    href="/products"
                                >
                                    Products
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="hover:text-green-300 transition-all duration-500"
                                    href="/categories"
                                >
                                    Categories
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className="hover:text-green-300 transition-all duration-500"
                                    href="/brands"
                                >
                                    Brands
                                </Link>
                            </li>
                        </ul>

                    </div>

                    <div className="right-nav">
                        <ul className="hidden lg:flex items-center gap-5">
                            <li >
                                <Link
                                    className="flex items-center gap-1 hover:text-green-600  transition-all duration-300"
                                    href="/wishlist"
                                >
                                    Wishlist
                                    <Heart className='hover:fill-green-600' fill="black" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="flex items-center gap-1 hover:text-green-600  transition-all duration-300"
                                    href="/cart"
                                >
                                    Cart
                                    <ShoppingCart className='hover:fill-green-600' />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="flex items-center gap-1 hover:text-green-600  transition-all duration-300"
                                    href="/login"
                                >
                                    Login
                                    <LogIn />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="flex items-center gap-1 hover:text-green-600  transition-all duration-300"
                                    href="/register"
                                >
                                    Registar

                                </Link>
                            </li>
                        </ul>
                    </div>


                    <DropdownMenu>
                        <DropdownMenuTrigger className='cursor-pointer lg:hidden' render={<Button variant="outline" />}>
                            <Menu />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem><li>
                                    <Link
                                        className="hover:text-green-300 transition-all duration-500"
                                        href="/products"
                                    >
                                        Products
                                    </Link>
                                </li></DropdownMenuItem>
                                <DropdownMenuItem>
                                    <li>
                                        <Link
                                            className="hover:text-green-300 transition-all duration-500"
                                            href="/categories"
                                        >
                                            Categories
                                        </Link>
                                    </li></DropdownMenuItem>
                                <DropdownMenuItem><li>
                                    <Link
                                        className="hover:text-green-300 transition-all duration-500"
                                        href="/brands"
                                    >
                                        Brands
                                    </Link>
                                </li></DropdownMenuItem>
                                <DropdownMenuItem><li >
                                    <Link
                                        className="flex items-center gap-1 hover:text-green-600  transition-all duration-300"
                                        href="/wishlist"
                                    >
                                        Wishlist
                                        <Heart className='hover:fill-green-600' fill="black" />
                                    </Link>
                                </li></DropdownMenuItem>
                                <DropdownMenuItem><li>
                                    <Link
                                        className="flex items-center gap-1 hover:text-green-600  transition-all duration-300"
                                        href="/cart"
                                    >
                                        Cart
                                        <ShoppingCart className='hover:fill-green-600' />
                                    </Link>
                                </li></DropdownMenuItem>
                                <DropdownMenuItem><li>
                                    <Link
                                        className="flex items-center gap-1 hover:text-green-600  transition-all duration-300"
                                        href="/login"
                                    >
                                        Login
                                        <LogIn />
                                    </Link>
                                </li></DropdownMenuItem>
                                <DropdownMenuItem><li>
                                    <Link
                                        className="flex items-center gap-1 hover:text-green-600  transition-all duration-300"
                                        href="/register"
                                    >
                                        Register

                                    </Link>
                                </li></DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </>
    )
}