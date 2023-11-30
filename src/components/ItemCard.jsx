import React from 'react'
import { not_found } from '../assets';

function ItemCard(props) {
    const baseUrl = "http://image.tmdb.org/t/p/original";
  return (
    <div className="h-4/5 w-[90%] mt-6 ml-8 relative">
        {props.props.backdrop_path == null ? 
          <img className='h-full w-full ml-auto mr-auto' src={not_found}  alt="" />
        : 
          <img className='h-full w-full ml-auto mr-auto' src={baseUrl + props.props.backdrop_path}  alt="" />
        }
        <div className='h-16 w-full absolute bottom-0 py-4 px-8 overflow-ellipsis' style={{background: "rgba(0,0,0,0.65)"}}>
            <p className='text-lg font-bold text-white mix-blend-difference leading-5'>{props.props.title}</p>
        </div>
    </div>
  )
}

export default ItemCard