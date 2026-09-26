import React from 'react'

import Hero from './components/Hero'
import PromoGrid from './components/Feature'
import ProductsPage from './components/Shop'
import PromoProductSlider from './components/Catalog1'
import PromoProductSlider2 from './components/Catalog2'
import PromoProductSlider3 from './components/Catalog3'

const page = () => {
  return (
    <div>
    
      <Hero />
      <ProductsPage /> 
      <PromoGrid />
      <PromoProductSlider/>
      <PromoProductSlider2/>
      <PromoProductSlider3/>
    </div>
  )
}

export default page
