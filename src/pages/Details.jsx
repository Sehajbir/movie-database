import React, { useEffect, useState } from 'react'
import { Navbar } from '../components'
import { back, add } from '../assets'
import { Button, useDisclosure, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ChakraProvider,  extendTheme} from '@chakra-ui/react';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../assets/constants';
import Carousel from 'react-multi-carousel';
import {ItemCard} from '../components';

import "react-multi-carousel/lib/styles.css";

function Details() {
    const [details, setDetails] = useState({});
    const [cast, setCast] = useState({});
    const [providers, setProviders] = useState({})
    const [similar, setSimilar] = useState({})
    const navigate = useNavigate();
    const { movieId } = useParams();
    const goToHome = () =>{
        console.log("inside");
        navigate("/");
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigateToMovie = (r) =>{
        onClose();
        console.log(r);
        navigate("/details/"+r.id);
        window.location.reload();
    }

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


    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTRmZDQxYzk2OGZkZGQzM2ZiNjJkYzFlMGUwYzg4ZiIsInN1YiI6IjY1NTZjMzk0ZWE4NGM3MTA5MzAxNWZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a1WNt2hy3Z1yuZ60WGpYr8DWusnnKQd_vCUDEqK3hc0'
            }
          };
          
        fetch('https://api.themoviedb.org/3/movie/'+movieId+'?language=en-US', options)
            .then(response => response.json())
            .then(response => setDetails(response))
            .catch(err => console.error(err));

        fetch('https://api.themoviedb.org/3/movie/'+movieId+'/credits?language=en-US', options)
            .then(response => response.json())
            .then(response => setCast(response.cast.slice(0, 6)))
            .catch(err => console.error(err));         
            
        fetch('https://api.themoviedb.org/3/movie/'+movieId+'/watch/providers', options)
            .then(response => response.json())
            .then(response => setProviders(response.results.CA))
            .catch(err => console.error(err));

        fetch('https://api.themoviedb.org/3/movie/'+movieId+'/similar?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setSimilar(response))
            .catch(err => console.error(err));
    
    }, [])
      
      
    const theme = extendTheme({
        components: {
            Modal: {
            baseStyle: (props) => ({
                dialog: {
                maxWidth: ["95%", "95%", "95%"],
                minWidth: "95%",
                bg: "#011620"
                }
            })
            }
        }
    });


    if(details.id == undefined || cast[0] == undefined || similar.results == undefined){
        return "";
    } else{
        return (
            <ChakraProvider theme={theme}>
                <div className='w-full h-screen absolute top-0 overflow-y-scroll' style={{background : "url("+baseUrl+details.backdrop_path+")", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed"}}>
                    
                    <Modal isOpen={isOpen} onClose={onClose} variant="wide">
                        <ModalOverlay 
                            bg='blackAlpha.300'
                            backdropFilter='blur(10px) hue-rotate(90deg)' />
                        <ModalContent>
                        <ModalHeader>
                            <p className='text-2xl text-white font-black'>Similar to {details.title}</p>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        <Carousel responsive={responsive}>
                            {similar.results.map((s) =>
                                <div className='h-96' key={s}>
                                    <a onClick={() => navigateToMovie(s)} className='cursor-pointer'>
                                    <ItemCard props={s}/>
                                    </a>
                                </div>
                            )}
                        </Carousel>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                            </Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                    
                    
                    
                    <div className='mt-16 flex flex-row gap-4'>
                    <Button onClick={goToHome} className='ml-8 mt-4' leftIcon={<img className='w-6 h-6' src={back} />} colorScheme='gray' variant='solid'>
                        <p className='text-black'>
                            Go to Dashboard
                        </p>
                    </Button>
                    </div>

                    <div className='w-[50%] flex flex-row gap-4 border-r-2 border-t-2 mt-2 border-black' style={{background : "rgba(0,0,0, 0.65)"}}>
                        <div>
                            <div className='border-2 border-black ml-16 mt-16'>
                                <img className='w-64' src={baseUrl+details.poster_path} alt="" />
                            </div>
                        </div>
                        <div className='w-[70%] px-4'>
                            <p className='text-7xl font-black text-slate-100 mix-blend-difference mt-32'>{details.title}</p>
                            <p className='text-xl text-slate-100 mix-blend-difference mt-2 ml-4'>{details.tagline}</p>
                            <p className='text-lg text-slate-100 mix-blend-difference mt-4'>{details.overview}</p>
                            <div className='flex flex-row gap-2 mt-4'>
                                {details.genres.map((g) =>
                                <div className='bg-primary text-white py-1 px-2 text-sm' key={g}>
                                    {g.name}
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row-reverse w-[50%] px-8 border-r-2 border-black ' style={{background : "rgba(0,0,0, 0.65)"}}>
                        <Button onClick={onOpen} className='ml-8 mt-4' leftIcon={<img className='w-6 h-6' src={add} />} colorScheme='red' variant='solid'>
                            <p className='text-white'>
                                More like this
                            </p>
                        </Button>
                    </div>
                    <div className="flex flex-col gap-4 w-[50%] border-r-2 border-black pt-8" style={{background : "rgba(0,0,0, 0.65)"}}>
                        <div className="bg-black pt-8 px-4">
                            <p className='text-xl font-black text-slate-100'>Cast</p>
                            <div className="grid grid-cols-3 gap-4 text-sm text-slate-100 mt-4">
                                {cast.map((c) =>
                                    <p key={c.cast_id}>{c.name}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 w-[50%] border-r-2 border-black">
                        <div className="bg-black py-8 px-4">
                            <p className='text-xl font-black text-slate-100'>Watch Now <a href='https://www.justwatch.com/ca/' target='_blank' className='text-sm font-light ml-8 text-slate-300'>Powered by JustWatch</a></p>
                            
                            {providers == undefined ? 
                                <div>
                                    <p className='text-lg font-black text-slate-100 mt-2'>Currently Not Available :(</p>
                                </div>
                            : ""}
                            
                            {providers == undefined || providers.flatrate == undefined ? "" : 
                                <div>
                                    <p className='text-lg font-black text-slate-100'>Stream</p>
                                    <div className="flex flex-row gap-2 mt-2">
                                        {providers.flatrate.map((p) =>
                                            <img className='w-16 h-16 rounded-xl' src={baseUrl+p.logo_path} alt="" />
                                        )}
                                    </div>
                                </div>
                            } 
                            {providers == undefined || providers.rent == undefined ? "" : 
                                <div>
                                    <p className='text-lg font-black text-slate-100 mt-2'>Rent</p>
                                    <div className="flex flex-row gap-2 mt-2">
                                        {providers.rent.map((p) =>
                                            <img className='w-16 h-16 rounded-xl' src={baseUrl+p.logo_path} alt="" />
                                        )}
                                    </div>
                                </div>
                            }
                            {providers == undefined || providers.buy == undefined ? "" : 
                                <div>
                                    <p className='text-lg font-black text-slate-100'>Buy</p>
                                    <div className="flex flex-row gap-2 mt-2">
                                        {providers.buy.map((p) =>
                                            <img className='w-16 h-16 rounded-xl' src={baseUrl+p.logo_path} alt="" />
                                        )}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </ChakraProvider>
        )
    }
}

export default Details