import React from 'react'
import { UseState } from 'react'
import Axios from 'axios'

function cloudinary() {
    const [imageSelected, setImageSelected] = UseState("");

    const uploadImage= () =>{
        const formData = new FormData()
        formData.append("file",imageSelected)
        formData.append("upload_preset","Imagenes_mercadito")


        Axios.post("https://api.cloudinary.com/v1_1/djc0ahf9j/image/upload",
        formData).then((response)=>{console.log(response)})
    }
  

  return (
    <div>
        <input type="file"
        onChange={(event)=>{
            setImageSelected(event.target.files[0]);
        }}
        />
        <button onClick={uploadImage}>Cargar Imagen</button>
    </div>
  )
}

export default cloudinary