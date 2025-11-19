import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    // <footer className="bg-primary text-primary-foreground py-12 px-4">
    //   <div className="max-w-6xl mx-auto">
    //     <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
    //       <div>
    //         <h3 className="font-bold text-lg mb-4">TaeTae Foundation</h3>
    //         <p className="text-sm opacity-90">
    //           Building tomorrow's leaders through mentorship, education, and opportunity.
    //         </p>
    //       </div>
    //       <div>
    //         <h4 className="font-bold mb-4">Programs</h4>
    //         <ul className="space-y-2 text-sm">
    //           <li>
    //             <Link href="/programs/skills" className="hover:underline">
    //               Skills
    //             </Link>
    //           </li>
    //           <li>
    //             <Link href="/programs/education" className="hover:underline">
    //               Education
    //             </Link>
    //           </li>
    //           <li>
    //             <Link href="/programs/sports" className="hover:underline">
    //               Sports
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //       <div>
    //         <h4 className="font-bold mb-4">Support</h4>
    //         <ul className="space-y-2 text-sm">
    //           <li>
    //             <Link href="/support/donate" className="hover:underline">
    //               Donate
    //             </Link>
    //           </li>
    //           <li>
    //             <Link href="/support/sponsor" className="hover:underline">
    //               Sponsor
    //             </Link>
    //           </li>
    //           <li>
    //             <Link href="/support/volunteer" className="hover:underline">
    //               Volunteer
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //       <div>
    //         <h4 className="font-bold mb-4">Admin</h4>
    //         <ul className="space-y-2 text-sm">
    //           <li>
    //             <Link href="/admin" className="hover:underline">
    //               Dashboard
    //             </Link>
    //           </li>
    //           <li>
    //             <Link href="/admin/analytics" className="hover:underline">
    //               Analytics
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="border-t border-primary-foreground/20 pt-8 text-sm text-center opacity-90">
    //       <p>&copy; 2025 TaeTae Foundation. Building Tomorrow's Leaders.</p>
    //     </div>
    //   </div>
    // </footer>
    <footer className="bg-[#2f5129] dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Tae tae Foundation</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              Empowering boys to grow into responsible men through sports, education, skill acquisition, and mentorship.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#76b569] dark:hover:bg-[#8bc97f] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#76b569] dark:hover:bg-[#8bc97f] flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#76b569] dark:hover:bg-[#8bc97f] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#76b569] dark:hover:bg-[#8bc97f] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {/* <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/causes" className="text-white/80 hover:text-white transition-colors">
                  Our Causes
                </Link>
              </li>
              <li>
                <Link href="/volunteers" className="text-white/80 hover:text-white transition-colors">
                  Volunteers
                </Link>
              </li> */}
              <li>
                <Link href="/news" className="text-white/80 hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-bold mb-4">Our Programs</h4>
            <ul className="space-y-2">
              <li className="text-white/80">Sports Development</li>
              <li className="text-white/80">Education & Literacy</li>
              <li className="text-white/80">Skills Acquisition</li>
              <li className="text-white/80">Mentorship Programs</li>
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div>
            <h4 className="text-lg font-bold mb-4">Newsletter</h4>
            <p className="text-white/80 mb-4">Subscribe to get updates on our latest programs and events.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                type="submit"
                className="bg-[#76b569] hover:bg-[#5a8d4f] dark:bg-[#8bc97f] dark:hover:bg-[#76b569] text-white"
              >
                Subscribe
              </Button>
            </form>
          </div> */}
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Tae tae Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
