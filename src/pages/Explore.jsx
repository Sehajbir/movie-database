import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@chakra-ui/react';
import { back } from '../assets';
import { ItemCard } from '../components';

function Explore() {
    const {genre, genreName} = useParams();
    const [res, setRes] = useState({})

    const nav = useNavigate();

    const goToHome = () =>{
        nav("/");
    }
    const navigateToMovie = (r) =>{
        nav("/details/"+r.id);
    }
   
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTRmZDQxYzk2OGZkZGQzM2ZiNjJkYzFlMGUwYzg4ZiIsInN1YiI6IjY1NTZjMzk0ZWE4NGM3MTA5MzAxNWZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a1WNt2hy3Z1yuZ60WGpYr8DWusnnKQd_vCUDEqK3hc0'
            }
          };
          fetch('https://api.themoviedb.org/3/discover/movie?include_adult=true&language=en-US&page=1&sort_by=popularity.desc&with_genres='+{genre}.genre, options)
            .then(response => response.json())
            .then(response => setRes(response))
            .catch(err => console.error(err));
    }, [])
    
    console.log(res);

    if(res.results == undefined){
        return "";
    } else {
        return (
            <div className='bg-primary'>
                <div className='mt-16 flex flex-row gap-4 bg-primary'>
                    <Button onClick={goToHome} className='ml-8 mt-4' leftIcon={<img className='w-6 h-6' src={back} />} colorScheme='gray' variant='solid'>
                        <p className='text-black'>
                            Go to Dashboard
                        </p>
                    </Button>
                </div>
                <div className='flex flex-row justify-center'>
                     <p className='text-3xl font-black text-white '>Movies of Genre : {genreName}</p>
                </div>
                <div className='grid grid-cols-4'>
                    {res.results.map((s) => 
                        <div className='h-96' key={s}>
                            <a onClick={() => navigateToMovie(s)} className='cursor-pointer'>
                            <ItemCard props={s}/>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        )
    } 
}

export default Explore