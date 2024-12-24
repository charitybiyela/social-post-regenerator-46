export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground">
              We'd love to hear from you. Please fill out this form or shoot us an email.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-muted-foreground">contact@example.com</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <p className="text-muted-foreground">
              123 Business Street<br />
              Suite 100<br />
              City, State 12345
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
            <p className="text-muted-foreground">
              Monday - Friday: 9:00 AM - 5:00 PM<br />
              Saturday & Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}