import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../assets/banner/b1.png';
import img2 from '../../assets/banner/b2.png';
import img3 from '../../assets/banner/b3.png';
import img4 from '../../assets/banner/b4.png';
import img5 from '../../assets/banner/b5.png';

const Banner = () => {
    return (
        <div>
            <Carousel showArrows={true} autoPlay interval={3000} infiniteLoop showThumbs={false} showStatus={false}>
                <div>
                    <img className="lg:h-[80vh]" src={img1} />
                     
                </div>
                <div>
                    <img className="lg:h-[80vh]" src={img2} />
                     
                </div>
                <div>
                    <img className="lg:h-[80vh]" src={img3} />
                     
                </div>
                <div>
                    <img className="lg:h-[80vh]" src={img4} />
                     
                </div>
                <div>
                    <img className="lg:h-[80vh]" src={img5} />
                     
                </div>
                {/* <div>
                    <img src={img} />
                     
                </div> */}
            </Carousel>
        </div>
        // onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}
    );
};

export default Banner;