const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="border-b border-gray-200 dark:border-gray-800 pb-8 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">About Us</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Pioneering AI-Driven News Personalization</p>
      </header>
      
      <div className="space-y-6 text-gray-600 dark:text-gray-400">
        <p>
          Welcome to our News Dashboard, where cutting-edge AI technology meets personalized news delivery. Our platform leverages advanced algorithms and comprehensive user profiling to deliver news that matters to you.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Technology</h2>
        <p>
          At the heart of our platform lies a sophisticated News Regeneration Engine that processes multiple variables including demographics, geographic context, interests, professional background, circumstances, emotional state, and lifestyle factors to deliver perfectly tailored content.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Comprehensive demographic and geographic analysis</li>
          <li>Interest-based content curation</li>
          <li>Professional context consideration</li>
          <li>Circumstantial awareness and adaptation</li>
          <li>Emotional intelligence in content delivery</li>
          <li>Lifestyle-aligned scheduling</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
        <p>
          We strive to revolutionize news consumption by creating a deeply personalized experience that adapts to your unique profile, circumstances, and emotional state. Our goal is to deliver not just relevant news, but news that resonates with your personal journey.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
        <p>
          Our team combines expertise in artificial intelligence, journalism, and user experience design to create a platform that understands and adapts to your needs. We believe in the power of technology to transform how we consume and interact with news.
        </p>
      </div>
    </div>
  );
};

export default About;