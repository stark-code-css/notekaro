import Link from "next/link"
import { useRouter } from "next/navigation"
import { MdDelete, MdEdit } from "react-icons/md"


export default function Post(props: {
    id: string,
    title: string,
    content: string,
    refreshFunction: any
}) {

    const router = useRouter()
    
    async function deleteHandler(id: string) {
        try {
            const res = await fetch('/api/notes/' + id, {
                method: 'DELETE', 
                headers: {
                    'content-type':'application/json'
                }
            })
            if (!res.ok) {
                throw new Error("Failed to delete.")
            }
            props.refreshFunction(id)
        } catch (err) {
            console.log(err)
            return;
        }
    }

    return (
        <div
            className="bg-elevated-black 
            w-1/2 
            px-8 
            rounded-lg 
            min-h-32 
            mb-6 
            flex 
            flex-col 
            justify-center 
            hover:shadow-[10px_10px_15px_-3px] 
            hover:shadow-blue-500/20
            max-[640px]:w-5/6"
        >
            <div className="flex justify-between mt-6 mb-4">
                <div className="text-3xl font-semibold">{props.title}</div>
                <div>
                    <button className="inline-flex justify-center items-center rounded-md hover:bg-zinc-700 w-10 h-10 mr-2"><Link href={'/edit/' + props.id} ><MdEdit size={24}/></Link></button>
                    <button onClick={()=>deleteHandler(props.id)} className="inline-flex justify-center items-center rounded-md hover:bg-zinc-700 w-10 h-10"><MdDelete size={24} /></button>
                </div>
            </div>
            <div className="text-lg font-light mb-8">{props.content}</div>
        </div>
    )
}