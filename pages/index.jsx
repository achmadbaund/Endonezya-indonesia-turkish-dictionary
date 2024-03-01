"use client";

import React from 'react';
import { useRouter } from 'next/router';
import { useState } from "react";
import axios from "axios";
import Container from '../components/Container';
import Link from "next/link";


export default function Home() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [translatedTo, setTranslatedTo] = useState("indonesia-turkish"); // Default value
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(''); 
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  
  function performSearch() {
    // Perform your search logic here
    // For demonstration, let's just display the query in the search results
    return (
      <p className="p-2">Search results for: {query}</p>
    );
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (translatedTo) => {
    setSelectedValue(translatedTo);
    setTranslatedTo(translatedTo);
    setIsOpen(false); 
  };

  function handleInputChange(event) {
    const inputValue = event.target.value;
    setQuery(inputValue);
    setInputValue(inputValue);
    if (inputValue.trim() === '') {
      setShowResults(false);
    } else {
      setShowResults(true);
    }
  }

  // Event handler for keyboard shortcut (Cmd+K)
  function handleKeyDown(event) {
    if (event.metaKey && event.key === 'k') {
      event.preventDefault(); // Prevent browser's default behavior for Cmd+K
      setShowResults(true);
    }
  }

const handleSubmit = (e) => {
  e.preventDefault();
  const encodedValue = encodeURIComponent(inputValue);
  // Redirect to the translator page with the parameter value
  router.push(`/translator/${translatedTo}/${encodedValue}`);
};

  return (
    <Container>
      <div className="text-left max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 dark:text-slate-400">
        <form onSubmit={handleSubmit}>
          <header className="text-md text-left dark:text-slate-400">
            <div className="max-w-2xl hide-below-640 ">
              {/* <h2 className="text-base font-semibold leading-7 text-blue-500 dark:text-white">An Indonesian - Turkish Dictionary</h2> */}
              <p className="text-4xl font-md tracking-tight text-slate-900 dark:text-white">Endonezyaevi.</p>
            </div>
            <div className="flex" role="tablist" aria-orientation="horizontal">
            <div 
                className="ml-4 mr-3 sm:ml-0 w-1/6 sm:w-1/12 relative -mt-px border-b-4 pb-2 pt-4 text-left md:pb-4 md:pt-8 border-transparent hover:border-slate-400"
              >
                <h3>
                  <Link 
                    className="whitespace-nowrap text-sm font-semibold leading-7 sm:text-base focus:outline-none text-slate-500"
                    href={`/translator/turkish-indonesia/`}
                  >
                    <button
                      id="headlessui-tabs-tab-2"
                      role="tab"
                      type="button"
                      aria-selected="false"
                      tabIndex="-1"
                      data-headlessui-state=""
                      aria-controls="headlessui-tabs-panel-5"
                    >
                      <span className="absolute inset-0 -top-px"></span>
                      <p className="text-xs dark:text-white text-black">TURKISH</p>
                    </button>
                  </Link>
                </h3>
              </div>
              <div 
                className="w-1/6 sm:w-1/12 relative -mt-px border-b-4 pb-2 pt-4 text-left md:pb-4 md:pt-8 border-blue-500"
              >
                <h3>
                  <Link 
                    className="whitespace-nowrap text-sm font-semibold leading-7 sm:text-base focus:outline-none text-slate-500"
                    href={`/translator/indonesia-turkish/`}
                  >
                    <button
                      id="headlessui-tabs-tab-1"
                      role="tab"
                      type="button"
                      aria-selected="true"
                      tabIndex="0"
                      data-headlessui-state="selected"
                      aria-controls="headlessui-tabs-panel-4"
                    >
                      <span className="absolute inset-0 -top-px"></span>
                       <p className="text-xs dark:text-white text-black">INDONESIAN</p>
                    </button>
                  </Link>
                </h3>
              </div>
            </div>
            <div className="relative flex mx-0 sm:mx-0">
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
                className="ml-4 sm:ml-0 border-none bg-light-sky h-16 sm:h-20 py-2 pl-9 sm:pl-14 rounded-md rounded-r-none w-8/12 sm:w-full text-left leading-6 placeholder-slate-400 text-slate-500 text-lg sm:text-2xl focus:outline-none focus:ring-2 focus:ring-slate-sky focus:ring-offset-2"
                type="text"
                placeholder="Turkish or Indonesian"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
                
              <div className="flex items-center">
                <div className="relative">
                  <button
                    type="button"
                    className="border-none bg-light-sky w-20 sm:w-24 h-16 sm:h-20 rounded-md rounded-l-none text-left inline-flex justify-center bg-white py-2 pl-0 text-gray-900 text-md sm:text-2xl focus:outline-none focus:ring-2 focus:ring-slate-sky focus:ring-offset-2"
                    id="menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                  >
                      <span
                        className="text-slate-400 mt-3 sm:mt-4"
                      >
                        {selectedValue === 'turkish-indonesia' ? 'TR-ID' : 'ID-TR'}
                      </span>
                      <svg className="-mr-1 sm:mr-0 mt-3 sm:mt-5 h-6 w-6 sm:h-7 sm:w-7 text-slate-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M6 9L12 15L18 9" stroke="rgb(148 163 184)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                      </svg>
                  </button>
                  {isOpen && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                    >
                      <div className="py-1" role="none">
                        <button
                          onClick={() => handleOptionClick('turkish-indonesia')}
                          className="text-gray-700 block w-full text-left px-4 py-2 text-md"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                        >
                          Turkish-Indonesian
                        </button>
                        
                        <button
                          onClick={() => handleOptionClick('indonesia-turkish')}
                          className="text-gray-700 block w-full text-left px-4 py-2 text-md"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-1"
                        >
                          Indonesian-Turkish
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* <button
                  className="rounded-md h-16 sm:h-20 ml-3 sm:ml-0 sm:px-3 w-3/12 text-white font-bold flex items-center justify-center sm:w-auto"
                  type="submit"
                >
                  <svg className="w-7 h-7 sm:w-11 sm:h-11" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" 
                        stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </g>
                  </svg>
                </button> */}
              </div>
              {showResults && (
              <ul className="border w-8/12 border-gray-200 bg-white text-gray-100 dark:border-neutral-800 dark:bg-neutral-900 absolute top-full z-20 mt-2 overflow-auto overscroll-contain rounded-xl py-2.5 shadow-xl md:left-auto md:right-auto contrast-more:border contrast-more:border-gray-900 contrast-more:dark:border-gray-50"
              >
                <div className="mx-2.5 mb-2 mt-6 select-none border-b border-black/10 px-2.5 pb-1.5 text-xs font-semibold uppercase text-gray-500 first:mt-0 dark:border-white/20 dark:text-gray-300 contrast-more:border-gray-600 contrast-more:text-gray-900 contrast-more:dark:border-gray-50 contrast-more:dark:text-gray-50"
                  >
                  {performSearch()}
                </div>
                <li className="mx-2.5 break-words rounded-md contrast-more:border bg-primary-500/10 text-primary-600 contrast-more:border-primary-500"
                >
                  <a className="block scroll-m-12 px-2.5 py-2" data-index="0" href="/docs/quick-start#ayro-ui-quick-start-guide">
                    <div className="mt-1 text-sm leading-[1.35rem] text-gray-600 dark:text-gray-400 contrast-more:dark:text-gray-50">
                      To start using the <span className="text-primary-600">Ay</span>ro UI components first you’ll have to include some CSS files in the Head tag.There are two ways you can include the CSS files in your project. You can load the files from the assets folder or you can use the CDN.
                    </div>
                  </a>
                </li>
              </ul>
            )}
            </div>
            
          </header>
        </form>
      </div>
    </Container>
    
  );
}
