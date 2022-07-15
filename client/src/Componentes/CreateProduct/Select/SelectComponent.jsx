import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { get_categories, get_sub } from '../../../redux/actions'

export default function SelectComponent( {select, handleChange}) {


      let dispatch = useDispatch()

      let {categories, sub} = useSelector(state => state)

      let subCat = select.sub
    
      useEffect(() => {

        if (select.category) {
          dispatch(get_sub(select.category.value))
          return
        }
        dispatch(get_categories())
      }, [select.category])

      let types = [
        { value: "tv", label: "TV" },
        { value: "audifonos", label: "Audifonos" },
        { value: "equipos", label: "Equipos de sonido" }
      ]
    return (
        <>
            <Select
                name='category'
                options={categories.map(c => {
                    return { value: c.name, label: c.name }
                })}
                isClearable={true}
                onChange={handleChange}
            />

            <Select
                name='sub'
                options={sub.map(c => {
                    return { value: c.name, label: c.name.replaceAll("_", " ") }
                })}
                isClearable={true}
                onChange={handleChange}
                value={select.sub}
            />

            {
              subCat && subCat.value === "audio_y_video" && (
                <Select
                name='type'
                options={types}
                isClearable={true}
                onChange={handleChange}
                value={select.type}
            />
              )
            }
        </>
    )
}
