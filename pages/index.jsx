"use client";

import React from 'react';
import { useRouter } from 'next/router';
import { useState } from "react";
import axios from "axios";
import Container from '../components/container';
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
      query // result
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
        <form 
          onSubmit={handleSubmit}
          className="group relative"
        >
          <header className="text-md text-left dark:text-slate-400">
            <div className="flex flex-col">
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">Endonezyaevi.</h1>
              <nav aria-label="Breadcrumbs" className="hide-below-640 order-first flex space-x-2 text-sm font-semibold">
                  <Link className="text-slate-500  hover:text-slate-600" href={`/translator/${translatedTo}`}>{translatedTo}</Link>
                  <div aria-hidden="true" className="select-none text-slate-400">/</div>
                  {/* <Link className="text-slate-500 hover:text-slate-600" href={`/translator/${translatedTo}/${encodedValue}`}>{encodedValue}</Link> */}
              </nav>
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
                      <p className="text-xs dark:text-white text-slate-900">
                        {/* <svg className='h-6 w-6 sm:h-7 sm:w-7' version="1.1" id="Layer_1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill="#ED1F34" d="M8.258,126.624v258.753c0,19.763,16.022,35.785,35.785,35.785h423.914c19.763,0,35.785-16.022,35.785-35.785V126.624c0-19.763-16.022-35.785-35.785-35.785H44.043C24.28,90.839,8.258,106.86,8.258,126.624z"></path>
                                <g>
                                  <path fill="#FFFFFF" d="M210.305,337.677c-45.109,0-81.677-36.568-81.677-81.677s36.568-81.677,81.677-81.677c22.245,0,42.402,8.906,57.133,23.33c-19.526-31.397-54.323-52.311-94.019-52.311c-61.115,0-110.658,49.543-110.658,110.658s49.543,110.658,110.658,110.658c39.696,0,74.492-20.915,94.019-52.312C252.708,328.771,232.55,337.677,210.305,337.677z"></path>
                                  <polygon fill="#FFFFFF" points="277.628,256 309.847,243.659 311.627,209.204 333.32,236.033 366.638,227.079 347.826,256 366.638,284.921 333.32,275.967 311.627,302.796 309.847,268.341 "></polygon>
                                </g>
                                <g>
                                  <path fill="#121B21" d="M373.32,222.225c-2.012-2.768-5.522-4.01-8.824-3.122l-28.132,7.56l-18.315-22.651c-2.15-2.66-5.718-3.719-8.974-2.661c-3.254,1.057-5.519,4.011-5.695,7.428l-1.503,29.092l-27.202,10.418c-3.194,1.223-5.304,4.291-5.304,7.712s2.11,6.489,5.304,7.712l27.202,10.418l1.503,29.091c0.177,3.416,2.442,6.371,5.695,7.428c0.839,0.273,1.699,0.405,2.551,0.405c2.45,0,4.826-1.092,6.423-3.066l18.315-22.651l28.132,7.56c3.301,0.887,6.813-0.353,8.824-3.122c2.011-2.768,2.106-6.489,0.241-9.357L357.678,256l15.883-24.419C375.426,228.713,375.33,224.993,373.32,222.225z M340.904,260.502l7.057,10.848l-12.498-3.358c-3.152-0.846-6.511,0.243-8.564,2.782l-8.137,10.063l-0.667-12.923c-0.168-3.261-2.243-6.118-5.293-7.286l-12.084-4.629l12.084-4.629c3.05-1.168,5.124-4.024,5.293-7.286l0.667-12.923l8.137,10.063c2.053,2.539,5.415,3.627,8.564,2.782l12.498-3.358l-7.057,10.848C339.124,254.235,339.124,257.765,340.904,260.502z"></path>
                                  <path fill="#121B21" d="M272.605,307.905c-3.261-2.615-7.961-2.384-10.946,0.542c-13.81,13.525-32.048,20.972-51.354,20.972c-34.701,0-64.946-24.63-71.915-58.564c-0.917-4.467-5.281-7.343-9.75-6.428c-4.468,0.917-7.345,5.283-6.428,9.75c8.539,41.579,45.588,71.757,88.094,71.757c4.804,0,9.554-0.377,14.216-1.115c-15.252,8.787-32.767,13.581-51.102,13.581c-56.463,0-102.4-45.937-102.4-102.4s45.937-102.4,102.4-102.4c18.335,0,35.851,4.795,51.102,13.581c-4.662-0.739-9.412-1.115-14.216-1.115c-42.506,0-79.555,30.178-88.094,71.757c-0.918,4.468,1.96,8.833,6.428,9.75c4.463,0.916,8.833-1.96,9.75-6.428c6.969-33.934,37.213-58.564,71.915-58.564c19.306,0,37.544,7.448,51.354,20.972c2.986,2.923,7.685,3.156,10.946,0.542c3.259-2.615,4.052-7.254,1.844-10.803c-21.888-35.195-59.657-56.207-101.03-56.207c-65.57,0-118.916,53.346-118.916,118.916s53.346,118.916,118.916,118.916c41.373,0,79.141-21.013,101.03-56.209C276.657,315.159,275.866,310.52,272.605,307.905z"></path>
                                  <path fill="#121B21" d="M468.324,82.581H43.676C19.593,82.581,0,102.173,0,126.256v259.487c0,24.084,19.593,43.676,43.676,43.676h424.648c24.083,0,43.675-19.593,43.675-43.676V126.256C512,102.173,492.407,82.581,468.324,82.581z M495.484,385.743c0,14.977-12.183,27.16-27.16,27.16H43.676c-14.977,0-27.16-12.183-27.16-27.16V126.256c0-14.976,12.183-27.159,27.16-27.159h424.648c14.976,0,27.159,12.183,27.159,27.159V385.743z"></path>
                                </g>
                            </g>
                        </svg>   */}
                        <br/><br/>
                        TURKISH
                      </p>
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
                      <p className="text-xs dark:text-white text-slate-900">
                        {/* <svg className='h-6 w-6 sm:h-7 sm:w-7' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000">
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                              <path style={{ fill: '#B21727' }} d="M468.324,90.839H43.676c-19.562,0-35.418,15.857-35.418,35.418V256h495.484V126.257C503.742,106.695,487.884,90.839,468.324,90.839z"></path>
                              <path style={{ fill: '#FFFFFF' }} d="M8.258,385.743c0,19.562,15.857,35.418,35.418,35.418h424.648c19.561,0,35.418-15.857,35.418-35.418V256H8.258V385.743z"></path>
                              <path style={{ fill: '#121B21' }} d="M468.324,82.581H43.675C19.593,82.581,0,102.174,0,126.257v259.486c0,24.083,19.593,43.676,43.675,43.676h424.648c24.084,0,43.676-19.594,43.676-43.676V126.257C512,102.174,492.407,82.581,468.324,82.581z M495.484,247.742H74.323c-4.561,0-8.258,3.696-8.258,8.258c0,4.562,3.697,8.258,8.258,8.258h421.161v121.485c0,14.977-12.183,27.16-27.16,27.16H43.675c-14.976,0-27.159-12.183-27.159-27.16V264.258H41.29c4.561,0,8.258-3.696,8.258-8.258c0-4.562-3.697-8.258-8.258-8.258H16.516V126.257c0-14.977,12.183-27.16,27.159-27.16h424.648c14.977,0,27.16,12.183,27.16,27.16V247.742z"></path>
                          </g>
                        </svg> */}
                        <br/><br/>
                        INDONESIAN
                      </p>
                    </button>
                  </Link>
                </h3>
              </div>
            </div>
            <div className="relative flex mx-0 sm:mx-0 mt-2">
              <svg className="h-7 absolute left-4.1 top-1.8 sm:top-6 text-slate-400 font-bold pointer-events-none" viewBox="0 0 24 24" fill="#2f7cff">
                <path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
              </svg>
              <input 
                className="ml-4 sm:ml-0 border-none bg-light-sky h-16 sm:h-20 py-2 pl-11 sm:pl-16 rounded-md rounded-r-none w-8/12 sm:w-full text-left leading-6 placeholder-slate-400 text-slate-900 text-lg sm:text-2xl focus:outline-none focus:ring-2 focus:ring-slate-sky focus:ring-offset-2"
                type="text"
                placeholder="Translate...."
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
            </div>
            {showResults && (
            <div className="max-w-screen-xl mx-auto px-4 sm:px-0 mt-2">
              <ul role="list" className="bg-white p-2 shadow rounded-md">
                <li className="group/item relative flex items-center justify-between rounded-md p-2 hover:bg-slate-100">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                    <svg className="h-6 w-6 absolute left-1 top-2.2 sm:left-2 text-slate-400 font-bold pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.516 6.984v5.25l4.5 2.672-0.75 1.266-5.25-3.188v-6h1.5zM12 20.016q3.281 0 5.648-2.367t2.367-5.648-2.367-5.648-5.648-2.367-5.648 2.367-2.367 5.648 2.367 5.648 5.648 2.367zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93z"></path>
                    </svg>
                    </div>
                    <div className="pl-3 sm:pl-5 w-full text-sm leading-6">
                      <Link 
                        href={`/translator/${translatedTo}/${performSearch()}`}
                        className="font-normal text-lg text-slate-900"
                      >
                        <span className="absolute inset-0 rounded-xl" aria-hidden="true"></span>
                        {performSearch()}
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            )}
          </header>
        </form>
      </div>
    </Container>
    
  );
}
