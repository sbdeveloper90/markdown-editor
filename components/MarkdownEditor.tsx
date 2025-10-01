"use client"

import Editor from "@monaco-editor/react"
import { options } from "marked"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"

interface MarkdownEditorProps {
    content: string
    onContentChange: (value: string) => void
    previewRef: React.RefObject<HTMLDivElement>
}

export default function MarkdownEditor({ content, onContentChange, previewRef }: MarkdownEditorProps) {
    const handleEditorChange = (value: string | undefined) => {
        onContentChange(value || '')
    }

    return (
        <div className="flex h-[calc(100vh-64px)]">
            {/* Editor Column */}
            <div className="w-1/2 border-r border-gray-300">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
                    <h2 className="font-semibold text-gray-700">Editor</h2>
                </div>
                <Editor
                height="calc(100vh - 112px)"
                defaultLanguage="markdown"
                value={content}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
                />
            </div>

            {/* Preview Column */}
            <div className="w-1/2 overflow-auto">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
                    <h2 className="font-semibold text-gray-700">Anteprima</h2>
                </div>
                <div ref={previewRef} className="p-6 prose prose-slate max-w-none" id="html_content">
                    <ReactMarkdown
                        components={{
                        h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-4 mt-6" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mb-3 mt-5" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-2xl font-bold mb-2 mt-4" {...props} />,
                        h4: ({ node, ...props }) => <h4 className="text-xl font-bold mb-2 mt-3" {...props} />,
                        h5: ({ node, ...props }) => <h5 className="text-lg font-bold mb-1 mt-2" {...props} />,
                        h6: ({ node, ...props }) => <h6 className="text-base font-bold mb-1 mt-2" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-4 leading-7" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                        li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                        blockquote: ({ node, ...props }) => (
                            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700" {...props} />
                        ),
                        code: ({ node, inline, ...props }) =>
                            inline ? (
                            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props} />
                            ) : (
                            <code className="block bg-gray-100 p-4 rounded my-4 overflow-x-auto font-mono text-sm" {...props} />
                            ),
                        pre: ({ node, ...props }) => <pre className="bg-gray-100 p-4 rounded my-4 overflow-x-auto" {...props} />,
                        a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
                        img: ({ node, ...props }) => <img className="max-w-full h-auto my-4 rounded" {...props} />,
                        hr: ({ node, ...props }) => <hr className="my-8 border-gray-300" {...props} />,
                        table: ({ node, ...props }) => (
                            <div className="overflow-x-auto my-4">
                                <table className="min-w-full border-collapse border border-gray-300" {...props} />
                            </div>
                        ),
                        thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
                        tbody: ({ node, ...props }) => <tbody {...props} />,
                        tr: ({ node, ...props }) => <tr className="border-b border-gray-300" {...props} />,
                        th: ({ node, ...props }) => <th className="border border-gray-300 px-4 py-2 text-left font-semibold" {...props} />,
                        td: ({ node, ...props }) => <td className="border border-gray-300 px-4 py-2" {...props} />,
                        }}
                        remarkPlugins={[remarkGfm, [remarkRehype, { allowDangerousHtml: true }]]}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    )
}