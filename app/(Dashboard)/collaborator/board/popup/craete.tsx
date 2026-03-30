'use client';

import { useState, useEffect } from 'react';
import { Collaborator, CollaboratorRole, ROLE_PERMISSIONS } from './type';

interface CreateDocumentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (document: {
        title: string;
        description: string;
        category: string;
        collaborators: Collaborator[];
        permissions: {
            publicAccess: 'private' | 'anyone-with-link' | 'public';
            allowComments: boolean;
            allowDownload: boolean;
        };
    }) => void;
    currentUser?: { id: string; name: string; email: string };
}

// Mock users for autocomplete
const mockUsers = [
    { id: '1', email: 'alice@example.com', name: 'Alice Chen', avatar: 'AC', status: 'online' as const },
    { id: '2', email: 'bob@example.com', name: 'Bob Wilson', avatar: 'BW', status: 'offline' as const },
    { id: '3', email: 'charlie@example.com', name: 'Charlie Davis', avatar: 'CD', status: 'online' as const },
    { id: '4', email: 'diana@example.com', name: 'Diana Smith', avatar: 'DS', status: 'away' as const },
    { id: '5', email: 'emma@example.com', name: 'Emma Brown', avatar: 'EB', status: 'online' as const },
];

const categories = [
    { id: 'work', name: '💼 Work', color: 'blue' },
    { id: 'personal', name: '🏠 Personal', color: 'green' },
    { id: 'meeting', name: '📝 Meeting Notes', color: 'purple' },
    { id: 'project', name: '🚀 Project', color: 'orange' },
    { id: 'research', name: '🔬 Research', color: 'indigo' },
    { id: 'design', name: '🎨 Design', color: 'pink' },
];

export default function CreateDocumentModal({
    isOpen,
    onClose,
    onCreate,
    currentUser = { id: 'current', name: 'You', email: 'you@example.com' }
}: CreateDocumentModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
    const [emailInput, setEmailInput] = useState('');
    const [searchResults, setSearchResults] = useState<typeof mockUsers>([]);
    const [showSearch, setShowSearch] = useState(false);
    const [selectedRole, setSelectedRole] = useState<CollaboratorRole>('editor');
    const [publicAccess, setPublicAccess] = useState<'private' | 'anyone-with-link' | 'public'>('private');
    const [allowComments, setAllowComments] = useState(true);
    const [allowDownload, setAllowDownload] = useState(true);
    const [activeTab, setActiveTab] = useState<'collaborators' | 'settings'>('collaborators');

    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            resetForm();
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setSelectedCategory(categories[0].id);
        setCollaborators([]);
        setEmailInput('');
        setSearchResults([]);
        setSelectedRole('editor');
        setPublicAccess('private');
        setAllowComments(true);
        setAllowDownload(true);
        setActiveTab('collaborators');
    };

    useEffect(() => {
        if (emailInput.trim() === '') {
            setSearchResults([]);
            setShowSearch(false);
            return;
        }

        const filtered = mockUsers.filter(user =>
            (user.email.toLowerCase().includes(emailInput.toLowerCase()) ||
                user.name.toLowerCase().includes(emailInput.toLowerCase())) &&
            !collaborators.some(c => c.id === user.id)
        );
        setSearchResults(filtered);
        setShowSearch(filtered.length > 0);
    }, [emailInput, collaborators]);

    const handleAddCollaborator = (user: typeof mockUsers[0]) => {
        const newCollaborator: Collaborator = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: selectedRole,
            avatar: user.avatar,
            status: user.status,
            addedAt: new Date(),
            addedBy: currentUser.id,
        };

        setCollaborators([...collaborators, newCollaborator]);
        setEmailInput('');
        setSearchResults([]);
        setShowSearch(false);
    };

    const handleRemoveCollaborator = (id: string) => {
        setCollaborators(collaborators.filter(c => c.id !== id));
    };

    const handleUpdateRole = (id: string, role: CollaboratorRole) => {
        setCollaborators(collaborators.map(c =>
            c.id === id ? { ...c, role } : c
        ));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Please enter a document title');
            return;
        }

        // Add current user as owner if not already added
        const ownerExists = collaborators.some(c => c.id === currentUser.id);
        const allCollaborators = ownerExists
            ? collaborators
            : [
                {
                    id: currentUser.id,
                    email: currentUser.email,
                    name: currentUser.name,
                    role: 'owner' as CollaboratorRole,
                    addedAt: new Date(),
                    addedBy: currentUser.id,
                },
                ...collaborators
            ];

        onCreate({
            title: title.trim(),
            description: description.trim(),
            category: selectedCategory,
            collaborators: allCollaborators,
            permissions: {
                publicAccess,
                allowComments,
                allowDownload,
            },
        });

        onClose();
    };

    const getRoleIcon = (role: CollaboratorRole) => ROLE_PERMISSIONS[role].icon;
    const getRoleColor = (role: CollaboratorRole) => ROLE_PERMISSIONS[role].color;

    if (!isOpen && !isAnimating) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'
                    }`}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={`bg-white rounded-2xl shadow-2xl w-full max-w-3xl transform transition-all duration-300 max-h-[90vh] overflow-y-auto ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    }`}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Create New Document</h2>
                                <p className="text-sm text-gray-500">Set up permissions and invite collaborators</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-4 mt-4">
                        <button
                            type="button"
                            onClick={() => setActiveTab('collaborators')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'collaborators'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            👥 Collaborators
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('settings')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'settings'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            ⚙️ Settings
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Info - Always visible */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Document Title *
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Q1 Product Roadmap, Team Meeting Notes..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                autoFocus
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add a brief description..."
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`px-4 py-2 rounded-lg border transition-all ${selectedCategory === category.id
                                            ? `border-${category.color}-500 bg-${category.color}-50 text-${category.color}-700`
                                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Collaborators Tab */}
                    {activeTab === 'collaborators' && (
                        <div className="space-y-4">
                            {/* Role selector for new invites */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Default Role for New Collaborators
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {Object.entries(ROLE_PERMISSIONS).map(([role, data]) => (
                                        <button
                                            key={role}
                                            type="button"
                                            onClick={() => setSelectedRole(role as CollaboratorRole)}
                                            className={`p-3 rounded-lg border-2 transition-all ${selectedRole === role
                                                ? `border-${data.color}-500 bg-${data.color}-50`
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="text-2xl mb-1">{data.icon}</div>
                                            <div className="text-sm font-medium capitalize">{role}</div>
                                            <div className="text-xs text-gray-500 mt-1">{data.description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Add collaborator input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Add Collaborators
                                </label>
                                <div className="relative">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1 relative">
                                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <input
                                                type="text"
                                                value={emailInput}
                                                onChange={(e) => setEmailInput(e.target.value)}
                                                placeholder="Enter email or name to add collaborator..."
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Search results */}
                                    {showSearch && searchResults.length > 0 && (
                                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                                            {searchResults.map((user) => (
                                                <button
                                                    key={user.id}
                                                    type="button"
                                                    onClick={() => handleAddCollaborator(user)}
                                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between transition-colors"
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                            {user.avatar}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                            <div className="text-xs text-gray-500">{user.email}</div>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-blue-600">
                                                        Add as {selectedRole}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Collaborators list */}
                            {collaborators.length > 0 && (
                                <div>
                                    <div className="text-sm font-medium text-gray-700 mb-3">
                                        Collaborators ({collaborators.length})
                                    </div>
                                    <div className="space-y-2">
                                        {collaborators.map((collab) => {
                                            const roleData = ROLE_PERMISSIONS[collab.role];
                                            return (
                                                <div
                                                    key={collab.id}
                                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <div className="relative">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                                {collab.avatar}
                                                            </div>
                                                            {collab.status && (
                                                                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${collab.status === 'online' ? 'bg-green-500' :
                                                                    collab.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                                                                    }`} />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{collab.name}</div>
                                                            <div className="text-xs text-gray-500">{collab.email}</div>
                                                            {collab.addedBy && (
                                                                <div className="text-xs text-gray-400">
                                                                    Added by {collab.addedBy === currentUser.id ? 'you' : collab.addedBy}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        {/* Role selector */}
                                                        <select
                                                            value={collab.role}
                                                            onChange={(e) => handleUpdateRole(collab.id, e.target.value as CollaboratorRole)}
                                                            className={`text-sm border border-${roleData.color}-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-${roleData.color}-500`}
                                                            style={{ backgroundColor: `${roleData.color}50` }}
                                                        >
                                                            {Object.entries(ROLE_PERMISSIONS).map(([role, data]) => (
                                                                <option key={role} value={role}>
                                                                    {data.icon} {role} - {data.description}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        {/* Remove button */}
                                                        {collab.role !== 'owner' && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveCollaborator(collab.id)}
                                                                className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                                                            >
                                                                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Access Control
                                </label>
                                <div className="space-y-3">
                                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="private"
                                            checked={publicAccess === 'private'}
                                            onChange={(e) => setPublicAccess(e.target.value as any)}
                                            className="text-blue-500 focus:ring-blue-500"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">🔒 Private</div>
                                            <div className="text-sm text-gray-500">Only invited collaborators can access</div>
                                        </div>
                                    </label>

                                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="anyone-with-link"
                                            checked={publicAccess === 'anyone-with-link'}
                                            onChange={(e) => setPublicAccess(e.target.value as any)}
                                            className="text-blue-500 focus:ring-blue-500"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">🔗 Anyone with the link</div>
                                            <div className="text-sm text-gray-500">Anyone who has the link can view</div>
                                        </div>
                                    </label>

                                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="public"
                                            checked={publicAccess === 'public'}
                                            onChange={(e) => setPublicAccess(e.target.value as any)}
                                            className="text-blue-500 focus:ring-blue-500"
                                        />
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">🌍 Public</div>
                                            <div className="text-sm text-gray-500">Anyone on the internet can view</div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Additional Settings
                                </label>
                                <div className="space-y-3">
                                    <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-900">💬 Allow comments</div>
                                            <div className="text-sm text-gray-500">Collaborators can add comments and suggestions</div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={allowComments}
                                            onChange={(e) => setAllowComments(e.target.checked)}
                                            className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                                        />
                                    </label>

                                    <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-900">📥 Allow download & export</div>
                                            <div className="text-sm text-gray-500">Collaborators can download and export the document</div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={allowDownload}
                                            onChange={(e) => setAllowDownload(e.target.checked)}
                                            className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Permission Summary */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-sm text-gray-700">
                                <p className="font-medium mb-1">Permission Summary:</p>
                                <ul className="space-y-1">
                                    <li>• <strong>Owner</strong> has full control (you will be the owner)</li>
                                    <li>• <strong>Editors</strong> can edit content and add comments</li>
                                    <li>• <strong>Commenters</strong> can view and add comments only</li>
                                    <li>• <strong>Viewers</strong> have read-only access</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                        >
                            Create Document
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}