import { onAuthStateChanged,signOut } from '@firebase/auth';
import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router';
import auth from '../firebaseConfig';
import '../stylesheets/Home.css'

export default function Home() {
    const navigate = useNavigate();
    const [loading, setloading] = useState(true)
const [movieName, setmovieName] = useState("")
const [movienotFound, setmovienotFound] = useState(false)
const [movieDetails, setmovieDetails] = useState(null);

    const logout = ()=>{
            signOut(auth).then(()=>{

            }).catch((e)=>{
                alert(e.message)
            })
    }
    const searchMovie=()=>{
                axios.get(`http://www.omdbapi.com/?t=${movieName}&plot=full&apikey=80120ba7`).then((response)=>{
                    if(response.data.Response=="False"){
                        setmovienotFound(true);
                        setmovieDetails(null);
                    }
                    else{
                        setmovienotFound(false);
                        setmovieDetails(response.data);
                    }
                }).catch((e)=>{
                    console.log(e.message);
                })
    }
    useEffect(() => {
    
        onAuthStateChanged(auth, (user) => {
          if (!user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            navigate("/auth",{replace:true})
            // ...
          }
          setloading(false); 
        });
    }, [])

    if(loading){
        return <div className="loadingContainer">
           <div className="loader"></div>
           <div>Catching up with firebase, please wait</div>
        </div>
    }
    else{
    return (
        <div className="body">
           <div className="navBarContainer">
               <ul className='navBar'>
                   <div>

                   <li id="title">
                       MOVIES LIBRARY
                   </li>
                   </div>
                   <div className='menu'>

                   <li>
                       Playlists
                   </li>
                   <li>
                       <a onClick={logout}>Log out</a>
                   </li>
                   </div>
               </ul>
           </div>
           <div className="content">
               <div className="searchBox">
                   <input type='search' value={movieName} onChange={(e)=>{setmovieName(e.target.value)}} id="searchInp" placeholder='Search Movies here'></input>
                   <button id="searchBtn" disabled={movieName.length===0} onClick={searchMovie}>Search</button>
               </div>
               {(movienotFound)?<h3 style={{color:"red",textAlign:'center',margin:'20px 0'}}>Movie Not Found</h3>:<span></span>}
               {(movieDetails==null)?<div></div>:
               <div className="searchResults">
                 
                   <div className="moviesBox">
                      <div className="upperMovieDetails">
                        
                          <div className="leftMovieDetails">
                              <div>

                          <h1>{movieDetails.Title}</h1>
                              </div>
                              <div><span className='titile'>Actors: </span>{movieDetails.Actors} </div>
                              <div><span className='titile'>Year: </span> {movieDetails.Year}</div>
                              <div><span className='titile'>ImdbRating: </span>{movieDetails.imdbRating}</div>
                              <div><span className='titile'>language: </span>{movieDetails.Language}</div>
                         
                        
                          </div>
                          <div className="poster">
                              <img src={movieDetails.Poster} alt='Loading..'
                              id="moviePoster"></img>
                          </div>
                      </div>
                      <div className="plot">
                         {movieDetails.Plot}
                      </div>
                      <div className="moviesFooter">

                      <button id="addtoList">add to list</button>
                      </div>
                      

                   </div>
               </div>}
           </div>
        </div>
    )
}}
