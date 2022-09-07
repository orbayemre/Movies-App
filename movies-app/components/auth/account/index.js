import {Provider} from "react-redux";
import stores from "../../../stores";
import NavBar from "../../shared/navBar";
import {useState} from "react";

export default function AccountComp(){

    const [activeTabBorder,setActiveTabBorder] = useState("top-0");
    //
    return(
        <>

            <div className="flex w-screen h-screen inset-0 justify-center items-center mt-5">
                <div className="absolute w-3/4 h-5/6 flex space-x-3 disableSelect">
                    <div className="w-1/6 h-40 flex flex-col rounded shadowType3 relative">
                        <span className={"absolute right-0 duration-200 bg-opacity-0 w-3 h-10 border-r-2 border-baseColor "+ activeTabBorder}>
                        </span>
                        <div className="w-full h-10 pr-1">
                            <div className=" text-baseColor rounded-tl font-Signika font-bold cursor-pointer duration-200 group
                                    flex w-full items-center space-x-2 px-4 py-2 text-sm
                                    hover:bg-baseColor hover:text-background"
                            onClick={()=>setActiveTabBorder("top-0")}>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>
                                Profile
                                </span>

                            </div>
                        </div>
                        <div className="w-full h-10 pr-1">
                            <div className="text-baseColor font-Signika font-bold cursor-pointer duration-200
                            hover:bg-baseColor hover:text-background group
                                    flex w-full items-center space-x-2 px-4 py-2 text-sm"
                                 onClick={()=>setActiveTabBorder("top-10")}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                                <span>
                                Bookmarks
                                </span>

                            </div>
                        </div>
                        <div className="w-full h-10 pr-1">
                            <div className="text-baseColor  font-Signika font-bold cursor-pointer duration-200
                            hover:bg-baseColor hover:text-background group
                                    flex w-full items-center space-x-2 px-4 py-2 text-sm"
                                 onClick={()=>setActiveTabBorder("top-20")}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>
                                Settings
                                </span>
                            </div>
                        </div>
                        <div className="w-full h-10">
                                <div className="text-baseColor rounded-b font-Signika font-bold cursor-pointer duration-200 hover:bg-baseColor hover:text-background group
                                        flex w-full items-center space-x-2 px-4 py-2 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>
                                    <span>
                                    Sign Out
                                    </span>
                                </div>
                            </div>

                    </div>
                    <div className="w-5/6 h-full  rounded shadowType3">

                    </div>
                </div>

            </div>

            <Provider store={stores}>
                <NavBar/>
            </Provider>
        </>
    )
}