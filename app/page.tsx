"use client";
import Post from "./post";
import { useEffect, useState } from "react";
import { Notes } from "@/lib/interfaces";

export default function Home() {

  const [notes, setNotes] = useState<Notes[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Boolean>(false);

  const refresh = async (id: string) => {
    setNotes((prevNotes) => {
      return prevNotes?.filter((e) => e.$id !== id);
    })
  }

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/notes')
        if (!response.ok) {
          throw new Error("Failed to fetch notes.")
        }
        const data = await response.json()
        setNotes(data);
      } catch (err) {
        console.log(err)
        setError(true)
      }
      finally {
        setLoading(false)
      }
    }
    fetchNotes();
  }, [])


  return (
    <div className="max-[640px]:mt-8 mt-16 flex flex-col items-center justify-center">
      {
        error && <p> Failed to fetch data. Please try reloading the page. </p>
      }
      {
        notes.length == 0 && <p>No Notes Found !</p>
      }
      {
        loading ? (<p>Loading...</p>) : (notes.map((note) =>
          <Post key={note.$id}
          id={note.$id}
          title={note.title}
          content={note.description}
          refreshFunction={refresh} />))
      }
    </div>
  );
}