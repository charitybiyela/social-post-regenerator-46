const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="border-b border-gray-200 dark:border-gray-800 pb-8 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">Privacy Policy</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Learn how we protect and manage your personal information</p>
      </header>
      
      <div className="space-y-6 text-gray-600 dark:text-gray-400">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Information Collection</h2>
          <p>
            We collect information to provide better services to our users. The types of information we collect include:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Information you provide to us directly</li>
            <li>Information we get from your use of our services</li>
            <li>Information from third-party sources</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Information</h2>
          <p>
            We use the information we collect to provide, maintain, protect and improve our services, to develop new ones, and to protect our users. We also use this information to offer you tailored content.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Information Security</h2>
          <p>
            We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. In particular:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>We encrypt our services using SSL</li>
            <li>We review our information collection, storage, and processing practices</li>
            <li>We restrict access to personal information</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Privacy;