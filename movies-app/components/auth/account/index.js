import NavBar from "../../shared/navBar";
import Head from "next/head";
import {useRouter} from "next/router";
import Link from "next/link";
import { Fragment, useState } from 'react'
import {useSelector} from "react-redux";
import { Dialog, Transition } from '@headlessui/react'
import {updProfile} from "../../../firebase";

const NavigationList = () => {
    const router = useRouter();
    const activeTabBorderPos =  router?.asPath.split("#")[1] ==="settings" ? "top-20 " :
        router?.asPath.split("#")[1] ==="bookmarks" ? "top-10" :"top-0" ;

    return(
            <div className="w-1/6 h-40 flex flex-col rounded shadowType3 relative">
                <span className={"absolute right-0 duration-200 bg-opacity-0 w-3 h-10 border-r-2 border-baseColor "+activeTabBorderPos}>
                </span>
                <div className="w-full h-10 pr-1">
                    <Link href={"#profile"}>
                        <a className=" text-baseColor rounded-tl font-Signika font-bold cursor-pointer duration-200 group
                        flex w-full items-center space-x-2 px-4 py-2 text-sm
                        hover:bg-baseColor hover:text-background">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Profile</span>
                        </a>
                    </Link>
                </div>
                <div className="w-full h-10 pr-1">
                    <Link href={"#bookmarks"}>
                        <a className="text-baseColor font-Signika font-bold cursor-pointer duration-200
                        hover:bg-baseColor hover:text-background group
                        flex w-full items-center space-x-2 px-4 py-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>
                            <span>Bookmarks</span>
                        </a>
                    </Link>
                </div>
                <div className="w-full h-10 pr-1">

                    <Link href={"#settings"}>
                        <a className="text-baseColor  font-Signika font-bold cursor-pointer duration-200
                        hover:bg-baseColor hover:text-background group
                        flex w-full items-center space-x-2 px-4 py-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Settings</span>
                        </a>
                    </Link>
                </div>
                <div className="w-full h-10">
                    <div className="text-baseColor rounded-b font-Signika font-bold cursor-pointer duration-200 hover:bg-baseColor hover:text-background group
                                flex w-full items-center space-x-2 px-4 py-2 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        <span>Sign Out</span>
                    </div>
                </div>

            </div>


    )
}

const ProfTab = ()=>{
    const {user} = useSelector(state => state.auth);

    const [isOpen, setIsOpen] = useState(false);
    const [newImg, setNewImg] = useState(null);
    const [newName, setNewName] = useState(user?.displayName);

    const handleSetNewImg = (e) =>{
        setNewImg(e.target.src);
        setIsOpen(false);
    }
    const handleSetNewName = (e) =>{
        setNewName(e.target.value);
    }
    const handleSetProfile = async () =>{
        await updProfile(newName,newImg);
        console.log(newName,newImg);
    }
    console.log(user);
    return(
        <>
            <div className="w-full flex flex-col my-5 ml-10">
                <h1 className="text-lg font-Signika font-bold text-baseColor">
                    Avatar Picture
                </h1>
                <div id="profileImgBox" className="relative flex justify-center items-center cursor-pointer"
                     onClick={() => setIsOpen(true)}>
                    <img id="profileImg" src={newImg !== null ? newImg : user?.photoURL} onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src=user?.photoURL;
                    }}
                     className="w-40 h-40 mt-2 rounded-full duration-200"
                    />
                    <span id="editIcon" className="absolute text-white z-30 opacity-0 duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                             className="w-10 h-10">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>

                    </span>
                </div>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <div className="w-full h-full flex flex-wrap items-center justify-around space-x-5 ">
                                            <img onClick={handleSetNewImg} className="w-20 h-20 rounded-full cursor-pointer"
                                                 src={"https://i.imgur.com/tfnVE8n.png"} />
                                            <img onClick={handleSetNewImg} className="w-20 h-20 rounded-full cursor-pointer"
                                                 src={"https://emi9d8rzue7.exactdn.com/wp-content/uploads/2021/06/Luca-Profile-Avatars-3.png?strip=all&lossy=1&resize=800%2C800&ssl=1"} />
                                            <img onClick={handleSetNewImg} className="w-20 h-20 rounded-full cursor-pointer"
                                                 src={"https://whatsondisneyplus.com/wp-content/uploads/2021/08/captain-carter-avatar.png"}/>
                                            <img onClick={handleSetNewImg} className="w-20 h-20 rounded-full cursor-pointer"
                                                 src={"https://emi9d8rzue7.exactdn.com/wp-content/uploads/2022/06/Doctor-Strange-Avatar.png?strip=all&lossy=1&ssl=1"}/>
                                            <img onClick={handleSetNewImg} className="w-20 h-20 rounded-full cursor-pointer"
                                                 src={"https://emi9d8rzue7.exactdn.com/wp-content/uploads/2021/05/Bad-Batch-Avatar-icons-2.png?strip=all&lossy=1&resize=800%2C800&ssl=1"} />
                                            <img onClick={handleSetNewImg} className="w-20 h-20 rounded-full cursor-pointer"
                                                 src={"https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQWTOiSdn-SPeQ4o8r5Ry-16ZEi8KuacxN2tJQfnwODV3o-rcQlWNzTyOFoXgfNUU2lUBt3WBguY1B8y5vkzPYLMPvItkfBNf4WxDvU9egNLnthoRWapoPULJD-cVViN4bY9FJLhmBHhYYyedFoztdUg3.jpg?r=ac6"}/>
                                            <img onClick={handleSetNewImg} className="w-20 h-20 rounded-full cursor-pointer"
                                                 src={"https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQcsPNjhzgqsMall988fPnO0I2E1p8wv02reGhiaHKAu7_2GKo-t03DNTBMdUkGgDIfCJSV8uF-N0MHJHVxtkypu3Ia3uBV8oWg1v6CDebfiBv92Qzw_BfZHKtXXKiZFcTWo4Q2Fp9ycKwPsUbeLmNfJg.jpg?r=1e4"}/>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
                <div className="mt-10">
                    <h1 className="text-lg font-Signika font-bold text-baseColor mb-2">
                        Profile Name
                    </h1>
                    <div>
                        <input placeholder={user?.displayName} value={newName} onChange={handleSetNewName}
                        className="bg-gray-300 shadowType1 font-Signika text-background font-bold  pl-2 duration-200 rounded outline-none placeholder:text-background font-bold
                        focus:outline-offset-1 focus:outline-baseColor"/>
                    </div>
                </div>
                <button onClick={handleSetProfile} className="mt-10 w-20 h-5 px-3 py-4 flex justify-center items-center rounded shadowType1 cursor-pointer bg-green-600 font-Signika text-white">
                    Save
                </button>
            </div>
        </>
    )
}
const BookmarksTab = ()=>{
    return(
        <>
            BookmarksTab
        </>
    )
}
const SettingsTab = ()=>{
    return(
        <>
            SettingsTab
        </>
    )
}



export default function AccountComp(){

    const router = useRouter();
    const activeTab = router.asPath.split("#")[1];
    return (
        <>
            <Head>
                <title>Movies App - Account</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className="flex w-screen h-screen inset-0 justify-center items-center mt-5">
                <div className="absolute w-3/4 h-5/6 flex space-x-3 disableSelect">
                    <NavigationList/>
                    <div className="w-5/6 h-full  rounded shadowType3">
                        <div id="profTab" className={activeTab === "profile" ? "inline-block" : "hidden"}>
                            <ProfTab/>
                        </div>
                        <div className={activeTab === "bookmarks" ? "inline-block" : "hidden"}>
                            <BookmarksTab/>
                        </div>
                        <div className={activeTab === "settings" ? "inline-block" : "hidden"}>
                            <SettingsTab/>
                        </div>
                    </div>
                </div>
            </div>
            <NavBar/>
        </>
    )

}