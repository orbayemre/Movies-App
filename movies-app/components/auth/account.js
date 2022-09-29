import NavBar from "../shared/navBar";
import Head from "next/head";
import {useRouter} from "next/router";
import Link from "next/link";
import {Fragment, useState} from 'react'
import {useSelector} from "react-redux";
import { Dialog, Transition } from '@headlessui/react'
import {
    deleteAccount,
    getBookmarks,
    sendEmailVery,
    signOut,
    updEmail,
    updPassword,
    updProfile
} from "../../firebase";
import toast,{Toaster} from "react-hot-toast";
import Footer from "../shared/footer";

const NavigationList = () => {
    const router = useRouter();
    const activeTabBorderPos =  router?.asPath.split("#")[1] ==="settings" ? "top-20 " :
        router?.asPath.split("#")[1] ==="bookmarks" ? "top-10" :"top-0" ;
    const handleSignOut = async ()=>{
        await signOut();
        await router.push("/");
    }
    return(
            <div className="lg:w-1/6 md:w-2/6 w-auto h-auto md:ml-0 ml-10 flex sm:flex-col flex-row rounded shadowType3 relative">
                <span className={"sm:inline-block hidden absolute right-0 duration-200 bg-opacity-0 w-3 h-10 border-r-2 border-baseColor "+activeTabBorderPos}>
                </span>
                <div className="w-full h-10 pr-1">
                    <Link href={"#profile"}>
                        <a className=" text-baseColor rounded-tl font-Signika font-bold cursor-pointer duration-200 group
                        flex w-full items-center space-x-2 px-4 py-2 md:text-sm text-xsm
                        hover:bg-baseColor hover:text-background">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="sm:inline-block hidden ">Profile</span>
                        </a>
                    </Link>
                </div>
                <div className="w-full h-10 pr-1">
                    <Link href={"#bookmarks"}>
                        <a className="text-baseColor font-Signika font-bold cursor-pointer duration-200
                        hover:bg-baseColor hover:text-background group
                        flex w-full items-center space-x-2 px-4 py-2 md:text-sm text-xsm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>
                            <span className="sm:inline-block hidden ">Bookmarks</span>
                        </a>
                    </Link>
                </div>
                <div className="w-full h-10 pr-1">

                    <Link href={"#settings"}>
                        <a className="text-baseColor  font-Signika font-bold cursor-pointer duration-200
                        hover:bg-baseColor hover:text-background group
                        flex w-full items-center space-x-2 px-4 py-2 md:text-sm text-xsm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="sm:inline-block hidden ">Settings</span>
                        </a>
                    </Link>
                </div>
                <div className="w-full h-10">
                    <div onClick={handleSignOut} className="cursor-pointer text-baseColor rounded-b font-Signika font-bold cursor-pointer duration-200 hover:bg-baseColor hover:text-background group
                                flex w-full items-center space-x-2 px-4 py-2 md:text-sm text-xsm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        <span className="sm:inline-block hidden ">Sign Out</span>
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
    }
    return(
        <>
            <div className="w-full flex flex-col my-5 ml-10">
                <h1 className="text-lg font-Signika font-bold text-baseColor">
                    Avatar Picture
                </h1>
                <div id="profileImgBox" className="relative flex justify-center items-center cursor-pointer"
                     onClick={() => setIsOpen(true)}>
                    {!user?.photoURL && !newImg?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-baseColor w-40 h-40">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    :
                    <img id="profileImg" src={newImg !== null ? newImg : user?.photoURL} onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src=user?.photoURL;
                    }}
                     className="w-40 h-40 mt-2 rounded-full duration-200"
                    />}
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
    const [bookmarks,setBookmarks] = useState([])
    getBookmarks().then(({bookmarks})=> {setBookmarks(bookmarks);});
    return(
        <div className="w-full flex flex-wrap justify-start items-center sm:mt-0 mt-5 sm:px-4">
            {bookmarks?.map(bookmark=>{
                function map(val, minA, maxA, minB, maxB) {
                    return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
                }
                function Card3D(card, ev) {
                    let img = card.querySelector('img');
                    let imgRect = card.getBoundingClientRect();
                    let width = imgRect.width;
                    let height = imgRect.height;
                    let mouseX = ev.offsetX;
                    let mouseY = ev.offsetY;
                    let rotateY = map(mouseX, 0, 180, -25, 25);
                    let rotateX = map(mouseY, 0, 250, 25, -25);
                    let brightness = map(mouseY, 0, 250, 1.5, 0.5);

                    img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    img.style.filter = `brightness(${brightness})`;
                }
                var cards = document.querySelectorAll('.card3d');
                cards.forEach((card) => {
                    card.addEventListener('mousemove', (ev) => {
                        Card3D(card, ev);
                    });

                    card.addEventListener('mouseleave', () => {
                        let img = card.querySelector('img');
                        img.style.transform = 'rotateX(0deg) rotateY(0deg)';
                        img.style.filter = 'brightness(1)';
                    });
                });
                const link = bookmark.media === "movie" ? "/movies/details?id="+bookmark.id :"/series/details?id="+bookmark.id;
                return (
                    <div className="card3d lg:w-36 w-24 rounded-xl md:my-4 my-2 md:mx-4 mx-2 cursor-pointer">
                        <Link href={link}>
                            <a>
                                <img className="w-full h-full z-0 object-cover rounded-xl duration-200" src={"https://image.tmdb.org/t/p/original"+ bookmark.poster}/>
                            </a>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}




const ModalSettings = ({children,setIsOpen,isOpen}) =>{

    return(<Transition appear show={isOpen} as={Fragment}>
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
                            <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all">
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>

    )


}
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


const SettingsTab = ()=>{

    const {user} = useSelector(state => state.auth);
    const [isOpenEmailChangeModal, setIsOpenEmailChangeModal] = useState(false);
    const [isOpenPasswordChangeModal, setIsOpenPasswordChangeModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [newEmail, setNewEmail] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [newPasswordConfirm, setNewPasswordConfirm] = useState(null);

    const handleUpdEmail = async ()=>{
        if(!validateEmail(newEmail)){toast.error("You typed a invalid e-mail address. Please type a valid e-mail!", {style: {background: '#2C3639',color:'#FFC23C',zIndex:99},});}
        else{
            await updEmail(newEmail).then(errorMessage =>{
                if(errorMessage) toast.error(errorMessage, {style: {background: '#2C3639',color:'#FFC23C',zIndex:99},});
                else {
                    setIsOpenEmailChangeModal(false);
                    setNewEmail(null);
                    toast.success("Your e-mail has been changed successfully.",{style: {background: '#2C3639',color:'#FFC23C',zIndex:99},});

                }

            })

        }
    }
    const handleUpdPassword = async ()=>{
        if(!(newPassword === newPasswordConfirm)){toast.error("Passwords do not match. Please type again!", {style: {background: '#2C3639',color:'#FFC23C',zIndex:99},})}
        else if(!newPassword){toast.error("Password is required. Please type a password!", {style: {background: '#2C3639',color:'#FFC23C',zIndex:99},})}
        else{
            await updPassword(newPassword).then(errorMessage =>{
                if(errorMessage) toast.error(errorMessage, {style: {background: '#2C3639',color:'#FFC23C',zIndex:99},});
                else {
                    setNewPassword(null);
                    setNewPasswordConfirm(null);
                    setIsOpenPasswordChangeModal(false);
                    toast.success("Your password has been changed successfully.",{style: {background: '#2C3639',color:'#FFC23C',zIndex:99},});
                }
            });
        }
    }
    const handleDltAccount = async ()=>{
        await deleteAccount().then(errorMessage =>{
            toast.error(errorMessage, {style: {background: '#2C3639',color:'#FFC23C',zIndex:99},});
        });
    }
    const handleSendVerifyEmail = async ()=>{
        await sendEmailVery().then(errorMessage =>{
            toast.error(errorMessage, {style: {background: '#2C3639',color:'#FFC23C',zIndex:99},});
        })
    }
    var providerGoogle;
    user?.providerData?.map(prov => {
        if(prov?.providerId ==="google.com") {providerGoogle = true}
        else {providerGoogle = false}
    })
    return(
        <div className="flex flex-col ">
            <div className="flex flex-col items-start justify-center space-y-8 font-Signika w-full my-5 pl-10">

                { providerGoogle ?
                    <>
                        <h1 className="text-lg  font-bold text-baseColor border-b-2 border-baseColor rounded-bl">E-mail</h1>
                        <div className="flex items-center justify-start space-x-2 w-full mt-3">
                            <img className="w-6 h-6" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"}/>
                            <div className="bg-background/80 font-Signika text-baseColor font-bold w-1/2 duration-200 rounded outline-none placeholder:text-background font-bold
                                focus:outline-offset-1 focus:outline-baseColor">
                                {user?.email}
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <h1 className="text-lg  font-bold text-baseColor border-b-2 border-baseColor rounded-bl">E-mail</h1>
                        <div className="flex items-center justify-start space-x-2 w-1/2 mt-3">
                                <input value={user?.email} readOnly={true}
                                className="bg-background/80 font-Signika text-baseColor font-bold w-1/2 duration-200 rounded outline-none placeholder:text-background font-bold
                                focus:outline-offset-1 focus:outline-baseColor"/>
                                <button onClick={() => setIsOpenEmailChangeModal(true)} className="w-auto h-8 px-4 rounded duration-200 text-background cursor-pointer bg-baseColor shadowType1 text-center border border-baseColor
                                hover:bg-transparent hover:text-baseColor">
                                    Change
                                </button>
                        </div>
                        <ModalSettings setIsOpen={setIsOpenEmailChangeModal} isOpen={isOpenEmailChangeModal}>
                            <div className="disableSelect flex flex-col items-start justify-center space-y-3">
                                <h1 className="text-baseColor font-Signika font-bold text-sm">Enter your new e-mail.</h1>
                                <input value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} className="bg-gray-300 shadowType1  font-Signika text-background font-bold  pl-2  text-sm duration-200 rounded outline-none placeholder:text-background font-bold
                                focus:outline-offset-1 focus:outline-baseColor" type={"text"}/>
                                <button onClick={handleUpdEmail} className="w-full h-8 px-4 rounded duration-200 text-background font-Signika cursor-pointer bg-green-500 shadowType1 text-center
                                hover:bg-green-500/70">
                                    Save
                                </button>
                            </div>
                        </ModalSettings>
                        {user?.emailVerified ===false &&
                            <div className="flex items-center justify-start space-x-3 w-full mt-3">
                                <span className="text-baseColor/80 text-sm">
                                    You haven't verified your e-mail address yet. <br/> Please verify your e-mail address.
                                </span>
                                <button onClick={handleSendVerifyEmail} className="w-auto h-8 px-2 rounded duration-200 text-sm text-background cursor-pointer bg-baseColor shadowType1 text-center border border-baseColor
                                hover:bg-transparent hover:text-baseColor">
                                    Verify
                                </button>
                            </div>
                        }
                    </>
                }
            </div>
            {providerGoogle ? "" :
            <div className="flex flex-col items-start justify-center space-y-4 font-Signika w-full my-5 pl-10">
                    <h1 className="text-lg  font-bold text-baseColor border-b-2 border-baseColor rounded-bl">Password</h1>
                    <button onClick={() => setIsOpenPasswordChangeModal(true)} className="w-auto h-8 px-4 rounded duration-200 text-background cursor-pointer bg-baseColor shadowType1 text-center border border-baseColor
                        hover:bg-transparent hover:text-baseColor">
                        Change Your Password
                    </button>
                <ModalSettings  setIsOpen={setIsOpenPasswordChangeModal} isOpen={isOpenPasswordChangeModal}>
                    <div className="disableSelect flex flex-col items-start justify-center space-y-3">
                        <h1 className="text-baseColor font-Signika font-bold text-sm">Enter your new password.</h1>
                        <input  value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder={"New password"} type={"password"}
                                className="bg-gray-300 shadowType1 font-Signika text-background font-bold  pl-2 text-sm duration-200 rounded outline-none placeholder:text-background font-bold
                                focus:outline-offset-1 focus:outline-baseColor  placeholder:text-background/80 "/>
                        <input value={newPasswordConfirm} onChange={(e)=>setNewPasswordConfirm(e.target.value)} placeholder={"Confirm new password"} type={"password"}
                                className="bg-gray-300 shadowType1 font-Signika text-background font-bold  pl-2 text-sm duration-200 rounded outline-none placeholder:text-background font-bold
                                focus:outline-offset-1 focus:outline-baseColor  placeholder:text-background/80"/>
                        <button onClick={handleUpdPassword}
                                className="w-full h-8 px-4 rounded duration-200 text-background font-Signika cursor-pointer bg-green-500 shadowType1 text-center
                                hover:bg-green-500/70">
                            Save
                        </button>
                    </div>
                </ModalSettings>
            </div>
            }
            <div className="flex flex-col items-start justify-center space-y-4 font-Signika w-96 my-5 ml-10">
                <h1 className="text-lg  font-bold text-red-600 border-b-2 border-red-600 rounded-bl">Danger Zone</h1>
                <button onClick={()=>setIsOpenDeleteModal(true)} className="w-auto h-8 px-4 rounded duration-200 text-background cursor-pointer bg-red-600 shadowType1 text-center border border-red-600
                        hover:bg-transparent hover:text-red-600">
                    Delete your account
                </button>
                <ModalSettings  setIsOpen={setIsOpenDeleteModal} isOpen={isOpenDeleteModal}>
                    <div className="disableSelect flex flex-col items-start justify-center space-y-3">
                        <h1 className="text-red-600 font-Signika font-bold text-sm">Wait,wait,are you sure about that?</h1>
                        <button onClick={handleDltAccount}
                                className="w-full h-8 px-4 rounded duration-200 text-background font-Signika cursor-pointer bg-red-700 shadowType1 text-center
                                hover:bg-red-800">
                            DELETE
                        </button>
                    </div>
                </ModalSettings>
            </div>
        </div>
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
            <div className="flex w-screen h-screen inset-0 md:justify-center md:ml-0 justify-start ml-5 items-center mt-5">
                <div className="absolute sm:w-3/4 w-full h-5/6 flex sm:flex-row flex-col items-start sm:space-x-3 disableSelect">
                    <NavigationList/>
                    <div className="md:w-5/6 w-full rounded">
                        <div id="profTab"  className={(activeTab === "profile" || activeTab === undefined ) ? "inline-block": "hidden"}>
                            <ProfTab/>
                        </div>
                        <div className={activeTab === "bookmarks" ? "inline-block w-full" : "hidden"}>
                            <BookmarksTab/>
                        </div>
                        <div className={activeTab === "settings" ? "inline-block w-full" : "hidden"}>
                            <SettingsTab/>
                        </div>
                    </div>
                </div>
            </div>
            <NavBar/>
            <Toaster/>
            <Footer/>
        </>
    )
}