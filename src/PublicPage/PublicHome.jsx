import React, { useState } from 'react';
import Navbar from "./PublicNavbar";
import Footer from "./Footer";
import { FaCalendarAlt, FaUsers, FaBed, FaArrowRight } from "react-icons/fa";
import backgroundImage from "./Images/Background.png";
import underwaterImage from './Images/Picture1.png';
import contactImage from './Images/ContactUsPic.png';
import Pic1 from "./Images/Pic1.png";
import Pic2 from "./Images/Pic2.png";
import Pic3 from "./Images/Pic3.png";
import Pic4 from "./Images/Pic4.png";
import Pic5 from "./Images/Pic5.png";
import Pic6 from "./Images/Pic6.png";
import Pic7 from "./Images/Pic7.png";
import Pic8 from "./Images/Pic8.png";
import Pic9 from "./Images/Pic9.png";

const PublicHome = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const roomImages = [
    {
      id: 1,
      src: Pic3, 
      alt: 'Twin Room with teal walls and comfortable beds',
      type: 'Twin Room'
    },
    {
      id: 2,
      src: Pic2, 
      alt: 'Twin Room with multiple beds and bright decor',
      type: 'Twin Room'
    },
    {
      id: 3,
      src: Pic6, 
      alt: 'Standard Double Room with comfortable beds',
      type: 'Standard Double Room'
    },
    {
      id: 4,
      src: Pic4, 
      alt: 'Standard Double with wooden furniture',
      type: 'Standard Double Room'
    },
    {
      id: 5,
      src: Pic5, 
      alt: 'Triple Room with warm lighting and comfortable beds',
      type: 'Triple Room'
    },
    {
      id: 6,
      src: Pic1, 
      alt: 'Triple Room with large bed',
      type: 'Triple Room'
    },
    {
      id: 7,
      src: Pic7, 
      alt: 'Bunk beds for groups or families',
      type: 'Family Room'
    },
    {
      id: 8,
      src: Pic8, 
      alt: 'Family Room with multiple beds',
      type: 'Family Room'
    },
    {
      id: 9,
      src: Pic9, 
      alt: 'Standard Double Room with comfortable beds',
      type: 'Standard Double  Room'
    }
  ];

  const offers = [
    {
      id: 1,
      title: "The Coolest Way to Beat the Heat",
      subtitle: "Stay & Enjoy 2025-2026",
      image: "/images/cool-room.jpg",
      description: "Experience comfort in our climate-controlled rooms with a refreshing coastal theme.",
      price: "₱ 2,000.00",
      features: ["Air Conditioning", "Sea View", "Free WiFi"]
    },
    {
      id: 2,
      title: "A Staycation to Remember",
      subtitle: "2025-2026",
      image: "/images/cozy-room.jpg",
      description: "Our premium rooms offer a perfect blend of comfort and luxury for memorable stays.",
      price: "₱ 1,500.00",
      features: ["Fireplace", "King Size Bed", "Breakfast Included"]
    },
    {
      id: 3,
      title: "The Ultimate Summer Break",
      subtitle: "2025-2026",
      image: "/images/bright-room.jpg",
      description: "Spacious rooms with modern amenities for the perfect summer escape.",
      price: "₱ 1,500.00",
      features: ["Balcony", "Mini Bar", "Pool Access"]
    },
    {
      id: 4,
      title: "Your Ticket to Relaxation",
      subtitle: "Book your Staycation & Save! 2025-2026",
      image: "/images/twin-room.jpg",
      description: "Ideal for families and groups, our twin rooms offer comfort and value.",
      price: "₱ 3,800.00",
      features: ["Twin Beds", "Family Friendly", "Complimentary Breakfast"]
    }
  ];


  return (
    <div>
      <Navbar />
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center text-white text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute inset-0 bg-opacity-80"></div> 
        <div className="relative z-10 px-4 max-w-6xl mx-auto w-full">
          <div className="mb-16 transform transition-all duration-700 translate-y-0 opacity-100">
            <h2 className="text-lg md:text-xl uppercase tracking-widest mb-2 font-light">Discover Paradise</h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white drop-shadow-lg">
              KRISMARK <span className="text-orange-500">DIVE LODGE</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-100">
              Experience world-class diving and luxurious comfort in the heart of Moalboal, Cebu
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 w-full max-w-5xl mx-auto px-4">
          <div className="relative z-10 transform transition-all duration-700 translate-y-0 opacity-100">
            <h3 className="text-xl font-semibold mb-8 text-white text-center">Find Your Perfect Stay</h3> 

            <div className="flex flex-col md:flex-row items-end gap-4"> 
              {/* Room Type */}
              <div className="flex-1 space-y-2">
                <label className="flex items-center text-white text-sm font-medium">
                  <FaBed className="mr-2 text-orange-500" />
                  Room Type
                </label>
                <select className="w-full p-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black placeholder-white placeholder-opacity-70 shadow-sm hover:shadow transition-shadow duration-300">
                  <option value="" className="text-gray-800">Select Room Type</option>
                  <option value="standard" className="text-gray-800">Standard Double Room</option>
                  <option value="deluxe" className="text-gray-800">Twin Room</option>
                  <option value="suite" className="text-gray-800">Triple Room</option>
                  <option value="family" className="text-gray-800">Family Room</option>
                </select>
              </div>

              {/* Check In / Out */}
              <div className="flex-1 space-y-2">
                <label className="flex items-center text-white text-sm font-medium">
                  <FaCalendarAlt className="mr-2 text-orange-500" />
                  Check In / Out
                </label>
                <div className="grid grid-cols-2 gap-3"> {/* Adjusted gap to 3 */}
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black placeholder-white placeholder-opacity-70 shadow-sm hover:shadow transition-shadow duration-300"
                    placeholder="Check in"
                  />
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black placeholder-white placeholder-opacity-70 shadow-sm hover:shadow transition-shadow duration-300"
                    placeholder="Check out"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="flex-1 space-y-2">
                <label className="flex items-center text-white text-sm font-medium">
                  <FaUsers className="mr-2 text-orange-500" />
                  Guests
                </label>
                <select className="w-full p-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black placeholder-white placeholder-opacity-70 shadow-sm hover:shadow transition-shadow duration-300">
                  <option value="1" className="text-gray-800">1 Guest</option>
                  <option value="2" defaultValue className="text-gray-800">2 Guests</option>
                  <option value="3" className="text-gray-800">3 Guests</option>
                  <option value="4" className="text-gray-800">4 Guests</option>
                  <option value="5" className="text-gray-800">5+ Guests</option>
                </select>
              </div>

              {/* Check Availability Button */}
              <button className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center shadow-lg hover:shadow-xl ml-auto">
                Check Availability
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="overview" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10 max-w-6xl mx-auto">
            {/* Left side - Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src={underwaterImage} 
                    alt="Vibrant underwater coral reef with tropical fish at Moalboal" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-orange-500 bg-opacity-20 -z-10"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-blue-500 bg-opacity-20 -z-10"></div>
              </div>
            </div>

            {/* Right side - Text content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center lg:text-left text-blue-900">
                WELCOME TO <span className="text-orange-500">KRISMARK DIVE LODGE</span> – YOUR OCEAN ADVENTURE STARTS HERE!
              </h2>
              
              <p className="text-gray-700 leading-relaxed text-lg">
                Discover Krismark Dive Lodge in Moalboal—a hidden gem by the sea where adventure and relaxation collide. Feel the cool ocean breeze, explore vibrant marine life, and unwind in a cozy, welcoming haven designed to refresh your body and soul.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg">
                The sea is calling, and your unforgettable escape begins here. Whether you're seeking thrills beneath the waves or tranquility by the shore, our lodge offers an experience that lingers long after you leave.
              </p>

              {/* Call to action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#rooms" className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-medium transition-colors duration-200 text-center">
                  Explore Our Rooms
                </a>
                <a href="#contact" className="bg-blue-900 hover:bg-blue-800 text-white py-3 px-6 rounded-full font-medium transition-colors duration-200 text-center">
                  Contact Us
                </a>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Eco-Friendly Stays</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Beachfront Access</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Cozy Rooms</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Local Cuisine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="rooms" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Text Content */}
            <div className="space-y-6">
              <div>
                <span className="text-orange-500 font-medium uppercase tracking-wider">OUR ROOMS</span>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">
                  Savor Restful Moments
                </h2>
                <div className="w-32 h-1 bg-orange-500 mt-3"></div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                At Krismark Dive Lodge, we offer accommodations for every guest—solo travelers, couples, families, or groups. Choose from cozy Twin Rooms, spacious Family Rooms, versatile Triple Rooms, or elegant Standard Double Rooms. Each space is thoughtfully designed for comfort and convenience, providing the perfect base to explore. Your ideal stay starts here!
              </p>
              
              <a 
                href="#all-rooms" 
                className="inline-flex items-center mt-4 text-orange-500 hover:text-orange-600 transition-colors duration-200 group border border-orange-500 hover:border-orange-600 rounded-md px-4 py-2"
              >
                <span>View All Rooms</span>
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
            
            {/* Right Side - Image Grid */}
            <div className="grid grid-cols-3 gap-3">
              {roomImages.map((image) => (
                <div 
                  key={image.id}
                  className="relative rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
                  onMouseEnter={() => setHoveredImage(image.id)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-24 sm:h-32 md:h-40 object-cover transition-transform duration-500 hover:scale-110" 
                  />
                  
                  {/* Hover Overlay */}
                  {hoveredImage === image.id && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
                      <span className="text-white text-sm font-medium">{image.type}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="offers" className="min-h-screen flex items-center justify-center bg-yellow-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Summer Staycation</h2>
            <div className="w-24 h-1 bg-orange-400 mx-auto"></div>
            <p className="mt-4 text-gray-600">Escape the ordinary with our special summer packages</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {offers.slice(0, 3).map(offer => (
              <div 
                key={offer.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-2"
                onMouseEnter={() => setHoveredCard(offer.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={offer.image || "/api/placeholder/400/320"} 
                    alt={offer.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {hoveredCard === offer.id && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <button className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium hover:bg-orange-400 hover:text-white transition-colors">
                        Book Now
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{offer.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{offer.subtitle}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold text-orange-600 text-lg">{offer.price}<span className="text-xs">/night</span></span>
                    <span className="text-sm text-gray-500">Limited offer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <div 
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredCard(4)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative">
                  <img 
                    src={offers[3].image || "/api/placeholder/600/400"} 
                    alt={offers[3].title} 
                    className="w-full h-64 md:h-full object-cover"
                  />
                  {hoveredCard === 4 && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <button className="bg-white text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-orange-400 hover:text-white transition-colors">
                        Book Now
                      </button>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-6 flex flex-col justify-center">
                  <h3 className="font-bold text-2xl mb-2">{offers[3].title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{offers[3].subtitle}</p>
                  <p className="text-gray-600 mb-4">{offers[3].description}</p>
                  <ul className="mb-6">
                    {offers[3].features.map((feature, index) => (
                      <li key={index} className="flex items-center mb-2">
                        <svg className="w-4 h-4 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-orange-600 text-2xl">{offers[3].price}<span className="text-sm">/night</span></span>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition-colors">
                      Book & Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
              View All Staycation Packages
            </button>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center bg-red-100">
        <div className="w-full max-w-4xl mx-auto">
          {/* Hero banner with underwater diving image */}
          <div className="relative h-72">
            <img 
              src={contactImage}
              alt="Underwater coral reef with diver" 
              className="w-full h-full object-cover"
            />
            
            {/* Overlay text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
              <h1 className="text-3xl font-bold">CONTACT KRISMARK</h1>
              <h2 className="text-2xl font-bold mb-2">DIVE LODGE</h2>
              <p className="text-lg">We Look Forward To Hearing From You</p>
            </div>
          </div>
    
          {/* Contact information section */}
          <div className="bg-white p-8">
            <h2 className="text-xl font-bold text-center mb-6">We Are Here To Help</h2>
            
            <p className="text-center mb-8">
              No matter what your inquiry is regarding, there will always be someone to help you at Krismark Dive Lodge. Need to make a hotel booking? Have a question about a hotel rate? You will find all the right details below.
            </p>
            
            <div className="max-w-xl mx-auto space-y-6">
              {/* Call us section */}
              <div className="text-center">
                <h3 className="font-bold mb-2">CALL US</h3>
                <p>For general inquiries, please call 09475203454</p>
              </div>
              
              {/* Email us section */}
              <div className="text-center">
                <h3 className="font-bold mb-2">EMAIL US</h3>
                <p>Please allow up to 48 hours for a response.</p>
                <p>Hotel reservations: krismarkdivelodgemoalboal@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="Faqs" className="min-h-screen flex items-center justify-center bg-purple-100">
        <h1 className="text-4xl font-bold">FAQS Section</h1>
      </section>

      <Footer />
    </div>
  );
};
export default PublicHome;