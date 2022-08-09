import Link from 'next/link';
export default function NavBar(){
    return(
        <div className="fixed w-full h-10 z-50 bg-slate-400 top-0 flex justify-between items-center">
            <span className="text-2xl ml-10"> Movies App</span>
            <div className='flex justify-center items-center mr-10 space-x-4'>
                <Link href="/">
                    <a className='text-xl'>Home</a>
                </Link>
                <Link href="/movies/">
                    <a className='text-xl'>Movies</a>
                </Link>
                <Link href="/series">
                    <a className='text-xl'>Series</a>
                </Link>
                <div className='pl-10 space-x-3 text-sm font-semibold'>
                    <span className='cursor-pointer'>Sign In </span>
                    <span className='bg-green-600 cursor-pointer rounded-xl text-white px-3 py-1'>Sign Up</span>
                </div>
            </div>
        </div>
    )
}