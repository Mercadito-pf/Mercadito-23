import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { get_features } from '../../redux/actions'
import FormComponent from './Form/FormComponent'
import SelectComponent from './Select/SelectComponent'


export default function CreateProduct() {
  let [input, setInput] = useState({})
  let [select, setSelect] = useState({
    category: null,
    sub: null,
    type: null
  })
  let { features } = useSelector(state => state)
  let [show, setShow] = useState(true)
  let [disable, setDisable] = useState(true)
  let dispatch = useDispatch()

  function handleClick(e) {
    e.preventDefault()
    setShow(false)
    if (select.type) {
      dispatch(get_features(`type=${select.type.value}`))
      return
    }
    dispatch(get_features(`category=${select.sub.value}`))

  }
  function handleChange(value, e) {

    if (e.name === "category") {
      setSelect(prev => {
        return {
          ...prev,
          category: value,
          sub: null,
          type: null
        }
      })

      // setDisable()
      return
    }

    if (e.name === "sub" && value.value !== "audio_y_video") {
      setSelect(prev => {
        return {
          ...prev,
          sub: value,
          type: null
        }
      })
      return
    }
    setSelect(prev => {
      return {
        ...prev,
        [e.name]: value
      }
    })


  }

  function handleInputChange(e) {


    e.preventDefault()
    console.log(e.target.name)
    setInput(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }


  function handleSubmit(e) {
    e.preventDefault()
    let obj = { category: select.sub.value }
    if (select.type) {
      obj.type = select.type.value
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...input, ...obj })
    };
    fetch('http://localhost:3001/products', requestOptions)
      .then(res => {
        if (res.status === 201) {
          alert(`created successfully`)

          // setInput({})

        }
      })
      .catch((error) => {
        alert("oops! something has failed")
      })
  }

  useEffect(() => {
    if (select.category && select.sub && select.sub.value !== "audio_y_video") {
      setDisable(false)
    } else if (select.sub && select.sub.value === "audio_y_video" && select.type) {
      // dispatch()
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [select])
  return (
    <>
      <Link to="/">Go To Home</Link>
      <form onSubmit={handleSubmit}>
        {
          show && <>
            <h3>Seleccione la categoria de su producto</h3>
            <SelectComponent select={select} handleChange={handleChange} />
            <button onClick={handleClick} disabled={disable}>Next</button>
          </>
        }
        {
          !show && <>
            {
              features.map(f => {
                if (f === "description") {
                  return (
                    <div>
                      <div>
                        <label>Descripcion: </label>
                      </div>
                      <textarea name={f} onChange={handleInputChange} rows="4" cols="50"></textarea>
                    </div>
                  )
                }
                return (
                  <div>
                    <label>{f[0].toUpperCase()+f.substring(1).replaceAll("_", " ")}</label>
                    <input onChange={handleInputChange} type="text" name={f} />
                  </div>

                )
              })

            }
            <input type="submit" />
          </>
        }
      </form>
    </>

  )
}

