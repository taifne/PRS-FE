// types/collaborator.ts

export type CollaboratorRole =
    | 'owner'        // Full control: can delete, manage permissions, edit
    | 'editor'       // Can edit content, add comments
    | 'commenter'    // Can only add comments and suggestions
    | 'viewer';      // Read-only access

export type PermissionLevel = {
    canEdit: boolean;
    canComment: boolean;
    canShare: boolean;
    canManagePermissions: boolean;
    canDelete: boolean;
    canExport: boolean;
    canPrint: boolean;
    canCopy: boolean;
};

export interface Collaborator {
    id: string;
    email: string;
    name: string;
    role: CollaboratorRole;
    avatar?: string;
    status?: 'online' | 'offline' | 'away';
    lastActive?: Date;
    addedAt?: Date;
    addedBy?: string;
}

export interface CollaboratorPermissions {
    role: CollaboratorRole;
    permissions: PermissionLevel;
    description: string;
    icon: string;
    color: string;
}

// Permission definitions
export const ROLE_PERMISSIONS: Record<CollaboratorRole, CollaboratorPermissions> = {
    owner: {
        role: 'owner',
        permissions: {
            canEdit: true,
            canComment: true,
            canShare: true,
            canManagePermissions: true,
            canDelete: true,
            canExport: true,
            canPrint: true,
            canCopy: true,
        },
        description: 'Full control over the document',
        icon: '👑',
        color: 'purple',
    },
    editor: {
        role: 'editor',
        permissions: {
            canEdit: true,
            canComment: true,
            canShare: false,
            canManagePermissions: false,
            canDelete: false,
            canExport: true,
            canPrint: true,
            canCopy: true,
        },
        description: 'Can edit and comment',
        icon: '✏️',
        color: 'blue',
    },
    commenter: {
        role: 'commenter',
        permissions: {
            canEdit: false,
            canComment: true,
            canShare: false,
            canManagePermissions: false,
            canDelete: false,
            canExport: false,
            canPrint: true,
            canCopy: false,
        },
        description: 'Can view and add comments',
        icon: '💬',
        color: 'green',
    },
    viewer: {
        role: 'viewer',
        permissions: {
            canEdit: false,
            canComment: false,
            canShare: false,
            canManagePermissions: false,
            canDelete: false,
            canExport: false,
            canPrint: true,
            canCopy: false,
        },
        description: 'Read-only access',
        icon: '👁️',
        color: 'gray',
    },
};