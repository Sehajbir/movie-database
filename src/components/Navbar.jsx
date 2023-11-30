import React, { useRef } from 'react'
import {logo, search, menu} from "../assets"
import { Input, InputRightElement, InputGroup, Menu, MenuButton, MenuList, IconButton, MenuGroup, MenuItem, MenuDivider } from '@chakra-ui/react'
import { genre } from '../assets/constants';
import { useState } from 'react';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const [navbar, setNavbar] = useState(false);
    const [searchText, setSearchText] = useState("");

    const navigate = useNavigate();
    
    const explore = (r, r1) =>{
        console.log(r);
        navigate("/explore/"+r+"/"+r1);
    }


    const changeBg = () =>{
        if(window.scrollY > 80){
            setNavbar(true)
        } else{
            setNavbar(false)
        }
    }

    window.addEventListener('scroll', changeBg);

    var navClass = 'flex flex-row gap-6 h-14 bg-transparent items-center fixed top-0 w-full z-50';

    const onKeyUp = (event) => {
        if(event.charCode == 13){
            console.log(searchText);
            navigate("/search/"+searchText);
        }
    }

  return (
    <div className={navbar ? navClass + ' scrolled' : navClass}>
        <span className='w-14 ml-10'>
            <img src={logo} alt="logo" />
        </span>
        <span className='grow'></span>
        <span className='w-96 '>
        <InputGroup>
            <Input onKeyPress={onKeyUp} onChange={e => setSearchText(e.target.value)} type='text' placeholder='Search' className='text-sky-200'/>
        </InputGroup>
        </span>
        <IconButton
                onClick={() => { searchText === "" ? "" : navigate("/search/"+searchText)}}
                className='z-10'
                variant='outline'
                colorScheme='teal'
                aria-label='Search'
                fontSize='20px'
                icon={<img src={search} alt='Search' className='w-4 h-4' />}
                />
        <span className='w-14 mr-10'>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    variant='outline'
                    icon={<img src={menu} className='w-6 h-6'/>}
                />

                <MenuList>
                    <MenuGroup title="Genre">
                    {genre.map((link) => (
                        <MenuItem onClick={() => explore(link.genre_id, link.title)}>{link.title}</MenuItem>
                    ))}
                    </MenuGroup>
                </MenuList>
            </Menu>
        </span>
    </div>
  )
}

export default Navbar