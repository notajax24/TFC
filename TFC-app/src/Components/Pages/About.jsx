import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCloudversify,
} from "react-icons/fa";

export default function About() {
  return (
    <footer id="about" className="  bg-gray-900 text-gray-300 py-12 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-yellow-400 font-bold text-xl mb-4">
              About TFC
            </h3>
            <p className="text-sm">
              Premium fitness destination helping you achieve health goals
              through personalized training and expert guidance.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-yellow-400 font-bold text-xl mb-4">Contact</h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <FaMapMarkerAlt className="text-orange-500" />
                <span>
                  4th floor, The Exchange Tower, Near NMC , Nashik Road 📍
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <FaEnvelope className="text-orange-500" />
                <a
                  href="mailto:jachak68@gmail.com"
                  className="hover:text-yellow-400"
                >
                  jachak68@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="space-y-4">
            <h3 className="text-yellow-400 font-bold text-xl mb-4">
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="https://facebook.com/tfc"
                className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400/20 transition-colors"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                target="_blank"
                href="https://instagram.com/tfc.fitness.nashik"
                className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400/20 transition-colors"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://twitter.com/tfc"
                className="p-2 bg-gray-800 rounded-full hover:bg-yellow-400/20 transition-colors"
              >
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>
            Developed by
            <a
              href="https://instagram.com/ajax.pvt"
              className="ml-1 text-yellow-400 hover:text-orange-500"
            >
              Ajay Jachak 💻
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
