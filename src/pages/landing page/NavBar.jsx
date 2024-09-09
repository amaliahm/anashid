// const NavBarComponent = () => {

//     return (
//       <>
//         <div className="bg-red-500 p-4 w-fit">
//             <ul>
//                 <li></li>
//                 <li></li>
//                 <li></li>
//             </ul>
//         </div>
//       </>
//     )
//   }
  
//   export default NavBarComponent

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

const NavBarComponent = ({element = 0}) => {
  const [link, setLink] = useState(element)
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navBarStyle = {
    backgroundColor: scrollPosition > 120 ? 'var(--backgroundColor)' : 'transparent',
    transition: 'background-color 0.3s ease-in-out'
  };

  window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.div-to-be-scrolled');
    if (window.scrollY > 120) {
      navbar.classList.remove('scrolled');
    } else {
      navbar.classList.add('scrolled');
    }
  });

  return (
    <div className="fixed w-fit z-20">
        <div className="flex flex-row justify-between px-5" style={navBarStyle}>
            <div className="flex flex-row items-center font-semibold text-lg font-medium gap-8 div-to-be-scrolled scrolled">
                <Link
                    to='home'
                    data-text="Home"
                    spy={true}
                    smooth={true}
                    duration={500}
                    className={`hover:text-[var(--mainColor)] transition-all cursor-pointer no-underline element-link ${link === 0 ? 'text-[var(--mainColor)]' : 'text-[var(--semanticThirdColor)]'}`}
                    onClick={() => setLink(0)}
                >
                    Home
                </Link>
                <Link
                    to='about-us'
                    data-text='AboutUs'
                    spy={true}
                    smooth={true}
                    duration={500}
                    className={`hover:text-[var(--mainColor)] transition-all cursor-pointer no-underline element-link ${link === 1 ? 'text-[var(--mainColor)]' : 'text-[var(--semanticThirdColor)]'}`}
                    onClick={() => setLink(1)}
                >
                    AboutUs
                </Link>
                <Link
                    to='about-us'
                    data-text='AboutUs'
                    spy={true}
                    smooth={true}
                    duration={500}
                    className={`hover:text-[var(--mainColor)] transition-all cursor-pointer no-underline element-link text-[var(--semanticThirdColor)]`}
                    onClick={() => navigate('/auth/signup')}
                >
                    SignUp
                </Link>
                </div>
            </div>
    </div>
  );
};

export default NavBarComponent