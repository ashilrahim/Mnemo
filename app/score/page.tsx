"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"

const page = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        setLoading((prev) => !prev) // toggles true/false
    }



    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-8 rounded-2xl shadow-lg text-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
                <h2 className="text-2xl font-bold mb-2">🎉 Quiz Complete!</h2>
                <p className="text-xl mb-4">
                    Your Score: <span className="font-extrabold">5</span> / 10
                </p>
                <Button
                    onClick={handleClick}
                    className="flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                        
                            <Spinner /> Uploading...
                        </>
                    ) : (
                        "Upload"
                    )}
                </Button>
            </div>
        </div>
    )
}

export default page