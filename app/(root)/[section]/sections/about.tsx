
import React from 'react'

const About = () => {
  return (
    <div className="bg-secondary text-white px-10 md:px-20">
      
      {/* Header */}
      <section className="w-full py-24 space-y-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl">
            247TechSpyware, under TORTH ENTERPRISE LLC, is a media company built to keep 
            people informed about what matters in tech.
          </p>
          <br/>
          <p className="text-gray-400 text-lg leading-relaxed">
            Our work covers everyday technology, the fast-moving world of AI, the shift in 
            eCommerce tools, and the steady rise of smart automotive systems.
          </p>
          <br/>
          <p className="text-gray-400 text-lg leading-relaxed">
            We keep things straight and easy to follow. No noise. No clutter. Just clear stories, 
            updates, and explanations that help readers stay aware of how technology shapes 
            daily life.
          </p>
        </div>
        <div className="max-w-5xl mx-auto space-y-14">

          {/* What We Do */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">What We Do</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-4">
              247TechSpyware watches key areas that keep changing the way people work, shop, 
              and move around. We cover:
            </p>

            <ul className="list-disc pl-6 text-gray-400 text-lg space-y-2">
              <li>Tech updates and product changes</li>
              <li>AI tools and how people use them</li>
              <li>eCommerce tools and trends</li>
              <li>Automotive tech and smart systems</li>
            </ul>

            <p className="text-gray-400 text-lg leading-relaxed mt-4">
              TORTH ENTERPRISE also owns several other businesses, including eCommerce stores 
              and various blog websites.  
              <br />  
              Our goal is simple: **share information people can trust.**
            </p>
          </div>

          {/* How We Work */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">How We Work</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Our team follows a steady routine. We read, research, and test tools to understand 
              what they mean for regular users, business owners, and anyone curious about new 
              tech.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mt-4">
              We explain things in clear language so readers don’t get lost in complicated terms.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Values</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-4">
              TORTH ENTERPRISE has always believed in honest work, steady growth, and keeping 
              things practical.
            </p>

            <ul className="list-disc pl-6 text-gray-400 text-lg space-y-2">
              <li>Clear reporting</li>
              <li>Accurate details</li>
              <li>Real use cases</li>
              <li>A simple voice that respects the reader’s time</li>
            </ul>
          </div>

          {/* Why We Exist */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Why We Exist</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              People want to understand the tools shaping their future.  
              We give them a place to learn without confusion.  
              And we do it every single day.
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}

export default About
