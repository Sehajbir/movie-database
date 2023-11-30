import React, { useEffect, useState } from 'react'

import { Button, IconButton } from '@chakra-ui/react';

import { movieGenres, tvGenres } from '../assets/constants';

import { add } from '../assets';

import Carousel from 'react-multi-carousel';

import "react-multi-carousel/lib/styles.css";
import ItemCard from './ItemCard';
import { useNavigate } from 'react-router-dom';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function Hero() {
  const baseUrl = "http://image.tmdb.org/t/p/original";
  const [res, setRes] = useState({});
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTRmZDQxYzk2OGZkZGQzM2ZiNjJkYzFlMGUwYzg4ZiIsInN1YiI6IjY1NTZjMzk0ZWE4NGM3MTA5MzAxNWZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a1WNt2hy3Z1yuZ60WGpYr8DWusnnKQd_vCUDEqK3hc0'
      }
    };
    
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => setRes(response))
      .catch(err => console.error(err));
  }, [])

  const playTrailer = (() => {
    var url = "https://www.youtube.com/results?search_query=";
    var title = res.results[0].title;
    var t = title.split(" ");
    var first = true;
      for(var a in t){
        if(first){
          url+=t[a];
          first = false;
        }else{
          url = url + "+" + t[a];
        }
      }

      window.open(url, "_blank");
  });


  const navigate = useNavigate();
  const navigateToMovie = (r) =>{
    console.log(r);
    navigate("/details/"+r.id);
  }
  if(res.results == undefined){
    return(
      ""
      ) 
    }else{
      const topRes = res.results[0];
      return (
        <div className='w-full h-screen bg-blue-700'>
            <div className="w-full h-[80%]">
              <img className='h-[screen] w-full' src={baseUrl + res.results[0].backdrop_path} alt="" />
              <div className="h-full w-[50%] top-0 absolute z-0">
                <div className='mt-48 ml-[2.5%] w-[80%] py-4 px-8 rounded-3xl z-10'>
                  {/* <h1 className='text-xl text-slate-500'>Now Playing</h1> */}
                  <p className='text-8xl font-black text-slate-100 mix-blend-difference'>{res.results[0].title}</p>
                  <div className='flex flex-row gap-2 mt-10'>
                    {res.results[0].genre_ids.map((g) =>
                      <div className='bg-primary text-white py-1 px-2 text-sm' key={g}>
                        {movieGenres[g]}
                      </div>
                    )}
                  </div>
                  {/* <p className='mt-10'>{res.results[0].overview}</p> */}

                  <div className="flex flex-row gap-4">
                    <Button onClick={playTrailer} className='mt-8' colorScheme='ytRed' variant='solid'>
                      Watch Trailer
                    </Button>
                    <IconButton onClick={() => navigateToMovie(topRes)} className='mt-8' aria-label='Search database' variant='solid' isRound='true' colorScheme='blue' icon={<img src={add}/>} />
                  </div>
                </div>
              </div>
            </div>


            <div className='w-full h-96 relative bg-primary py-2 px-4'> 
                  <div className='px-8 py-2'>
                    <p className='font-black text-2xl text-white'>Now Playing</p>
                  </div>
                  
                  <Carousel responsive={responsive}>
                    {res.results.slice(1).map((r) =>
                      <div className='h-96' key={r}>
                        <a onClick={() => navigateToMovie(r)} className='cursor-pointer'>
                          <ItemCard props={r}/>
                        </a>
                      </div>
                    )}
                  </Carousel>
            </div>
        </div>
      )
    }
}

export default Hero