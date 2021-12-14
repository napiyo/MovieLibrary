import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import auth, { db } from '../firebaseConfig'
import '../stylesheets/Myplaylists.css'
import ShowListItem from './ShowListItem'

export default function Myplaylists() {
    const navigate = useNavigate();
    const [loading, setloading] = useState(true)
    const [listsNames, setlistsNames] = useState([]);
    const [movies, setmovies] = useState([]);
    const [choosenList, setchoosenList] = useState(null);
    // const choosenList = useRef(null);
    const logout = ()=>{
        signOut(auth).then(()=>{

        }).catch((e)=>{
            alert(e.message)
        })
}

// useEffect(() => {
//     if (choosenList.current != null) {
//         console.log(choosenList.current.value); 
//     }
   
// }, [choosenList.current])

    useEffect( () => {
    
        onAuthStateChanged(auth, (user) => {
          if (!user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            navigate("/auth",{replace:true})
        }
        else{

      

 const unsubscribe = onSnapshot(
    collection(db, auth.currentUser.uid),
    (snapshot) => {
        // ...
        let lists = [];
        
        snapshot.forEach((doc) => {
            lists.push(doc.id);
           
     
        });
        setlistsNames(listsNames=>[...lists] )
        
    
    },
    (error) => {
        // ...
        console.log(error);
    });
}
// ...
}
);
        setloading(false)
        }, [listsNames.length])



useEffect(() => {
    if(choosenList != null){

    
  const docRef = doc(db, auth.currentUser.uid, choosenList);
  const unsub = onSnapshot(docRef, (doc) => {
    setmovies(movies=>[...doc.data().movies])
});
}
  
  
}, [choosenList])


        const lists = listsNames.map((list)=>{
            return  <option value={list}>{list}</option>
        })
        const m = movies.map((title)=>{
            return    <ShowListItem Name={title} key={title} list={choosenList}/>
        })



        if(loading){
            return <div className="loadingContainer">
               <div className="loader"></div>
               <div>Catching up with firebase, please wait</div>
            </div>
        }
else{


    return (
        <div className='body'>
            <div className="navBarContainer">
               <ul className='navBar'>
                   <div>

                   <li id="title">
                     <Link to="/" style={{color:"white",textDecoration:"none"}}>
                          MOVIES LIBRARY
                         </Link> 
                   </li>
                   </div>
                   <div className='menu'>

                   <li>
                      
                            My Playlists
                           
                   </li>
                   <li>
                       <a onClick={logout}>Log out</a>
                   </li>
                   </div>
               </ul>
           </div>
           <div>
               <div className="header">

           <label for="list">Choose a List: </label>

<select name="list"  id="list" onChange={(e)=>setchoosenList(e.target.value)}>
<option disabled="disabled" selected>Select List</option>
 {lists}
</select>      </div>
<hr style={{margin:'20px'}}></hr>

<div style={{display:'flex',alignContent:'center',flexDirection:'column',width:'100vw'}}>
   {(movies.length===0)?<p style={{color:'red',textAlign:'center'}}>Nothing Found / change list</p>:m}
</div>
           </div>
        </div>
    )
}}
