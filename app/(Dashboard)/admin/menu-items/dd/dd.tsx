import { useState } from 'react';
import { FiMenu, FiLink, FiFolder, FiDivide, FiPlus, FiEdit2, FiTrash2, FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi';

type MenuItem = {
  _id: string;
  name: string;
  label: string;
  description?: string;
  icon?: string;
  path?: string;
  externalUrl?: string;
  type?: 'route' | 'group' | 'link' | 'divider';
  parent?: string;
  isActive?: boolean;
  hidden?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export default function MenuManager() {
  const [menus, setMenus] = useState<MenuItem[]>(sampleMenus);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [editMenu, setEditMenu] = useState<MenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newMenuType, setNewMenuType] = useState<'route' | 'group' | 'link' | 'divider'>('route');

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleEdit = (menu: MenuItem) => {
    setEditMenu(menu);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setMenus(prev => prev.filter(menu => menu._id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setShowForm(false);
    setEditMenu(null);
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'route': return <FiLink className="text-blue-500" />;
      case 'group': return <FiFolder className="text-yellow-500" />;
      case 'divider': return <FiDivide className="text-gray-500" />;
      default: return <FiLink className="text-green-500" />;
    }
  };

  const renderMenuItems = (items: MenuItem[], parentId?: string) => {
    return items
      .filter(menu => menu.parent === parentId)
      .map(menu => (
        <div key={menu._id} className="ml-4">
          <div className={`flex items-center justify-between p-3 rounded-lg ${menu.isActive ? 'bg-blue-50' : 'bg-gray-50'} mb-2`}>
            <div className="flex items-center space-x-3">
              {renderIcon(menu.type || 'route')}
              <div>
                <p className="font-medium text-gray-800">{menu.label}</p>
                {menu.path && (
                  <p className="text-xs text-gray-500 flex items-center">
                    {menu.path}
                    {menu.externalUrl && <FiExternalLink className="ml-1" size={12} />}
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleEdit(menu)}
                className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
              >
                <FiEdit2 size={16} />
              </button>
              <button 
                onClick={() => handleDelete(menu._id)}
                className="p-1 text-gray-500 hover:text-red-500 transition-colors"
              >
                <FiTrash2 size={16} />
              </button>
              {menu.type === 'group' && (
                <button 
                  onClick={() => toggleGroup(menu._id)}
                  className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {expandedGroups[menu._id] ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                </button>
              )}
            </div>
          </div>
          {menu.type === 'group' && expandedGroups[menu._id] && (
            <div className="pl-4 border-l-2 border-gray-200">
              {renderMenuItems(menus, menu._id)}
            </div>
          )}
        </div>
      ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full ">
      <div className="max-w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
            <h1 className="text-2xl font-bold flex items-center">
              <FiMenu className="mr-3" size={24} />
              Menu Management
            </h1>
            <p className="text-blue-100 mt-1">Organize your navigation structure</p>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Menu Items</h2>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <FiPlus size={18} />
                <span>Add New Item</span>
              </button>
            </div>

            {/* Menu List */}
            <div className="space-y-2">
              {renderMenuItems(menus)}
            </div>
          </div>
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {editMenu ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <div className="grid grid-cols-4 gap-2">
                        <button
                          type="button"
                          onClick={() => setNewMenuType('route')}
                          className={`py-2 px-3 rounded-md text-sm flex items-center justify-center space-x-1 ${newMenuType === 'route' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 text-gray-700'}`}
                        >
                          <FiLink size={14} />
                          <span>Route</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewMenuType('group')}
                          className={`py-2 px-3 rounded-md text-sm flex items-center justify-center space-x-1 ${newMenuType === 'group' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 text-gray-700'}`}
                        >
                          <FiFolder size={14} />
                          <span>Group</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewMenuType('link')}
                          className={`py-2 px-3 rounded-md text-sm flex items-center justify-center space-x-1 ${newMenuType === 'link' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 text-gray-700'}`}
                        >
                          <FiExternalLink size={14} />
                          <span>Link</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewMenuType('divider')}
                          className={`py-2 px-3 rounded-md text-sm flex items-center justify-center space-x-1 ${newMenuType === 'divider' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 text-gray-700'}`}
                        >
                          <FiDivide size={14} />
                          <span>Divider</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Menu label"
                        defaultValue={editMenu?.label || ''}
                        required
                      />
                    </div>

                    {newMenuType !== 'divider' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name (Internal)</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="menu-name"
                            defaultValue={editMenu?.name || ''}
                            required
                          />
                        </div>

                        {(newMenuType === 'route' || newMenuType === 'link') && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {newMenuType === 'route' ? 'Path' : 'External URL'}
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder={newMenuType === 'route' ? '/path' : 'https://example.com'}
                              defaultValue={editMenu?.path || editMenu?.externalUrl || ''}
                              required
                            />
                          </div>
                        )}
                      </>
                    )}

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isActive"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          defaultChecked={editMenu?.isActive ?? true}
                        />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                          Active
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="hidden"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          defaultChecked={editMenu?.hidden ?? false}
                        />
                        <label htmlFor="hidden" className="ml-2 block text-sm text-gray-700">
                          Hidden
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditMenu(null);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {editMenu ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Sample data
export const sampleMenus: MenuItem[] = [
  {
    _id: '1',
    name: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    type: 'route',
    isActive: true,
    hidden: false,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  },
  {
    _id: '2',
    name: 'content',
    label: 'Content',
    type: 'group',
    isActive: true,
    hidden: false,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  },
  {
    _id: '3',
    name: 'posts',
    label: 'Posts',
    path: '/content/posts',
    type: 'route',
    parent: '2',
    isActive: true,
    hidden: false,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  },
  {
    _id: '4',
    name: 'docs',
    label: 'Documentation',
    externalUrl: 'https://docs.example.com',
    type: 'link',
    isActive: true,
    hidden: false,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  },
  {
    _id: '5',
    name: 'divider-1',
    label: '',
    type: 'divider',
    isActive: true,
    hidden: false,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  },
  {
    _id: '6',
    name: 'settings',
    label: 'Settings',
    path: '/settings',
    type: 'route',
    isActive: true,
    hidden: false,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  }
];