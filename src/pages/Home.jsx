import React from 'react'
import Hero from '../components/sections/Hero'
import TodaySale from '../components/sections/TodaySale'
import Categories from '../components/sections/Categories'
import ThisMonth from '../components/sections/ThisMonth'
import Ad from '../components/sections/Ad'
import OurProducts from '../components/sections/OurProducts'
import Featured from '../components/sections/Featured'

export default function Home() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-26 space-y-6 md:space-y-30">
      {/* <Hero /> */}
      {/* <TodaySale /> */}
      {/* <Categories /> */}
      {/* <ThisMonth /> */}
      {/* <Ad /> */}
      {/* <OurProducts /> */}
      <Featured />
    </div>

  )
}
