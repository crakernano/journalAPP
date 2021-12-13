import { db } from '../firebase/firebase-config';
import { doc, getDoc, collection, getDocs  } from "firebase/firestore";


export const loadNotes = async ( uid ) => {
    const notes = [];
    /*
    const docRef = doc(db, `${ uid }/journal/notes`, "notes");
    const notesSnap = await getDoc(docRef);
    const notes = [];
    if (notesSnap.exists()) {
        console.log("Document data:", notesSnap.data());
        notesSnap.data.forEach( snapHijo => {
            notes.push({
                id: snapHijo.id,
                ...snapHijo.data()
            })
        });
      }else{
          console.log("No hay notas");
      }
    */

      const querySnapshot = await getDocs(collection(db, `${ uid }/journal/notes`));
      querySnapshot.forEach((snapHijo) => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });
      

    return notes;
}


