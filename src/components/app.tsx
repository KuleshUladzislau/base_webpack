import React, {useState} from 'react';
import classes from './app.module.scss';
import {Link, Outlet} from "react-router-dom";
import AvatarPng from '@/assets/ava3png.png';
import AvatarJPG from '@/assets/ava2jpg.jpg';
import AvaSvg from '@/assets/ava1'
export const App = () => {
    const [count,setCount] = useState(0)

    //
    // if(__PLATFORM__ === 'desktop'){
    //     return <div>ISDESKTOPPLATFORM</div>
    // }
    //
    //
    // if(__PLATFORM__ === 'mobile'){
    //     return <div>ISMOBILEPLATFORM</div>
    // }

    return (
        <div data-testid={'AppDataTestId'}>
            <Link to={'/about'}>about</Link>
            <Link to={'/shop'}>shop</Link>
            <h1>Platform ={__PLATFORM__}</h1>
            <div>
               <AvaSvg style={{color:'white'}}  height={200}/>
            </div>

            <h2>count {count}</h2>
            <button className={classes.button} onClick={()=>setCount(count+1)}>
                <span>click</span>
            </button>
            <Outlet/>
        </div>
    );
};


