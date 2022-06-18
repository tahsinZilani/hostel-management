import Gallery from 'react-grid-gallery';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from "react";

import Navbar from "./navbar.component";

const Home = () => {
    const IMAGES =
        [{
                src: "https://limg.hostelsclub.com/pics/13898/013898-1242190190.jpg",
                thumbnail: "https://limg.hostelsclub.com/pics/13898/013898-1242190190.jpg",
                thumbnailWidth: 450,
                thumbnailHeight: 250,
                isSelected: true,
                caption: "Chistia Hostel"
        },
        {
                src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/230216535.jpg?k=a669fb53c132e01f208f70a7e2a8213b199c539a56c0d11cdd6cd273c3ac023f&o=&hp=1",
                thumbnail: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/230216535.jpg?k=a669fb53c132e01f208f70a7e2a8213b199c539a56c0d11cdd6cd273c3ac023f&o=&hp=1",
                thumbnailWidth: 450,
                thumbnailHeight: 250,
                caption: "RH TOwer"
        },
        
        {
                src: "https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/77/29/bd/university-boys-hostel.jpg",
                thumbnail: "https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/77/29/bd/university-boys-hostel.jpg",
                thumbnailWidth: 450,
                thumbnailHeight: 250
        },

        {
            src: "https://images.trvl-media.com/hotels/40000000/39650000/39649900/39649813/6bbd8b10.jpg?impolicy=fcrop&w=670&h=385&p=1&q=medium",
            thumbnail: "https://images.trvl-media.com/hotels/40000000/39650000/39649900/39649813/6bbd8b10.jpg?impolicy=fcrop&w=670&h=385&p=1&q=medium",
            thumbnailWidth: 450,
            thumbnailHeight: 250
        },

        {
            src: "https://www.instantworldbooking.com/directory/Bangladesh/img/bangladeshtravelhomes_dhaka_bdthbilding.jpg",
            thumbnail: "https://www.instantworldbooking.com/directory/Bangladesh/img/bangladeshtravelhomes_dhaka_bdthbilding.jpg",
            thumbnailWidth: 420,
            thumbnailHeight: 250
        },

        {
            src: "https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/77/29/33/university-boys-hostel.jpg",
            thumbnail: "https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/77/29/33/university-boys-hostel.jpg",
            thumbnailWidth: 420,
            thumbnailHeight: 250
        },
    ];
        
    return ( 
        <>
            <Navbar/>
            <br/>
            <Gallery 
                images={IMAGES}
                rowHeight={300}
            />
        </>
     );
}
 
export default Home;