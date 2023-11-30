import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@chakra-ui/react';
import { back } from '../assets';
import { ItemCard } from '../components';

function Search() {

    const [search, setSearch] = useState({});
    const {txt} = useParams()

    const nav = useNavigate();

    const goToHome = () =>{
        nav("/");
    }



    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTRmZDQxYzk2OGZkZGQzM2ZiNjJkYzFlMGUwYzg4ZiIsInN1YiI6IjY1NTZjMzk0ZWE4NGM3MTA5MzAxNWZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a1WNt2hy3Z1yuZ60WGpYr8DWusnnKQd_vCUDEqK3hc0'
            }
          };
          
          fetch('https://api.themoviedb.org/3/search/movie?query='+encodeURI(txt)+'&language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setSearch(response))
            .catch(err => console.error(err));
    }, [])

    const navigateToMovie = (r) =>{
        nav("/details/"+r.id);
    }
   
    if(search.results == undefined){
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
                     <p className='text-3xl font-black text-white '>Search results for : {txt}</p>
                </div>
                <div className='grid grid-cols-4'>
                    {search.results.map((s) => 
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

export default Search