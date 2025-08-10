"use client"
import FeaturedBooks from '@/components/FeaturedBooks'
import HeroCom from '@/components/HeroCom'
import { getAllBook } from '@/redux/slices/bookSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page = () => {
  const dispatch = useDispatch()
  const [books, setBooks] = useState([])
  const userInfo = useSelector((state) => state.global.user)
  const { refresh } = useSelector(state => state.global);

  const fetchAllBooks = async (token) => {
    try {
      const res = await dispatch(getAllBook({ token })).unwrap()
      if (res?.data) {
        setBooks(res?.data)
      }
    }
    catch (err) {
      console.log(err)
    }

  }
  useEffect(() => {
    if (userInfo?.token) {
      fetchAllBooks(userInfo?.token)
    }
  }, [userInfo, refresh, dispatch])
  return (
    <div>
      <FeaturedBooks title="Books Available" data={books} />
    </div>
  )
}

export default Page
