"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    
    const router = useRouter()
    
    const SubmitHandler = async (e: React.FormEvent) => {
        
        const data = {title, description}

        e.preventDefault();
        if (!data.title || !data.description) {
            setError("Please fill all the fields correctly.");
            return;
        }
        setError("");

        try {
            setLoading(true);

            const response = await fetch('/api/notes', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Failed to create note.")    
            }

            router.push('/');

        } catch (err) {
            console.log(err);
            setError("Something went wrong. Please try again.");
        }
        finally {
            setLoading(false);
        }

    }

    const ResetHandler = (e: React.FormEvent) => {
        e.preventDefault();
        setTitle("");
        setDescription("");
        setError("");
    }

    return (
        <div className="my-16 flex flex-col items-center justify-center">
            <div className="text-4xl my-4 font-semibold">Create Note</div>
            <form className="flex flex-col items-center justify-center">
                {loading && <p className="my-2">Loading...</p>}
                <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="h-12 w-96 my-2 px-4 py-2 bg-background-black border border-zinc-700 focus:border-zinc-400 outline-none  rounded-md " placeholder="Title" />
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="h-32 w-96 my-2 px-4 py-2 bg-background-black border border-zinc-700 focus:border-zinc-400 outline-none rounded-md " placeholder="Description"></textarea>
                {error && <p className="my-2 text-red-400">{error}</p>}
                <div>
                    <button onClick={SubmitHandler} type="submit" className="h-10 w-32 m-2 bg-font-white text-black hover:bg-zinc-300 font-bold rounded-md">Create</button>
                    <button onClick={ResetHandler} className="h-10 w-32 m-2 border border-zinc-700 hover:bg-zinc-700 text-white font-bold rounded-md">Reset</button>
                </div>
            </form>
        </div>
    );
}