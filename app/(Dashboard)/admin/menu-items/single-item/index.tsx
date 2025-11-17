
import { FiHome, FiSettings, FiExternalLink, FiChevronRight, FiFolder, FiFile } from 'react-icons/fi';

type MenuItemProps = {
  menu: {
    _id: string;
    name: string;
    label: string;
    description?: string;
    icon?: string;
    path?: string;
    externalUrl?: string;
    type?: 'route' | 'group' | 'link' | 'divider';
    isActive?: boolean;
    hidden?: boolean;
  };
  isActive?: boolean;
  isExpanded?: boolean;
  hasChildren?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function MenuItem({
  menu,
  isActive = false,
  isExpanded = false,
  hasChildren = false,
  onClick,
  className = ''
}: MenuItemProps) {
  // Don't render if hidden
  if (menu.hidden) return null;

  // Handle divider type
  if (menu.type === 'divider') {
    return <div className="border-t border-gray-200 my-2 w-full" />;
  }

  // Determine icon based on type or provided icon
  const renderIcon = () => {
    if (menu.icon) {
      // In a real app, you'd render the actual icon based on the icon string
      return <FiFile className="text-gray-500" />;
    }
    
    switch (menu.type) {
      case 'route':
        return <FiHome className="text-blue-500" />;
      case 'group':
        return <FiFolder className="text-yellow-500" />;
      case 'link':
        return <FiExternalLink className="text-green-500" />;
      default:
        return <FiFile className="text-gray-500" />;
    }
  };

  return (
    <div 
      className={`w-full max-w-xs ${className}`} // 1/3 width constraint
      onClick={onClick}
    >
      <div className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200
        ${isActive ? 'bg-blue-50 border border-blue-100' : 'hover:bg-gray-50 border border-transparent'}
        ${hasChildren ? 'cursor-pointer' : 'cursor-default'}
      `}>
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="flex-shrink-0">
            {renderIcon()}
          </div>
          <div className="min-w-0">
            <p className={`text-sm font-medium truncate ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>
              {menu.label}
            </p>
            {(menu.path || menu.externalUrl) && (
              <p className="text-xs text-gray-500 truncate flex items-center">
                {menu.path || menu.externalUrl}
                {menu.externalUrl && <FiExternalLink className="ml-1" size={10} />}
              </p>
            )}
          </div>
        </div>
        
        {hasChildren && (
          <FiChevronRight className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'transform rotate-90' : ''}`} />
        )}
      </div>
    </div>
  );
}

// Example usage
export function MenuItemExample() {
  const sampleMenu: MenuItemProps['menu'] = {
    _id: '1',
    name: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    type: 'route',
    isActive: true,
    hidden: false
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <div className="w-full max-w-md space-y-2"> {/* Container for demonstration */}
        <MenuItem 
          menu={sampleMenu} 
          isActive={true}
          className="mx-auto" // Center for demo
        />
        
        <MenuItem 
          menu={{
            _id: '2',
            name: 'settings',
            label: 'Settings',
            path: '/settings',
            type: 'route',
            isActive: false
          }} 
          className="mx-auto"
        />
        
        <MenuItem 
          menu={{
            _id: '3',
            name: 'docs',
            label: 'Documentation',
            externalUrl: 'https://docs.example.com',
            type: 'link',
            isActive: false
          }} 
          className="mx-auto"
        />
        
        <MenuItem 
          menu={{
            _id: '4',
            name: 'content',
            label: 'Content Management',
            type: 'group',
            isActive: false
          }} 
          hasChildren={true}
          isExpanded={false}
          className="mx-auto"
        />
      </div>
    </div>
  );
}