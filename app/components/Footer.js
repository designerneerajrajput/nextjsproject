'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h4 className="fw-bold mb-3">HUMAAN</h4>
            <p className="text-muted">
              Creating digital experiences that drive results and make an impact.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="#work" className="text-muted text-decoration-none">Work</Link>
              </li>
              <li className="mb-2">
                <Link href="#services" className="text-muted text-decoration-none">Services</Link>
              </li>
              <li className="mb-2">
                <Link href="#about" className="text-muted text-decoration-none">About</Link>
              </li>
              <li className="mb-2">
                <Link href="#contact" className="text-muted text-decoration-none">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-3">Connect</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">LinkedIn</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Twitter</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Instagram</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Dribbble</a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-5" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted mb-0">
              © 2024 Humaan Clone. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-muted mb-0">
              Made with ❤️ using Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}