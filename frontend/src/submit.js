// submit.js

export const SubmitButton = () => {
    const handleSubmit = () => {
        // TODO: Implement submit logic
        console.log('Pipeline submitted!');
    };

    return (
        <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center px-6 py-2.5 border border-transparent 
                     text-sm font-medium rounded-lg shadow-sm text-white 
                     bg-gradient-to-r from-primary-600 to-primary-700 
                     hover:from-primary-700 hover:to-primary-800 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                     transform transition-all duration-200 hover:scale-105 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Run Pipeline
        </button>
    );
}
