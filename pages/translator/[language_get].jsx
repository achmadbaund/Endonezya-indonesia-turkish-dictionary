"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/router';
import Container from '../../components/container';
import Link from "next/link";

export default function TranslatorPage() {
  const [language, setTranslatedTo] = useState("id|tr"); // Default value
  const [showResults, setShowResults] = useState(false);
  const [query, setQuery] = useState('');
  const [translationResults, setTranslationResults] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(''); 
  const router = useRouter();
  const { language_get } = router.query;
  const [value, setToTranslate] = useState('');
  
  function performSearch() {
    // Perform your search logic here
    // For demonstration, let's just display the query in the search results
    return (
      <p className="p-2 text-slate-900">{query}</p>
    );
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (language) => {
    setSelectedValue(language)
    setTranslatedTo(language);
    setIsOpen(false); 
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
      q: value,
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
      // const response = await axios.request(options);
      const encodedValue = encodeURIComponent(value);
      router.push(`/translator/${language_get}/${encodedValue}`);
      // setTranslationResults(response.data.matches);
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
          <header className="ext-md text-left dark:text-slate-400">
            
            <div className="flex" role="tablist" aria-orientation="horizontal">
              <div 
                className={`ml-4 mr-3 sm:ml-0 w-1/6 sm:w-1/12 relative -mt-px border-b-4 pb-2 pt-4 text-left md:pb-4 md:pt-8 ${language_get === 'turkish-indonesia' ? 'border-blue-500' : 'border-transparent hover:border-slate-400'}`}
              >
                <h3>
                  <Link 
                    className="whitespace-nowrap text-sm font-semibold leading-7 sm:text-base focus:outline-none text-slate-500"
                    href={`/translator/turkish-indonesia/${value ? value : ''}`}
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
                        <p className="text-xs dark:text-white text-slate-900">
                          <br/><br/>
                          TURKISH
                        </p>
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
                    href={`/translator/indonesia-turkish/${value ? value : ''}`}
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
                        <p className="text-xs dark:text-white text-slate-900">
                          <br/><br/>
                          INDONESIAN
                        </p>
                    </button>
                  </Link>
                </h3>
              </div>
            </div>
            <div className="relative flex sm:mx-0 mx-0 mt-2">

              <svg className="h-7 absolute left-4.1 top-1.8 sm:top-6 text-slate-400 font-bold pointer-events-none" viewBox="0 0 24 24" fill="#2f7cff">
                <path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
              </svg>

              <input
                className="ml-4 sm:ml-0 border-none bg-light-sky h-16 sm:h-20 py-2 pl-9 sm:pl-14 rounded-md rounded-r-none w-8/12 sm:w-full text-left leading-6 placeholder-slate-400 text-slate-900 text-lg sm:text-2xl focus:outline-none focus:ring-2 focus:ring-slate-sky focus:ring-offset-2"
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
                      className="border-none bg-light-sky w-20 sm:w-24 h-16 sm:h-20 rounded-md rounded-l-none text-left inline-flex justify-center bg-white py-2 pl-0 text-gray-900 text-md sm:text-2xl focus:outline-none focus:ring-2 focus:ring-slate-sky focus:ring-offset-2"
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
                          href={`/translator/turkish-indonesia/${value ? value : ''}`}
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
                          href={`/translator/indonesia-turkish/${value ? value : ''}`}
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
              <div className="max-w-screen-xl mx-auto px-4 sm:px-0">
                <Link href={`/translator/${language_get}/${value ? value : ''}`} className="block">
                  <div className="mt-2 pl-9 sm:pl-9 overflow-hidden rounded-md bg-white py-2 shadow-xl ring-1 ring-slate-700/10 relative">
                    <svg className="mt-2 h-6 w-6 absolute left-4.1 sm:left-2 text-slate-400 font-bold pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.516 6.984v5.25l4.5 2.672-0.75 1.266-5.25-3.188v-6h1.5zM12 20.016q3.281 0 5.648-2.367t2.367-5.648-2.367-5.648-5.648-2.367-5.648 2.367-2.367 5.648 2.367 5.648 5.648 2.367zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93z"></path>
                    </svg>
                    {performSearch()}
                  </div>
                </Link>
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
                    Meanings of {`"${value ? value : ''}"`} in Translation : {translationResults.length} result(s)
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
