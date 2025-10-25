// draggableNode.js

export const DraggableNode = ({ type, label, icon }) => {
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
