
const HeroTrustIndicators = () => {
  const institutions = ['AIIMS', 'Apollo', 'Fortis', 'Max Healthcare'];

  return (
    <div className="mt-16 text-center">
      <p className="text-arogya-teal mb-8 font-medium">Trusted by leading healthcare institutions</p>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
        {institutions.map((institution) => (
          <div key={institution} className="bg-white rounded-lg px-6 py-3 shadow-sm">
            <span className="text-arogya-dark-teal font-semibold">{institution}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroTrustIndicators;
