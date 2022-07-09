import React from 'react'
import Alphabet from './category/Alphabet'
import PointsSeller from './category/PointsSeller'
import Price from './category/Price'

export default function Order() {
  return (
    <>
    <ul>
        <li>
            <Alphabet/>
        </li>
        <li>
            <Price/>
        </li>
        <li>
            <PointsSeller/>
        </li>
    </ul>
    </>
  )
}
