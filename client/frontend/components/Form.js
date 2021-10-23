import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'

export default function Form({ onSubmit, stores, products }) {
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [selectedSite, setSelectedSite] = useState({});
    const [selectedProduct, setSelectedProduct] = useState({});

    return (
        <div className='pb-10'>
            <form onSubmit={(event) => {
                event.preventDefault();
                console.log(selectedSite, selectedProduct, description);
                if (!selectedSite.name || !selectedProduct.name || !description) {
                    alert("You must select a location, product, and description")
                } else {
                    onSubmit({
                        storeId: selectedSite.slug,
                        productId: selectedProduct.slug,
                        description: description || "No Description",
                        email: email || "No Email"
                    });
                }
            }}>
                <Input name='Store Location' description='Search by Address or ID'>
                    <Dropdown
                        dropdownItems={stores.map(store => {
                            const { street, city, state, postalCode } = store.address;
                            return {
                                name: store.siteName,
                                secondary: `${street} ${city}, ${state} ${postalCode}`,
                                slug: store.id
                            }
                        })}
                        selected={selectedSite}
                        setSelected={setSelectedSite}
                        placeholder='Select a store...'
                    />
                </Input>
                <Input name='Product Affected' description='Search by Name or ID'>
                    <Dropdown
                        dropdownItems={products.map(item => {
                            return {
                                ...item,
                                secondary: item.slug
                            }
                        })}
                        selected={selectedProduct}
                        setSelected={setSelectedProduct}
                        placeholder='Select an item...'
                    />
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

function Dropdown({ dropdownItems, placeholder, selected, setSelected }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        console.log(selected);
    }, [selected]);
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
                dropdownOpen && <div className='border-2 border-gray-200 bg-white mt-1 rounded-md shadow-md absolute w-screen-lg z-50 max-h-60 overflow-scroll'>
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