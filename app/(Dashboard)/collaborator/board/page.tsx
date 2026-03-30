'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import CreateDocumentModal from './popup/craete';
import { Collaborator } from './popup/type';

// Mock data for documents
const mockDocuments = [
    {
        id: '1',
        title: 'Product Roadmap 2024',
        content: 'Planning and strategy for the upcoming year...',
        lastEdited: new Date(2024, 0, 15, 14, 30),
        createdAt: new Date(2024, 0, 10, 9, 0),
        collaborators: ['Alice', 'Bob', 'Charlie'],
        tags: ['planning', 'strategy'],
        isStarred: true,
    },
    {
        id: '2',
        title: 'Team Meeting Notes',
        content: 'Weekly sync discussion points and action items...',
        lastEdited: new Date(2024, 0, 14, 11, 45),
        createdAt: new Date(2024, 0, 5, 10, 0),
        collaborators: ['Alice', 'David'],
        tags: ['meeting', 'notes'],
        isStarred: false,
    },
    {
        id: '3',
        title: 'Design System Documentation',
        content: 'Components, guidelines, and best practices...',
        lastEdited: new Date(2024, 0, 13, 16, 20),
        createdAt: new Date(2024, 0, 8, 14, 0),
        collaborators: ['Bob', 'Emma', 'Frank'],
        tags: ['design', 'docs'],
        isStarred: true,
    },
    {
        id: '4',
        title: 'User Research Findings',
        content: 'Interview summaries and key insights...',
        lastEdited: new Date(2024, 0, 12, 10, 15),
        createdAt: new Date(2024, 0, 3, 11, 0),
        collaborators: ['Charlie', 'Emma'],
        tags: ['research', 'UX'],
        isStarred: false,
    },
    {
        id: '5',
        title: 'API Integration Guide',
        content: 'Technical documentation for API setup...',
        lastEdited: new Date(2024, 0, 11, 9, 30),
        createdAt: new Date(2024, 0, 1, 13, 0),
        collaborators: ['David', 'Frank'],
        tags: ['technical', 'API'],
        isStarred: false,
    },
    {
        id: '6',
        title: 'Marketing Campaign Q1',
        content: 'Social media strategy and content calendar...',
        lastEdited: new Date(2024, 0, 10, 15, 0),
        createdAt: new Date(2023, 11, 28, 10, 0),
        collaborators: ['Alice', 'Bob', 'Emma'],
        tags: ['marketing', 'campaign'],
        isStarred: true,
    },
];

// Recent documents (sorted by lastEdited)
const recentDocuments = [...mockDocuments].sort((a, b) =>
    b.lastEdited.getTime() - a.lastEdited.getTime()
).slice(0, 3);


// Document Card Component
const DocumentCard = ({ document, onStar, onDelete }: {
    document: any;
    onStar: (id: string) => void;
    onDelete: (id: string) => void;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/editor/${document.id}`}>
                <div className="p-6">
                    {/* Header with title and star */}
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 flex-1">
                            {document.title}
                        </h3>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onStar(document.id);
                            }}
                            className={`ml-2 transition-colors ${document.isStarred ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'
                                }`}
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </button>
                    </div>

                    {/* Content preview */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {document.content}
                    </p>

                    {/* Tags */}
                    {document.tags && document.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {document.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Footer with collaborators and date */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                            <div className="flex -space-x-2">
                                {document.collaborators.slice(0, 3).map((name: string, idx: number) => (
                                    <div
                                        key={idx}
                                        className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium ring-2 ring-white"
                                        title={name}
                                    >
                                        {name.charAt(0)}
                                    </div>
                                ))}
                                {document.collaborators.length > 3 && (
                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium ring-2 ring-white">
                                        +{document.collaborators.length - 3}
                                    </div>
                                )}
                            </div>
                            <span className="ml-2">
                                {document.collaborators.length} collaborator{document.collaborators.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                        <span>{format(document.lastEdited, 'MMM d, yyyy')}</span>
                    </div>
                </div>
            </Link>

            {/* Hover actions */}
            {isHovered && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onDelete(document.id);
                        }}
                        className="p-1 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                    >
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

// Main Dashboard Component
export default function DocumentsDashboard() {
    const [documents, setDocuments] = useState(mockDocuments);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showCreateModal, setShowCreateModal] = useState(false); // This controls the modal

    // Get all unique tags
    const allTags = Array.from(new Set(documents.flatMap(doc => doc.tags)));

    // Filter documents based on search and tag
    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = selectedTag ? doc.tags.includes(selectedTag) : true;
        return matchesSearch && matchesTag;
    });

    const starredDocuments = filteredDocuments.filter(doc => doc.isStarred);
    const otherDocuments = filteredDocuments.filter(doc => !doc.isStarred);

    const handleStar = (id: string) => {
        setDocuments(docs =>
            docs.map(doc =>
                doc.id === id ? { ...doc, isStarred: !doc.isStarred } : doc
            )
        );
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this document?')) {
            setDocuments(docs => docs.filter(doc => doc.id !== id));
        }
    };

    const handleCreateDocument = (newDoc: {
        title: string;
        description: string;
        category: string;
        collaborators: Collaborator[];
        permissions: any;
    }) => {
        console.log('Creating document:', newDoc);

        // Create new document from modal data
        const document = {
            id: Date.now().toString(),
            title: newDoc.title,
            content: newDoc.description || 'Start writing...',
            lastEdited: new Date(),
            createdAt: new Date(),
            collaborators: newDoc.collaborators.map(c => c.name),
            tags: [newDoc.category],
            isStarred: false,
        };

        setDocuments([document, ...documents]);

        // Optional: Navigate to the new document
        // window.location.href = `/editor/${document.id}`;

        // Close modal
        setShowCreateModal(false);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                    Documents
                                </h1>
                            </div>
                            <button
                                onClick={() => setShowCreateModal(true)} // This opens the modal
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>New Document</span>
                            </button>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Welcome Section */}
                    <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Welcome back! 👋
                                </h2>
                                <p className="text-gray-600">
                                    You have {documents.length} document{documents.length !== 1 ? 's' : ''} total,{' '}
                                    {documents.filter(d => d.isStarred).length} starred
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20" />
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search documents..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Tags Filter */}
                        {allTags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                <button
                                    onClick={() => setSelectedTag(null)}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${!selectedTag ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    All
                                </button>
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setSelectedTag(tag)}
                                        className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Starred Documents */}
                    {starredDocuments.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Starred
                            </h2>
                            <div className={viewMode === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                                : 'space-y-4'
                            }>
                                {starredDocuments.map(doc => (
                                    <DocumentCard
                                        key={doc.id}
                                        document={doc}
                                        onStar={handleStar}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Recent Documents */}
                    {recentDocuments.length > 0 && (
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Recently edited
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {recentDocuments.map((doc) => (
                                    <Link key={doc.id} href={`/editor/${doc.id}`}>
                                        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer">
                                            <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{doc.title}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-2 mb-2">{doc.content}</p>
                                            <p className="text-xs text-gray-400">{format(doc.lastEdited, 'MMM d, h:mm a')}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* All Documents */}
                    {otherDocuments.length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                All documents
                            </h2>
                            <div className={viewMode === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                                : 'space-y-4'
                            }>
                                {otherDocuments.map(doc => (
                                    <DocumentCard
                                        key={doc.id}
                                        document={doc}
                                        onStar={handleStar}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {filteredDocuments.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                            <p className="text-gray-500 mb-4">
                                {searchQuery || selectedTag ? 'Try adjusting your search or filters' : 'Create your first document to get started'}
                            </p>
                            {!searchQuery && !selectedTag && (
                                <button
                                    onClick={() => setShowCreateModal(true)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Create New Document
                                </button>
                            )}
                        </div>
                    )}
                </main>
            </div>

            {/* Create Document Modal */}
            <CreateDocumentModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateDocument}
            />
        </>
    );
}