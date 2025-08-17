import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";
import SafeImage from "@/components/ui/SafeImage";

export default function About() {
  return (
    <div className="bg-white">
      {/* Who We Are / Our Beliefs / Our Values */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Who We Are
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Discover who we are, what we believe, and the values that guide
              our church community.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Who We Are Card */}
            <div className="bg-[#F5F5F5] rounded-xl p-8 text-center transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Who We Are
              </h3>
              <p className="text-gray-600 mb-4">
                We are a community dedicated to worship, discipleship, and
                service, helping people grow in their faith.
              </p>
              <Button
                variant="default"
                className="bg-black text-white border-black hover:bg-gray-800"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            {/* Our Beliefs Card */}
            <div className="bg-[#F5F5F5] rounded-xl p-8 text-center transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Our Beliefs
              </h3>
              <p className="text-gray-600 mb-4">
                We are committed to the fundamental truths of the Christian
                faith as revealed in the Bible.
              </p>
              <Button
                variant="default"
                className="bg-black text-white border-black hover:bg-gray-800"
                asChild
              >
                <Link href="/beliefs">Explore Beliefs</Link>
              </Button>
            </div>

            {/* Our Values Card */}
            <div className="bg-[#F5F5F5] rounded-xl p-8 text-center transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Our Values
              </h3>
              <p className="text-gray-600 mb-4">
                Our values reflect the heart of our church community and guide
                how we live out our faith together.
              </p>
              <Button
                variant="default"
                className="bg-black text-white border-black hover:bg-gray-800"
                asChild
              >
                <Link href="/values">Discover Values</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Pastors */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h4 className="text-lg font-medium text-gray-500">
            Meet Our Pastors
          </h4>
          <h2 className="text-5xl font-extrabold text-gray-900 mt-2">
            Pastor R. Prabhu & Kavitha Prabhu
          </h2>

          <div className="mt-8 flex justify-center">
            <SafeImage
              src={IMAGES.pastorFamily}
              alt="Pastor R. Prabhu and Kavitha Prabhu"
              className="rounded-xl shadow-lg object-cover"
              width={800}
              height={500}
              priority
            />
          </div>

          <p className="mt-8 text-gray-600 text-left max-w-3xl mx-auto text-lg">
            RFAG Church was founded in January 2011 by Rev. R. Prabhu, who was
            born and raised in J.J.R. Nagar near Mysore Road. After accepting
            Jesus Christ as his Lord and Savior, Rev. Prabhu pursued theological
            education and was called to serve God&apos;s kingdom.
          </p>
          <p className="mt-4 text-gray-600 text-left max-w-3xl mx-auto text-lg">
            What began as a humble gathering of five members on a rooftop has
            grown into a vibrant community of nearly 300 believers who gather
            every Sunday to worship and grow in faith.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-gray-50 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Plan Your Visit
        </h2>
        <p className="mt-4 text-xl text-gray-700 max-w-2xl mx-auto">
          Join us for a worship experience and discover your purpose in Christ.
        </p>
        <div className="mt-10">
          <Button
            variant="default"
            className="bg-black text-white border-black hover:bg-gray-800"
            asChild
          >
            <Link href="/services">Service Times</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
