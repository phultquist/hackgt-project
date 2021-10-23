const SideBar = () => {
    return (
        <div class="flex h-screen overflow-hidden bg-white rounded-lg">
    <div class="hidden md:flex md:flex-shrink-0">
        <div class="flex flex-col w-64">
            <div class="
            flex flex-col flex-grow
            pt-5
            overflow-y-auto
            bg-white
            border-r border-gray-50
            ">
            <div class="flex flex-col flex-grow px-4 mt-5">
                <nav class="flex-1 space-y-1 bg-white">
                    <ul>
                        <li>
                        <a class="
                            inline-flex
                            items-center
                            w-full
                            px-4
                            py-2
                            mt-1
                            text-base text-gray-900
                            transition
                            duration-500
                            ease-in-out
                            transform
                            rounded-lg
                            bg-gray-50
                            focus:shadow-outline" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            <span class="ml-4">Map</span>
                        </a>
                        </li>
                        <li>
                        <a class="
                            inline-flex
                            items-center
                            w-full
                            px-4
                            py-2
                            mt-1
                            text-base text-gray-900
                            transition
                            duration-500
                            ease-in-out
                            transform
                            rounded-lg
                            focus:shadow-outline
                            hover:bg-gray-50
                            " href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span class="ml-4">History</span>
                        </a>
                        </li>
                        <li>
                        <a class="
                            inline-flex
                            items-center
                            w-full
                            px-4
                            py-2
                            mt-1
                            text-base text-gray-900
                            transition
                            duration-500
                            ease-in-out
                            transform
                            rounded-lg
                            focus:shadow-outline
                            hover:bg-gray-50
                            " href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span class="ml-4">Graphs</span>
                        </a>
                        </li>
                        <li>
                        <a class="
                            inline-flex
                            items-center
                            w-full
                            px-4
                            py-2
                            mt-1
                            text-base text-gray-900
                            transition
                            duration-500
                            ease-in-out
                            transform
                            rounded-lg
                            focus:shadow-outline
                            hover:bg-gray-50
                            " href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span class="ml-4">Settings</span>
                        </a>
                        </li>
                    </ul>


                    {/* <p class="px-4 pt-4 font-medium text-gray-900 uppercase"> Shortcuts </p> */}
                    <ul>
                        {/* <li>
                        <a class="
                            inline-flex
                            items-center
                            w-full
                            px-4
                            py-2
                            mt-1
                            text-base text-gray-900
                            transition
                            duration-500
                            ease-in-out
                            transform
                            rounded-lg
                            focus:shadow-outline
                            hover:bg-gray-50
                            " href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                            <span class="ml-4"> Tasks</span>
                        </a>
                        </li>
                        <li>
                        <a class="
                            inline-flex
                            items-center
                            w-full
                            px-4
                            py-2
                            mt-1
                            text-base text-gray-900
                            transition
                            duration-500
                            ease-in-out
                            transform
                            rounded-lg
                            focus:shadow-outline
                            hover:bg-gray-50
                            " white="" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <span class="ml-4"> Reports</span>
                        </a>
                        </li>
                        <li>
                        <a class="
                            inline-flex
                            items-center
                            w-full
                            px-4
                            py-2
                            mt-1
                            text-base text-gray-900
                            transition
                            duration-500
                            ease-in-out
                            transform
                            rounded-lg
                            focus:shadow-outline
                            hover:bg-gray-50
                            " white="" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                            </svg>
                            <span class="ml-4"> Dashboard</span>
                        </a>
                        </li> */}
                    </ul>
                </nav>
            </div>
            <div class="flex flex-shrink-0 p-4 px-4 bg-gray-50">
                <a href="#" class="flex-shrink-0 block w-full group">
                    <div class="flex items-center">
                        <div>
                        <img class="inline-block rounded-full h-9 w-9" src="https://pbs.twimg.com/profile_images/1426761460357738499/LtQow-mk_400x400.jpg" alt="" />
                        </div>
                        <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">NCR</p>
                        </div>
                    </div>
                </a>
            </div>
            </div>
        </div>
    </div>
    {/* <div class="flex flex-col flex-1 w-0 overflow-hidden">
        <main class="relative flex-1 overflow-y-auto focus:outline-none">
            <div class="py-6">
            <div class="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                <h1 class="text-lg text-neutral-600"> Here is where you put your stuff </h1>
            </div>
            <div class="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                <!-- Put your content here --/>
                <div class="py-4">
                    <div class="rounded-lg bg-gray-50 h-96"></div>
                </div>
                <!-- Do not cross the closing tag underneath this coment--/>
            </div>
            </div>
        </main>
    </div> */}
    </div>
    );
};

export default SideBar;
