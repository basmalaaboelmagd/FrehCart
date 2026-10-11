'use client'
import React from 'react'

export default function error({ error }: { error: Error }) {

    return (
        <div className="h-screen flex items-center justify-center rounded-2xl w-[90%] p-5">
            <h1 className="text-xl bg-red-300">
                {error.message}
            </h1>
        </div>
    )
};