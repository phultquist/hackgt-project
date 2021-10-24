const SideBarItem = ({ name, href, children, selected }) => {
    return (
        <li>
            <a
                class={`inline-flex items-center w-full px-4 py-2 mt-1 text-base text-gray-900 transition duration-500 ease-in-out transform rounded-lg ${selected ? "bg-gray-100" : "hover:bg-gray-50"} focus:shadow-outline`}
                href={href}
            >
                {children}
                <span class="ml-4">{name}</span>
            </a>
        </li>
    )
}

const SideBar = ({ currentPage }) => {
    console.log(currentPage);
    return (
        <div class="flex h-screen overflow-hidden bg-white rounded-lg">
            <div class="hidden md:flex md:flex-shrink-0">
                <div class="flex flex-col w-64">
                    <div class="
            flex flex-col flex-grow
            pt-5
            overflow-y-auto
            bg-white
            border-r border-gray-100
            ">
                        <div class="flex flex-col flex-grow px-4 mt-5">
                            <nav class="flex-1 space-y-1 bg-white">
                                <ul>
                                    <SideBarItem
                                        name="Map"
                                        href="/"
                                        selected={currentPage === "/"}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                    </SideBarItem>
                                    <SideBarItem
                                        name="History"
                                        href="/history"
                                        selected={currentPage === "/history"}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </SideBarItem>
                                    <SideBarItem
                                        name="Graphs"
                                        href="/graphs"
                                        selected={currentPage === "/graphs"}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </SideBarItem>
                                    <SideBarItem
                                        name="Settings"
                                        href="/settings"
                                        selected={currentPage === "/settings"}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </SideBarItem>
                                </ul>
                            </nav>
                        </div>
                        <div class="flex flex-shrink-0 p-4 px-4 bg-gray-50">
                            <a href="/settings" class="flex-shrink-0 block w-full group">
                                <div class="flex items-center">
                                    <div>
                                        <img class="inline-block rounded-full h-9 w-9" src="/profile.png" alt="" />
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm font-medium text-gray-900">Good Days Cafe</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SideBar;
