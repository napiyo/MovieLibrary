import React from 'react'
import '../stylesheets/showlistItem.css'
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import auth , {db} from '../firebaseConfig'
export default function ShowListItem(props) {
 
let remove = ()=>{
    const Ref = doc(db, auth.currentUser.uid, props.list);
    updateDoc(Ref,{
        movies: arrayRemove(props.Name)
    })
    // console.log(props);
}
    return (
        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
        <div className="item_Main_Container">
            <div className='t'>
                {props.Name}
            </div>
            <div>
                <button  id="removeList" onClick={remove}>remove</button>
            </div>
        </div>
        </div>
    )
}
