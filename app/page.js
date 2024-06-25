
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faChartLine, faClock } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <>
      <div className="hero-section relative text-center bg-cover bg-center bg-transparent" style={{ backgroundImage: 'url("/grid.svg")', height: '100vh' }}>
        <div className="container mx-auto flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-bold text-black">Your Personal AI Interview Coach</h1>
          <p className="mt-4 text-lg text-gray-600">Prepare for your interviews with AI-driven insights and personalized coaching.</p>
          <Link href="/dashboard" className="mt-8 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
            Get Started
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </Link>
        </div>
      </div>
      <div className="features-section py-12 bg-transparent">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-black">Why Choose PreapwiseAI?</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-item">
              <FontAwesomeIcon icon={faRobot} className="w-8 h-8 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold text-black">AI-Driven Insights</h3>
              <p className="mt-2 text-gray-600">Get personalized feedback based on your performance.</p>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faChartLine} className="w-8 h-8 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold text-black">Comprehensive Reports</h3>
              <p className="mt-2 text-gray-600">Detailed reports to help you understand your strengths and weaknesses.</p>
            </div>
            <div className="feature-item">
              <FontAwesomeIcon icon={faClock} className="w-8 h-8 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold text-black">Flexible schedules</h3>
              <p className="mt-2 text-gray-600">Give interview at your own pace with our flexible schedules.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="testimonials-section py-12 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-black">What Our Users Say</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="testimonial-item">
              <p className="text-gray-600">"PreapwiseAI helped me ace my interviews! The AI feedback was spot on."</p>
              <p className="mt-4 font-semibold text-black">- Jane Doe</p>
            </div>
            <div className="testimonial-item">
              <p className="text-gray-600">"A fantastic tool for anyone looking to improve their interview skills."</p>
              <p className="mt-4 font-semibold text-black">- John Smith</p>
            </div>
            <div className="testimonial-item">
              <p className="text-gray-600">"Highly recommend PreapwiseAI for its detailed and insightful reports."</p>
              <p className="mt-4 font-semibold text-black">- Sarah Lee</p>
            </div>
          </div>
        </div>
      </div>
      {/* <footer className="py-6 bg-gray-800 text-white">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 PreapwiseAI. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link href="/privacy-policy" className="text-white">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-white">Terms of Service</Link>
            <Link href="/contact" className="text-white">Contact Us</Link>
          </div>
        </div>
      </footer> */}
    </>
  );
}
