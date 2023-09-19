import { AiOutlineCloseCircle } from 'react-icons/ai'


const TrackableItems = ({ calendar, setShowTrackableItems }) => {

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 backdrop-blur-sm bg-opacity-80 p-8 rounded-lg max-h-[80vh] overflow-scroll space-y-4">

                <div className='flex gap-2 items-center'>
                    <h2 className="text-2xl font-bold text-white grow">Trackable Items</h2>
                    <button
                        className='text-3xl text-gray-500 hover:text-gray-300 rounded flex items-center space-x-4'
                        onClick={() => setShowTrackableItems(false)}
                            >
                        <AiOutlineCloseCircle />
                    </button>
                </div>

                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">Item</th>
                            <th className="text-left">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calendar.trackableItems.map((item, index) => {
                            let itemQuantity = 0

                            // loop through events and add up quantity
                            calendar.events.forEach(event => {
                                if (event.trackableItems) {
                                    event.trackableItems.forEach(eventItem => {
                                        if (eventItem.name === item) {
                                            itemQuantity += eventItem.value
                                        }
                                    })
                                }
                            })

                            return (
                                <tr key={index}>
                                    <td>{item}</td>
                                    <td>{itemQuantity}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default TrackableItems