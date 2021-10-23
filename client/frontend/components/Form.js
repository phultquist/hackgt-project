import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'

export default function Form() {
    const dropdownItems = [
        {
            name: 'Item 1',
            slug: 'item-1',
            address: '517 Hawthorne Ave Bartlett IL'
        },
        {
            name: 'Item 2',
            slug: 'item-2',
            address: '517 Hawthorne Ave Bartlett IL'
        }
    ];

    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div className='pb-10'>
            <form>
                <Input name='Store Location' description='Search by Address or ID'>
                    <Dropdown dropdownItems={dropdownItems} placeholder='Select a store...' />
                </Input>
                <Input name='Product Affected' description='Search by Name or ID'>
                    <Dropdown dropdownItems={dropdownItems.map(item => {
                        return {
                            ...item, secondary: item.address
                        }
                    })} placeholder='Select an item...' />
                </Input>
                <Input name='What Went Wrong?' description='Give as much details as possible'>
                    <div className='border-gray-200 border-2 rounded-md mt-2 overflow-hidden z-0'>
                        <textarea
                            className='p-2 px-4 w-full outline-none'
                            value={description}
                            placeholder='Start typing...'
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </div>
                </Input>
                <Input name='Email (optional)' description='Provide your email to help us refund you'>
                    <div className='border-gray-200 border-2 rounded-md mt-2 overflow-hidden z-0'>
                        <input
                            className='p-2 px-4 w-full outline-none'
                            value={email}
                            placeholder='johndoe@example.com'
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                </Input>
                <input 
                    type="submit"
                    className='w-full bg-black text-white mt-6 p-3 py-4 rounded-md cursor-pointer font-semibold'
                    value="Report to Good Day Vending"
                />
            </form>
        </div>
    )
}

function Dropdown({ dropdownItems, placeholder }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selected, setSelected] = useState({});
    const [inputValue, setInputValue] = useState("");
    return (
        <>
            <div className='border-gray-200 border-2 rounded-md mt-2 overflow-hidden z-0'>
                <input
                    onFocus={() => {
                        setDropdownOpen(true)
                    }}
                    onBlur={() => {
                        setTimeout(() => setDropdownOpen(false), 200);
                        if (selected === undefined || !selected) {
                            setInputValue("");
                        } else if (inputValue !== selected.name) {
                            setInputValue(selected.name || '')
                        }
                    }}
                    placeholder={placeholder}
                    className='p-2 px-4 w-full outline-none'
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                    value={inputValue}
                />
            </div>
            {
                dropdownOpen && <div className='border-2 border-gray-200 bg-white mt-1 rounded-md shadow-md absolute w-screen-lg z-50'>
                    {
                        dropdownItems.filter(item => {
                            if (dropdownItems.some(item => item.name === inputValue)) return true;
                            const trimmedInput = inputValue.trim().toLowerCase()
                            return item.name.trim().toLowerCase().includes(trimmedInput) || item.secondary.trim().toLowerCase().includes(trimmedInput);
                        }).map(item => {
                            return (
                                <DropdownItem
                                    name={item.name}
                                    secondary={item.secondary}
                                    key={item.slug}
                                    // slug={item.slug}
                                    onClick={() => {
                                        console.log('test');
                                        console.log(item);
                                        setSelected(item);
                                        setInputValue(item.name);
                                    }}
                                />
                            )
                        })
                    }
                </div>
            }
        </>
    )
}

function DropdownItem({ name, secondary, onClick }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            className={`p-2 cursor-pointer ${hovered ? "bg-gray-50" : ""}`}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            onClick={() => {
                onClick();
            }}
        >
            {name} <span className='text-gray-400 ml-2'>{secondary}</span>
        </div>
    )
}

function Input({ children, name, description }) {
    return (
        <>
            <h2 className='font-medium text-md pt-4'>{name}</h2>
            <p className='text-gray-400 text-sm'>{description}</p>
            <div className=''>
                {children}
            </div>
        </>
    )
}