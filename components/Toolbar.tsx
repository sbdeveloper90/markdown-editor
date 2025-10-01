"use client"

import Image from "next/image";

interface ToolbarProps {
    content: string
    onContentChange: (content: string) => void
    onExportPDF: () => void
}

export default function Toolbar({ content, onContentChange, onExportPDF }: ToolbarProps) {
    const handleOpenFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && file.name.endsWith('.md')) {
            const text = await file.text()
            onContentChange(text)
        }
    }

    const handleExportMD = () => {
        const blob = new Blob([content], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'markdown-editor.md'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <div className="bg-gray-800 text-white p-4 flex items-center gap-4 border-b border-gray-700">
            <Image
                className="invert"
                src="/markdown_icon.png"
                alt="Markdown Logo"
                width={48}
                height={48}
                priority={true}
            />
            <h1 className="text-xl font-bold">Markdown Live Editor</h1>
            
            <div className="flex gap-2 ml-auto">
                <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded cursor-pointer transition">
                Apri File
                <input
                    type="file"
                    accept=".md"
                    onChange={handleOpenFile}
                    className="hidden"
                />
                </label>

                <button
                onClick={handleExportMD}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded cursor-pointer transition"
                >
                Esporta MD
                </button>

                <button
                onClick={onExportPDF}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded cursor-pointer transition"
                >
                Esporta PDF
                </button>
            </div>
        </div>
    )
}