import Image from 'next/image';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">About Us</h1>
          <p className="mt-6 max-w-3xl text-xl text-indigo-100">
            Learn more about our church, our beliefs, and our mission to serve the community.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16 bg-white overflow-hidden lg:py-24">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="relative">
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Story
            </h2>
            <p className="mt-6 text-xl text-gray-500 text-center max-w-3xl mx-auto">
              Rhema Faith AG Church was founded in 2005 with a small group of believers who had a vision to create a welcoming community of faith. 
              Over the years, we've grown into a vibrant church family dedicated to worship, discipleship, and service.
            </p>
          </div>

          <div className="mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative">
              <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
                <div className="pt-12 sm:pt-16 lg:pt-20">
                  <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                    Our Mission
                  </h2>
                  <p className="mt-6 text-gray-500 text-lg">
                    To lead people into a growing relationship with Jesus Christ through worship, discipleship, and service. 
                    We are committed to sharing the love of God with our community and the world.
                  </p>
                </div>
                <div className="mt-10">
                  <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                    Our Vision
                  </h2>
                  <p className="mt-6 text-gray-500 text-lg">
                    To be a church where lives are transformed by the power of the Gospel, where people discover their God-given purpose, 
                    and where the love of Christ is demonstrated in practical ways to those in need.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 -mx-4 relative lg:mt-0">
              <div className="relative mx-auto w-full rounded-lg shadow-lg">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Church gathering"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Beliefs */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Core Beliefs</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              We believe in the fundamental truths of Christianity as revealed in the Bible.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-16">
              {[
                {
                  name: 'The Bible',
                  description: 'We believe the Bible is the inspired and infallible Word of God, the final authority for faith and life.'
                },
                {
                  name: 'The Trinity',
                  description: 'We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.'
                },
                {
                  name: 'Salvation',
                  description: 'We believe in salvation by grace through faith in Jesus Christ, who died for our sins and rose again.'
                },
                {
                  name: 'The Church',
                  description: 'We believe in the universal church, the body of Christ, of which all believers are members.'
                },
                {
                  name: 'The Great Commission',
                  description: 'We believe in the Great Commission to make disciples of all nations, baptizing and teaching them to obey Christ.'
                }
              ].map((belief, index) => (
                <div key={belief.name} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <span className="text-lg font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{belief.name}</h3>
                    <p className="mt-2 text-gray-500">{belief.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
