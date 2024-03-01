"use client";

import axios from "axios";
import { useEffect } from 'react';
import { useState } from "react";
import { useRouter } from 'next/router';
import Container from '../../../components/Container';
import Link from "next/link";

export default function TranslatorPage() {
  const [language, setTranslatedTo] = useState("id|tr"); // Default value
  const [showResults, setShowResults] = useState(false);
  const [query, setQuery] = useState('');
  const [translationResults, setTranslationResults] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(''); 
  const router = useRouter();
  const { language_get, value_get } = router.query;
  const [value, setToTranslate] = useState(value_get);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
      const handleScroll = () => {
          if (window.scrollY > 0) {
              setScrolling(true);
          } else {
              setScrolling(false);
          }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  function performSearch() {
    return (
      <p className="p-2">{query}</p>
    );
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    setToTranslate(inputValue);
    if (inputValue.trim() === '') {
      setShowResults(false);
    } else {
      setShowResults(true);
    }
  };

  const options = {
    method: "GET",
    url: "https://api.mymemory.translated.net/get",
    params: {
      langpair: `${language_get === 'turkish-indonesia' ? 'tr|id' : 'id|tr'}`,
      q: `${value ? value : value_get}`,
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_TRANSLATOR_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_TRANSLATOR_HOST_KEY
    },
  };

  // // Send the request
  // axios.request(options)
  // .then(response => {
  //   setTranslationResults(response.data.matches);
  //   console.log(response.data);
  // })
  // .catch(error => {
  //   // Handle errors here
  //   console.error(error);
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.request(options);
      const encodedValue = encodeURIComponent(value);
      router.push(`/translator/${language_get}/${encodedValue ? encodedValue : ''}`);
      setTranslationResults(response.data.matches);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <Container>
      <div className="text-left max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 dark:text-slate-400">
        <form 
          onSubmit={handleSubmit}
          className="group relative"
        >
          <header className="text-md text-left dark:text-slate-400">
            <div className="flex" role="tablist" aria-orientation="horizontal">
              <div 
                className={`ml-4 mr-3 sm:ml-0 w-1/6 sm:w-1/12 relative -mt-px border-b-4 pb-2 pt-4 text-left md:pb-4 md:pt-8 ${language_get === 'turkish-indonesia' ? 'border-blue-500' : 'border-transparent hover:border-slate-400'}`}
              >
                <h3>
                  <Link 
                    className="whitespace-nowrap text-sm font-semibold leading-7 sm:text-base focus:outline-none text-slate-500"
                    href={`/translator/turkish-indonesia/${value ? value : value_get}`}
                  >
                    <button
                      id="headlessui-tabs-tab-2"
                      role="tab"
                      type="button"
                      aria-selected="false"
                      tabIndex="-1"
                      data-headlessui-state={language_get === 'turkish-indonesia' ? 'selected' : ''}
                      aria-controls="headlessui-tabs-panel-5"
                    >
                      <span className="absolute inset-0 -top-px"></span>
                        <p className="text-xs dark:text-white text-black">TURKISH</p>
                    </button>
                  </Link>
                </h3>
              </div>
              <div 
                className={`w-1/6 sm:w-1/12 relative -mt-px border-b-4 pb-2 pt-4 text-left md:pb-4 md:pt-8 ${language_get === 'indonesia-turkish' ? 'border-blue-500' : 'border-transparent hover:border-slate-400'}`}
              >
                <h3>
                  <Link 
                    className="whitespace-nowrap text-sm font-semibold leading-7 sm:text-base focus:outline-none text-slate-500"
                    href={`/translator/indonesia-turkish/${value ? value : value_get}`}
                  >
                    <button
                      id="headlessui-tabs-tab-1"
                      role="tab"
                      type="button"
                      aria-selected="true"
                      tabIndex="0"
                      data-headlessui-state={language_get === 'indonesia-turkish' ? 'selected' : ''}
                      aria-controls="headlessui-tabs-panel-4"
                    >
                      <span className="absolute inset-0 text-md -top-px"></span>
                        <p className="text-xs dark:text-white text-black">INDONESIAN</p>
                    </button>
                  </Link>
                </h3>
              </div>
              
            </div>
            <div className="relative flex sm:mx-0 mx-0">
              <svg className=" h-7 sm:h-11 absolute left-2.1 sm:left-2 top-1.8 text-slate-400 font-bold pointer-events-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g clipPath="url(#clip0_15_152)">
                      <rect width="24" height="24" fill="none"></rect>
                      <circle cx="10.5" cy="10.5" r="6.5" stroke="#2f7cff" strokeLinejoin="round"></circle>
                      <path d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" 
                      fill="#2f7cff"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_15_152">
                          <rect width="24" height="24" fill="none"></rect>
                      </clipPath>
                    </defs>
                </g>
              </svg>
              <input
                className={`ml-4 sm:ml-0 border-none bg-light-sky py-2 pl-9 sm:pl-14 rounded-md rounded-r-none w-8/12 sm:w-full text-left leading-6 placeholder-slate-400 text-slate-500 text-lg sm:text-2xl focus:outline-none focus:ring-2 focus:ring-slate-sky focus:ring-offset-2`}
                type="text"
                autoFocus
                value={value}
                onChange={handleInputChange}
                aria-label="Turkish or Indonesia"
                placeholder={language_get}
              />
              <div className="flex items-center">
                <div className="relative">
                  <div>
                    <button
                      type="button"
                      className={`border-none bg-light-sky w-20 sm:w-24 rounded-md rounded-l-none text-left inline-flex justify-center bg-white py-2 pl-0 text-gray-900 text-md sm:text-2xl focus:outline-none focus:ring-2 focus:ring-slate-sky focus:ring-offset-2`}
                      id="menu-button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={toggleDropdown}
                    >
                      <span
                        className="text-slate-400 mt-3 sm:mt-4"
                      >
                        {language_get === 'turkish-indonesia' ? 'TR-ID' : 'ID-TR'}
                      </span>
                      <svg className="-mr-1 sm:mr-0 mt-3 sm:mt-5 h-6 w-6 sm:h-7 sm:w-7 text-slate-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M6 9L12 15L18 9" stroke="rgb(148 163 184)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                  {isOpen && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                    >
                      <div className="py-1" role="none">
                        <Link 
                          className="text-gray-700 block w-full text-left px-4 py-2 text-md"
                          href={`/translator/turkish-indonesia/${value ? value : value_get}`}
                        >
                          <button
                            // onClick={() => handleOptionClick('tr|id')}
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                          >
                            Turkish-Indonesian
                          </button>
                        </Link>
                        
                        <Link 
                          className="text-gray-700 block w-full text-left px-4 py-2 text-md"
                          href={`/translator/indonesia-turkish/${value ? value : value_get}`}
                        >
                          <button
                            // onClick={() => handleOptionClick('id|tr')}
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-1"
                          >
                            Indonesian-Turkish
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {showResults && (
              
              <div className="mt-4 overflow-hidden rounded-md bg-white py-1 shadow-xl ring-1 ring-slate-700/10">
                  <div className="px-3 py-2">
                    {performSearch()}</div>
              </div>
            )}
          </header>
        </form>
      </div>
      <div className="max-w-3xl mx-auto ">
        {translationResults && translationResults.length > 0 && (
          <div 
            className="space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6"
          >
            <div className="grid grid-cols-6 mt-5">
              <div className="col-start-1 col-span-7 mt-2 mx-2 sm:mx-3">
                <table 
                  style={{background: '#212121'}}
                  className="table-auto w-full whitespace-nowrap dark:text-slate-900 text-slate-900 text-left"
                >
                  <caption className="caption-top mb-3 text-left text-md">
                    Meanings of {`"${value ? value : value_get}"`} in Translation : {translationResults.length} result(s)
                  </caption>
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="px-4 py-2 text-md hidden sm:table-cell md:table-cell lg:table-cell xl:table-cell">Category</th>
                      <th className="px-4 py-2 text-md">Meaning of</th>
                      <th className="px-4 py-2 text-md">Translation</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {translationResults.map((result, index) => (
                      <tr className={index % 2 === 0 ? 'bg-gray-100 hover:bg-gray-100' : 'bg-white hover:bg-gray-100'} key={index}>
                        <td className="px-4 py-2 text-md hidden sm:table-cell md:table-cell lg:table-cell xl:table-cell">Common Usage</td>
                        <td className="px-4 py-2 text-md">{result.segment}</td>
                        <td className="px-4 py-2 text-md">{result.translation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          )}
      </div>
    </Container>
  );
}
