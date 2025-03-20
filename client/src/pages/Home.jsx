import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Listing from "./Listing";
import Listingitem from "../components/Listingitem";

SwiperCore.use([Navigation]);

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await axios.get("/api/listing/get?offer=true&limit=4");
        const data = await res.data;
        if (data) {
          setOfferListings(data);
        }
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await axios.get("/api/listing/get?type=rent&limit=4");
        const data = await res.data;
        if (data) {
          setRentListings(data);
        }
      fetchSaleListings();
        
      } catch (error) {
        console.log(error);
      }
    }
    const fetchSaleListings = async () => {
      try {
        const res = await axios.get("/api/listing/get?type=sale&limit=4");
        const data = await res.data;
        if (data) {
          setSaleListings(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* TOP */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500 ">perfect</span> <br />
          place with ease
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm">
          Sahand Estate is the best place to find your next perfect place.{" "}
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>

      {/* SWIPER */}
      <Swiper navigation={true} modules={[Navigation]} autoplay={true}>
      {offerListings && offerListings.length > 0 && 
        offerListings.map((listing) => (
          <SwiperSlide>
            <div style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover'}} className="h-[500px]" key={listing._id}>

            </div>
          </SwiperSlide>
        ))
      }
      </Swiper>

      {/* LISTING RESULTS FOR OFFER, SALE AND RENT */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
              <Link to={'/search?offer=true'} className="text-sm text-blue-800 hover:underline">Show more offers</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>
        )}

{rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent places for rent</h2>
              <Link to={'/search?type=rent'} className="text-sm text-blue-800 hover:underline">Show more places for rent</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>
        )}

{saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent places for sale</h2>
              <Link to={'/search?type=sale'} className="text-sm text-blue-800 hover:underline">Show more places for sale</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
