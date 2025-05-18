import React from 'react';
import { Mail, Users, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


// Define Button, Card, and other components directly
const Button = ({ className, onClick, children }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

const Card = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const CardHeader = ({ children }) => <div className="pb-4">{children}</div>;
const CardTitle = ({ className, children }) => <h2 className={className}>{children}</h2>;
const CardDescription = ({ className, children }) => <p className={className}>{children}</p>;
const CardContent = ({ children }) => <div>{children}</div>;

// Define cn (classnames) utility
const cn = (...args) => {
  return args
    .filter(Boolean)
    .reduce((acc, className) => {
      if (typeof className === 'string') {
        return acc + ' ' + className;
      } else if (typeof className === 'object') {
        for (const key in className) {
          if (className[key]) {
            acc += ' ' + key;
          }
        }
        return acc;
      }
      return acc;
    }, '')
    .trim();
};

const Contact = () => {
  const navigate= useNavigate();
  const openForm = (url) => window.open(url, '_blank');

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col items-center justify-center',
        'bg-gradient-to-br from-purple-600 via-pink-600 to-red-600', // Stronger gradient for modern feel
        'px-6 py-16 sm:px-8 lg:px-12' // Increased padding for spaciousness
      )}
    >
      <div className="w-full max-w-4xl space-y-10"> {/* Increased space for better rhythm */}
        <h1 className={cn(
          'text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center',
          'drop-shadow-md' // Subtle shadow for a clean effect
        )}>
          Get in Touch
        </h1>
        <p className={cn(
          'text-center text-gray-200 text-base sm:text-lg md:text-xl', // Lighter text for better contrast
          'max-w-2xl mx-auto'
        )}>
          We're here to help and collaborate.  Reach out to us using the contact methods below.
        </p>

        <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-10', 'w-full')}> {/* Increased gap */}
          {/* Customer Queries Card */}
          <Card className={cn(
            'bg-white/5 backdrop-blur-md border border-white/10 rounded-xl', // More pronounced glass effect
            'shadow-lg hover:shadow-xl hover:scale-[1.01]', // Subtle hover effect
            'transition-all duration-300',
            'flex flex-col justify-between p-6 sm:p-8' // Added padding inside card
          )}>
            <CardHeader>
              <div className={cn(
                'w-14 h-14 rounded-lg flex items-center justify-center', // Larger icon container
                'bg-indigo-500/20 text-indigo-400',
                'mb-5 shadow-sm' // Subtle shadow
              )}>
                <Mail className="w-7 h-7" /> {/* Larger icon */}
              </div>
              <CardTitle className={cn('text-xl sm:text-2xl font-semibold text-white', 'text-left')}>
                Customer Support
              </CardTitle>
              <CardDescription className={cn('text-gray-300 text-sm sm:text-base', 'mt-2')}>
                For questions about orders, products, or general inquiries.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6">
              <Button
                onClick={() =>navigate('/contact-support') }
                className={cn(
                  'w-full bg-indigo-500 hover:bg-indigo-600 text-white',
                  'py-3 rounded-lg font-semibold text-lg', // Rounded corners
                  'transition-colors duration-300',
                  'shadow-md hover:shadow-lg flex items-center justify-center' // Center the icon and text
                )}
              >
                <Send className="w-5 h-5 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>

          {/* Collaboration Queries Card */}
          <Card className={cn(
            'bg-white/5 backdrop-blur-md border border-white/10 rounded-xl',
            'shadow-lg hover:shadow-xl hover:scale-[1.01]',
            'transition-all duration-300',
            'flex flex-col justify-between p-6 sm:p-8'
          )}>
            <CardHeader>
              <div className={cn(
                'w-14 h-14 rounded-lg flex items-center justify-center',
                'bg-teal-500/20 text-teal-400',
                'mb-5 shadow-sm'
              )}>
                <Users className="w-7 h-7" />
              </div>
              <CardTitle className={cn('text-xl sm:text-2xl font-semibold text-white', 'text-left')}>
                Partnerships
              </CardTitle>
              <CardDescription className={cn('text-gray-300 text-sm sm:text-base', 'mt-2')}>
                For business inquiries, collaborations, and partnership opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6">
              <Button
                onClick={() => navigate('/partner-with-us')}
                className={cn(
                  'w-full bg-teal-500 hover:bg-teal-600 text-white',
                  'py-3 rounded-lg font-semibold text-lg',
                  'transition-colors duration-300',
                  'shadow-md hover:shadow-lg flex items-center justify-center' // Center icon and text
                )}
              >
                <Send className="w-5 h-5 mr-2" />
                Partner With Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
