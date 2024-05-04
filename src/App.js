import {useState, useEffect} from "react";
import useLocalStorage from "./useLocalStorage";

export default function App() {
  const [movieName, setMovieName] = useLocalStorage('movieName', '')
  const [movieList, setMovieList] = useState(() => {
    const savedList = localStorage.getItem("movieList");
    return savedList ? JSON.parse(savedList) : [];
  })

  useEffect(() => {
    console.log("movieList:", movieList);
  }, [movieList]);

  const handleChange = (e) => {
    setMovieName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(movieName && movieName.trim() !== "") {
      setMovieList([...movieList, movieName]);
      setMovieName("");
    }
  }

  useEffect(() => {
    localStorage.setItem("movieList", JSON.stringify(movieList));
  }, [movieList]);

  const handleClearAll = () => {
    const confirmed = window.confirm("Are you sure you want to clear all items?")
    if(confirmed) setMovieList([]);
  };

  const handleRemoveItem = (itemToRemove) => {
    const confirmed = window.confirm("Are you sure you want to clear all items?")
    if(confirmed) setMovieList(movieList.filter((item) => item !== itemToRemove))
  }

  const handleEditItem = (itemToEdit) => {
    const newMovieName = window.prompt("Enter a new name for the movie", itemToEdit);
    if (newMovieName !== null) {
      const editedList = movieList.map(item => (item === itemToEdit ? newMovieName : item));
      setMovieList(editedList);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className="shadow border rounded ml-6 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={movieName} type="text" onChange={handleChange} placeholder='Movie Name'/>
        <button className="bg-blue-500 text-white font-bold py-2 mx-2 px-4 rounded" type='submit'>Add Book</button>
        <button className="bg-red-500 text-white font-bold py-2 mx-2 px-4 rounded" type='button' onClick={handleClearAll}>Clear all</button>
      </form>
      <ul>
        {movieList.map((item, index) => (
          <li className='w-fit list-disc m-6' key={index}>
            {item}
            <button className="px-2 py-1 mx-2 text-sm font-semibold text-red-600 bg-red-100 rounded hover:bg-red-200 focus:outline-none focus:bg-red-200"
                    onClick={() => handleRemoveItem(item)}>
              Remove
            </button>
            <button className="px-2 py-1 mx-2 text-sm font-semibold text-blue-600 bg-red-100 rounded hover:bg-red-200 focus:outline-none focus:bg-blue-200"
                    onClick={() => handleEditItem(item)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}