import React from 'react'

const Feature=[{
    id:1,
    title:'AI Thumbnail Generator',
    image:'/feature1.png',
    path:'/ai-thumbnail-generator'
},
{
    id:2,
    title:'AI Thumbnail Search',
    image:'/feature2.png',
    path:'#'
},
{
    id:3,
    title:'Content Generator',
    image:'/feature3.png',
    path:'#'
},
{
    id:4,
    title:'Outlier',
    image:'/feature4.png',
    path:'#'
},
{
    id:6,
    title:'optimize Video',
    image:'/feature5.png',
    path:'#'
}]

function FeatureList() {
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-2xl'>AI Tools</h2>
    </div>
  )
}

export default FeatureList