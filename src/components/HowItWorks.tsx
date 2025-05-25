
const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Sign Up & Profile',
      description: 'Create your account and complete your medical profile with basic information and health history.',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      number: '02',
      title: 'Choose Doctor',
      description: 'Browse our network of verified doctors, read reviews, and select the best fit for your needs.',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: '03',
      title: 'Book Appointment',
      description: 'Schedule your consultation at a time that works for you with instant confirmation.',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      number: '04',
      title: 'Video Consultation',
      description: 'Connect with your doctor through secure video call and receive professional medical advice.',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Arogya Care Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting quality healthcare has never been easier. Follow these simple steps to connect with expert doctors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-healthcare-blue-light transform translate-x-4 z-0"></div>
              )}
              
              <div className="relative z-10">
                <div className="mx-auto mb-6 w-16 h-16 bg-healthcare-blue text-white rounded-full flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-healthcare-blue-light text-healthcare-blue rounded-lg">
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-healthcare-blue-light rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h3>
            <p className="text-gray-600 mb-6">Join thousands of patients who trust Arogya Care for their healthcare needs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-healthcare-blue hover:bg-healthcare-blue-dark text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Start as Patient
              </button>
              <button className="border-2 border-healthcare-blue text-healthcare-blue hover:bg-healthcare-blue hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Join as Doctor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
