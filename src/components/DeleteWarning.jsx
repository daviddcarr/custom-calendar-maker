const DeleteWarning = ({ message, actionText, deleteFunction, cancelFunction }) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">{message}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <button
                        className="bg-red-800 text-white px-4 py-2 rounded"
                        onClick={deleteFunction}
                    >
                        {actionText || 'Delete'}
                    </button>
                    <button
                        className="bg-gray-800 text-white px-4 py-2 rounded"
                        onClick={cancelFunction}
                    >
                        Cancel
                    </button>
                </div>  
            </div>
        </div>
    )
}

export default DeleteWarning