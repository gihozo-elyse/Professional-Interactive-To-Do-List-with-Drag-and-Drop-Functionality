import { useState } from 'react'

const AddTodo = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim() !== '') {
      onAdd(inputValue)
      setInputValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 sm:px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm sm:text-base rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 whitespace-nowrap shadow-md hover:shadow-lg"
        >
          Add Task
        </button>
      </div>
    </form>
  )
}

export default AddTodo