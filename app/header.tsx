import Link from "next/link";

export default function Header() {
    return (
        <div className="bg-background-black h-16 flex items-center justify-between">
            <Link href={'/'} className="mx-8 text-3xl font-bold">NoteKaro.</Link>
            <Link href={'/create'} className="h-9 w-32 mx-8 hover:bg-gray-200 hover:text-black border border-gray-200 flex items-center justify-center rounded-md">Create Note</Link>
        </div>
    )
}