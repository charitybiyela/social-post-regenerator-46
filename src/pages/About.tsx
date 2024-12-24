const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="border-b border-gray-200 dark:border-gray-800 pb-8 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">About Us</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Your trusted source for real-time news and updates</p>
      </header>
      
      <div className="space-y-6 text-gray-600 dark:text-gray-400">
        <p>
          Welcome to our News Dashboard, a cutting-edge platform dedicated to delivering real-time news and information across multiple sectors. Our mission is to provide accurate, timely, and comprehensive coverage of events that matter to you.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
        <p>
          We strive to be the most trusted source of news and information, leveraging technology to deliver personalized content that keeps you informed and engaged. Our platform combines traditional journalism with modern technology to provide a unique news experience.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Accuracy and truth in reporting</li>
          <li>Timeliness in news delivery</li>
          <li>Comprehensive coverage across sectors</li>
          <li>Innovation in news presentation</li>
          <li>User-centric approach</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
        <p>
          Our team consists of experienced journalists, tech experts, and industry specialists who work tirelessly to bring you the most relevant and impactful news stories. We believe in the power of information to transform lives and societies.
        </p>
      </div>
    </div>
  );
};

export default About;