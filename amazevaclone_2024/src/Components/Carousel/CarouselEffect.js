import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import {img} from './img/data'; 
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.css"


function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
       {
       img.map((imageItemLink) => {
        return <img src={imageItemLink}/>
       })
       }
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  );
}

export default CarouselEffect;


{/* // import React from 'react';
// import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// function MyCarousel() {
//   return ( */}
{/* //     <div>
//       <ResponsiveCarousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
//         <div>
//           <img src="https://via.placeholder.com/600x400" alt="Slide 1" />
//           <p className="legend">Slide 1</p>
//         </div>
//         <div>
//           <img src="https://via.placeholder.com/600x400" alt="Slide 2" />
//           <p className="legend">Slide 2</p>
//         </div>
//         <div>
//           <img src="https://via.placeholder.com/600x400" alt="Slide 3" />
//           <p className="legend">Slide 3</p>
//         </div>
//       </ResponsiveCarousel>
//     </div>
//   );
// }

// export default MyCarousel; */}
