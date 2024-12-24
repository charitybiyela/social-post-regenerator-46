const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="border-b border-gray-200 dark:border-gray-800 pb-8 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Get in touch with our team for support and inquiries</p>
      </header>
      
      <div className="space-y-8">
        <p className="text-gray-600 dark:text-gray-400">
          We're here to help and answer any question you might have. We look forward to hearing from you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>Email: contact@newsdashboard.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 News Street, Media City, ST 12345</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Business Hours</h2>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;