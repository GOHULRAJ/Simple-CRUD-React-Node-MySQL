import './App.css';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';


function App() {
  const [movieName,setMovieName]=useState('')
  const [movie_review,setMovieReview]=useState('')
  const [movieList,setMovieList]=useState([])

  const [newReview,setNewReview]=useState('')

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
     setMovieList(response.data)
    })
  },[]);

  const submitReview=()=>{
    Axios.post('http://localhost:3001/api/insert',{
      movieName:movieName,
      movie_review:movie_review
    });

      setMovieList([
        ...movieList,
        {movieName:movieName,movie_review:movie_review},
      ])
    
  };
  
  const deleteReview=(movie)=>{
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
  }

  const updateReview=(movie)=>{
    Axios.put("http://localhost:3001/api/update/",{
      movieName:movie,
      movie_review:newReview
    });
      setNewReview("")
  }


  return (
    <div className="App">
      <form >
      <label >MovieName:</label>
     <input type='text' name="movieName" value={movieName} 
     onChange={(e)=>{
      setMovieName(e.target.value)
      }}></input>
     <label >Review:</label>
     <input type='text' name='movie_review' value={movie_review} 
     onChange={(e)=>{setMovieReview(e.target.value)
      }}></input>
     <button onClick={submitReview} >Submit</button>
     </form>
     
      {movieList.map((eachmovie)=>{
        return <div className='card'>
              <h1>MOVIENAME:{eachmovie.movieName} </h1>
              <h3>MOVIE REVIEW:{eachmovie.movie_review}</h3>
              <button onClick={()=>{deleteReview(eachmovie.movieName)}}>Delete</button>
              <input type='text' name='' id='updateInput'value={newReview} onChange={(e)=>{setNewReview(e.target.value)}}></input>
              <button onClick={()=>{updateReview(eachmovie.movieName)} }>Update</button>
              </div>
     })}
     
    </div>
  );
}

export default App;
