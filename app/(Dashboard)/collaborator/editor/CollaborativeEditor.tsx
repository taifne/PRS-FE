'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

import { useEffect, useState } from 'react';

// Toolbar Button Component
const ToolbarButton = ({
    onClick,
    isActive = false,
    disabled = false,
    children,
    title
}: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title?: string;
}) => (
    <button
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={`
      p-2 rounded-lg transition-all duration-200
      ${isActive
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `}
    >
        {children}
    </button>
);

export default function CollaborativeEditor() {
    const [provider, setProvider] = useState<WebrtcProvider | null>(null);
    const [ydoc] = useState(() => new Y.Doc());
    const [userName] = useState(() => `User ${Math.floor(Math.random() * 1000)}`);
    const [userColor] = useState(() =>
        '#' + Math.floor(Math.random() * 16777215).toString(16)
    );
    const [isConnecting, setIsConnecting] = useState(true);

    useEffect(() => {
        const p = new WebrtcProvider('your-doc-id', ydoc, {
            signaling: ['wss://signaling.yjs.dev'], // Public signaling server
        });

        p.on('status', (event: { connected: boolean }) => {
            setIsConnecting(!event.connected);
        });

        setProvider(p);

        return () => {
            p.destroy();
        };
    }, [ydoc]);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 underline',
                },
            }),
            Image.configure({
                inline: true,
                HTMLAttributes: {
                    class: 'max-w-full rounded-lg shadow-md',
                },
            }),
            Placeholder.configure({
                placeholder: 'Start writing or collaborate with others...',
            }),
            Collaboration.configure({
                document: ydoc,
            }),
            ...(provider
                ? [
                    CollaborationCursor.configure({
                        provider,
                        user: {
                            name: userName,
                            color: userColor,
                        },
                    }),
                ]
                : []),
        ],
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[500px] text-gray-900', // Add text-gray-900
            },
        },
        immediatelyRender: false,

    });

    const addImage = () => {
        const url = window.prompt('Enter image URL:');
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const addLink = () => {
        const url = window.prompt('Enter URL:');
        if (url && editor) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    if (!editor || !provider) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-800">
                                Collaborative Editor
                            </h1>
                            <p className="text-sm text-gray-500">
                                Real-time collaboration with {isConnecting ? 'connecting...' : 'connected'}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: userColor }}
                            />
                            <span className="text-sm text-gray-600">
                                {userName}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-2">
                    <div className="flex flex-wrap gap-1">
                        {/* Text Formatting */}
                        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                isActive={editor.isActive('bold')}
                                title="Bold (Ctrl+B)"
                            >
                                <strong>B</strong>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                isActive={editor.isActive('italic')}
                                title="Italic (Ctrl+I)"
                            >
                                <em>I</em>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                isActive={editor.isActive('underline')}
                                title="Underline (Ctrl+U)"
                            >
                                <u>U</u>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleStrike().run()}
                                isActive={editor.isActive('strike')}
                                title="Strikethrough"
                            >
                                <s>S</s>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleHighlight().run()}
                                isActive={editor.isActive('highlight')}
                                title="Highlight"
                            >
                                <span className="bg-yellow-200 px-1">H</span>
                            </ToolbarButton>
                        </div>

                        {/* Headings */}
                        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                isActive={editor.isActive('heading', { level: 1 })}
                                title="Heading 1"
                            >
                                H1
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                isActive={editor.isActive('heading', { level: 2 })}
                                title="Heading 2"
                            >
                                H2
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                isActive={editor.isActive('heading', { level: 3 })}
                                title="Heading 3"
                            >
                                H3
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().setParagraph().run()}
                                isActive={editor.isActive('paragraph')}
                                title="Paragraph"
                            >
                                ¶
                            </ToolbarButton>
                        </div>

                        {/* Lists */}
                        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                isActive={editor.isActive('bulletList')}
                                title="Bullet List"
                            >
                                • List
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                isActive={editor.isActive('orderedList')}
                                title="Numbered List"
                            >
                                1. List
                            </ToolbarButton>
                        </div>

                        {/* Alignment */}
                        <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                            <ToolbarButton
                                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                                isActive={editor.isActive({ textAlign: 'left' })}
                                title="Align Left"
                            >
                                ←
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                                isActive={editor.isActive({ textAlign: 'center' })}
                                title="Center"
                            >
                                ↔
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                                isActive={editor.isActive({ textAlign: 'right' })}
                                title="Align Right"
                            >
                                →
                            </ToolbarButton>
                        </div>

                        {/* Media & Links */}
                        <div className="flex gap-1">
                            <ToolbarButton
                                onClick={addLink}
                                isActive={editor.isActive('link')}
                                title="Add Link"
                            >
                                🔗
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={addImage}
                                title="Add Image"
                            >
                                🖼️
                            </ToolbarButton>
                        </div>

                        {/* Undo/Redo */}
                        <div className="flex gap-1 ml-auto">
                            <ToolbarButton
                                onClick={() => editor.chain().focus().undo().run()}
                                disabled={!editor.can().undo()}
                                title="Undo (Ctrl+Z)"
                            >
                                ↩️
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() => editor.chain().focus().redo().run()}
                                disabled={!editor.can().redo()}
                                title="Redo (Ctrl+Y)"
                            >
                                ↪️
                            </ToolbarButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Editor Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-8">
                        <EditorContent editor={editor} />
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="mt-4 text-sm text-gray-500 text-center">
                    {editor.storage.characterCount?.characters() || 0} characters •{' '}
                    {editor.storage.characterCount?.words() || 0} words
                </div>
            </div>
        </div>
    );
}