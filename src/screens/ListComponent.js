import React from 'react'
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import auth, { db } from '../firebaseConfig';

export default function ListComponent(props) {
    const add = async ()=>{
        const ref = doc(db, auth.currentUser.uid, props.listName);
         updateDoc(ref,{
            movies:arrayUnion(props.Title)
        }).then(()=>{
            alert("Movie added to your list");
            props.show()
        }).catch((e)=>{
            alert(e.message)
        });

   }
    return (
        <div>
            <p onClick={add}>{props.listName}</p>
        </div>
    )
}
