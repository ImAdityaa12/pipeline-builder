// draggableNode.js

export const DraggableNode = ({ type, label, icon, sidebar = false, description }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const getNodeColor = (nodeType) => {
    const colorMap = {
      customInput: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      customOutput: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
      llm: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      text: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      math: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      transform: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
      condition: 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
      filter: 'from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700',
      apiRequest: 'from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700',
    };
    return colorMap[nodeType] || 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700';
  };

  const getSidebarColor = (nodeType) => {
    const colorMap = {
      customInput: 'border-green-200 bg-green-50 hover:bg-green-100 text-green-800',
      customOutput: 'border-red-200 bg-red-50 hover:bg-red-100 text-red-800',
      llm: 'border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800',
      text: 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800',
      math: 'border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-800',
      transform: 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800',
      condition: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100 text-yellow-800',
      filter: 'border-teal-200 bg-teal-50 hover:bg-teal-100 text-teal-800',
      apiRequest: 'border-cyan-200 bg-cyan-50 hover:bg-cyan-100 text-cyan-800',
    };
    return colorMap[nodeType] || 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-800';
  };

  if (sidebar) {
    return (
      <div
        className={`${type} cursor-grab active:cursor-grabbing w-full p-3 
                     flex items-center rounded-lg border-2 
                     ${getSidebarColor(type)}
                     shadow-sm hover:shadow-md 
                     transform transition-all duration-200 hover:scale-[1.02]`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
        {icon && (
          <span className="text-2xl mr-3 flex-shrink-0" role="img" aria-label={label}>
            {icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">
            {label}
          </div>
          {description && (
            <div className="text-xs opacity-75 truncate mt-1">
              {description}
            </div>
          )}
        </div>
        <div className="flex-shrink-0 ml-2">
          <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </div>
    );
  }

  // Original compact layout for non-sidebar use
  return (
    <div
      className={`${type} cursor-grab active:cursor-grabbing min-w-[100px] h-16 
                   flex items-center justify-center flex-col rounded-lg 
                   bg-gradient-to-r ${getNodeColor(type)} 
                   text-white shadow-node hover:shadow-node-hover 
                   transform transition-all duration-200 hover:scale-105 
                   border border-white/20 backdrop-blur-sm`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      {icon && (
        <span className="text-lg mb-1" role="img" aria-label={label}>
          {icon}
        </span>
      )}
      <span className="text-xs font-medium text-center px-2 leading-tight">
        {label}
      </span>
    </div>
  );
};
