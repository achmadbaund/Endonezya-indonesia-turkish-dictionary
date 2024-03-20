"use client";

import axios from "axios";
import { useEffect } from 'react';
import { useState } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import fetchSuggestions from '../../../components/searchUtils';
import Container from "../../../components/container";

export default function TranslatorPage() {
  const [suggestions, setSuggestions] = useState([]);
  const [translationResults, setTranslationResults] = useState(null);
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

  const handleInputChange = async (event) => {
    const inputValue = event.target.value;
    setToTranslate(inputValue);
    if (inputValue.trim() !== '') {
      const suggestions = await fetchSuggestions(language_get, inputValue);
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setToTranslate(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };

  const request = {
    method: "GET",
    url: "http://localhost:5000/translation/get",
    params: {
      langpair: `${language_get === 'turkish-indonesia' ? 'tr|id' : 'id|tr'}`,
      q: `${value ? value : value_get}`,
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
      const response = await axios.request(request);
      const encodedValue = encodeURIComponent(value);
      router.push(`/translator/${language_get}/${encodedValue ? encodedValue : ''}`);
      setTranslationResults(response.data.matches);
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <Container>
      <div className="lg:flex w-full bg-gray-100 dark:bg-gray-700-dark text-base md:text-lg py-2 sm:py-0 flex-col sm:flex-row z-[100]">
        <div className="flex hide-above-640 flex-wrap gap-6 pl-[4.5rem] sm:pl-[6rem] pt-2">
          <Link 
            href={`/translator/turkish-indonesia/${value ? value : value_get}`}
          >
            <button className={`inline-flex ml-1 items-center text-base font-medium ms-0 sm:ms-1 text-slate-500 border-b-4 ${language_get === 'turkish-indonesia' ? 'border-slate-900' : 'border-transparent hover:border-slate-400'}`}>
              <svg className='h-[1.3rem] w-[1.4rem]' version="1.1" id="Layer_1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
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
              </svg>
              <span className="ml-2">Turkish</span>
            </button>
          </Link>
          <Link 
            href={`/translator/indonesia-turkish/${value ? value : value_get}`}
          >
            <button className={`inline-flex ml-1 items-center text-base font-medium ms-0 sm:ms-1 text-slate-500 border-b-4 ${language_get === 'indonesia-turkish' ? 'border-slate-900' : 'border-transparent hover:border-slate-400'}`}>
              <svg className='h-[1.3rem] w-[1.4rem]' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path fill='#B21727' d="M468.324,90.839H43.676c-19.562,0-35.418,15.857-35.418,35.418V256h495.484V126.257C503.742,106.695,487.884,90.839,468.324,90.839z"></path>
                  <path fill='#FFFFFF' d="M8.258,385.743c0,19.562,15.857,35.418,35.418,35.418h424.648c19.561,0,35.418-15.857,35.418-35.418V256H8.258V385.743z"></path>
                  <path fill='#121B21' d="M468.324,82.581H43.675C19.593,82.581,0,102.174,0,126.257v259.486c0,24.083,19.593,43.676,43.675,43.676h424.648c24.084,0,43.676-19.594,43.676-43.676V126.257C512,102.174,492.407,82.581,468.324,82.581z M495.484,247.742H74.323c-4.561,0-8.258,3.696-8.258,8.258c0,4.562,3.697,8.258,8.258,8.258h421.161v121.485c0,14.977-12.183,27.16-27.16,27.16H43.675c-14.976,0-27.159-12.183-27.159-27.16V264.258H41.29c4.561,0,8.258-3.696,8.258-8.258c0-4.562-3.697-8.258-8.258-8.258H16.516V126.257c0-14.977,12.183-27.16,27.159-27.16h424.648c14.977,0,27.16,12.183,27.16,27.16V247.742z"></path>
                </g>
              </svg>
              <span className="ml-2">Indonesia</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="z-50 sticky top-0">
        <form
          onSubmit={handleSubmit}
          className="group"
        >
          <nav className={`duration-300 backdrop-filter ${scrolling ? 'shadow-md' : ''} backdrop-blur-lg backdrop-saturate-200 transition-shadow bg-opacity-90 items-center w-full flex justify-between bg-wash dark:bg-wash-dark dark:bg-opacity-95 px-1.5 lg:pe-5 lg:ps-4 z-50`}>
            <div className={`flex items-center justify-between w-full sm:w-[69.3%] py-[0.5rem] px-[0.5rem] gap-0 sm:gap-3`}>
              <div className="flex flex-row 3xl:flex-1 hide-below-640">
                <div className="flex 3xl:flex-1 align-center">
                  <Link 
                    className="active:scale-95 overflow-hidden transition-transform relative items-center text-primary dark:text-primary-dark p-1 whitespace-nowrap outline-link rounded-full 3xl:rounded-xl inline-flex text-lg font-normal gap-2" 
                    href="/"
                  >
                    <svg width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-sm me-0 w-10 h-10 text-link dark:text-link-dark flex origin-center transition-all ease-in-out">
                      <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
                      <g stroke="currentColor" strokeWidth="1" fill="none">
                        <ellipse rx="10" ry="4.5"></ellipse>
                        <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                        <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                      </g>
                    </svg>
                    <span 
                      className="sr-only 3xl:not-sr-only"
                    >
                      React
                    </span>
                  </Link>
                </div>
              </div>
              
              <div className="flex-col flex mt-0 sm:flex-row w-full md:flex 3xl:w-auto 3xl:shrink-0 3xl:justify-center">
                <svg className={`h-[1.2rem] hide-below-640 absolute top-[1.2rem] left-[1.8rem] sm:left-[5.5rem] lg:left-[6.2rem] sm:top-[1.5rem] text-gray-30 font-bold pointer-events-none`} viewBox="0 0 24 24" fill="#000">
                  <path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
                </svg>
                <input
                  className={`flex 3xl:w-[56rem] 3xl:mx-0 relative pl-[2.8rem] sm:pl-[2.9rem] ps-4 pe-1 py-1 h-10 bg-gray-30/20 dark:bg-gray-40/20 outline-none focus:outline-link betterhover:hover:bg-opacity-80 pointer items-center text-start w-full text-gray-30 rounded-full align-middle text-md`}
                  type="text"
                  autoFocus
                  value={value}
                  onChange={handleInputChange}
                  aria-label="Turkish or Indonesia"
                  placeholder={language_get}
                />
                
                <button
                  className={`sm:ml-3 mt-2 hide-above-640 sm:mt-0 h-[2.5rem] inline-flex justify-center items-center rounded-full text-base py-3 px-5 bg-selected dark:bg-selected-dark text-white dark:text-white`}
                  type="submit"
                >
                  Translate 
                </button>
                <div className="text-base hide-below-640 justify-center items-center gap-1.5 flex 3xl:flex-1 flex-row 3xl:justify-end">
                  <div className="mx-2.5 gap-1.5 lg:flex">
                    <div className="flex flex-auto sm:flex-1">
                      <Link 
                        className={`active:scale-95 transition-transform w-full text-center outline-link py-1.5 px-1.5 xs:px-3 sm:px-4 capitalize border-b-4 ${language_get === 'turkish-indonesia' ? 'border-selected' : 'border-transparent hover:border-slate-400'}`} 
                        href={`/translator/turkish-indonesia/${value ? value : value_get}`}
                      >
                        Turkish
                      </Link>
                    </div>
                    <div className="flex flex-auto sm:flex-1">
                      <Link
                       className={`active:scale-95 transition-transform w-full text-center outline-link py-1.5 px-1.5 xs:px-3 sm:px-4 capitalize border-b-4 ${language_get === 'indonesia-turkish' ? 'border-selected' : 'border-transparent hover:border-slate-400'}`}
                       href={`/translator/indonesia-turkish/${value ? value : value_get}`}
                      >
                        Indonesia
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </nav>
        </form>
        {suggestions && suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
      </div>
      <div className="mx-auto flex flex-col w-full bg-gradient-right dark:bg-gradient-right-dark" style={{contain: 'content'}}>
        <div className="flex-col gap-2 flex grow w-full my-20 lg:my-32 mx-auto items-center">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-5">
            <div className="max-w-3xl lg:max-w-7xl gap-5 flex flex-col lg:flex-row lg:px-5">
              <div className="w-full lg:w-8/12 max-w-3xl flex flex-col items-start justify-start lg:ps-5 lg:pe-10">
                {translationResults && translationResults.length > 0 && (
                  <div className="flex items-center sm:justify-center sm:ml-0 w-full max-w-3xl">
                    <table className="table-auto w-full whitespace-nowrap font-display text-lg lg:text-lg text-secondary dark:text-secondary-dark text-left border-separate border-spacing-y-2">
                      <caption className="caption-top mb-3 text-left">
                        Meanings of {`"${value ? value : ''}"`} in : {translationResults.length} result(s)
                      </caption>
                      <thead>
                        <tr className="bg-black text-white hide-below-640">
                          <th className="px-4 py-2">Meaning of</th>
                          <th className="px-4 py-2">Translation</th>
                        </tr>
                      </thead>
                      <tbody>
                      {translationResults.map((result, index) => (
                        <tr className={`tr-class`} key={index}>
                          <td className="td-class">{result.segment}</td>
                          <td className="td-class">{result.translation}</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="w-full lg:w-3/12">
                <div className="flex-col sm:flex-row flex-wrap flex gap-5 text-start my-5">
                  <div className="flex-1 min-w-[40%] text-start">
                    <p>
                      <a href="https://auth.upsun.com/register?utm_source=devto&amp;utm_medium=paid_social&amp;utm_campaign=conversion_upsun_debug_faster">
                        <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--UYzqGtaH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_100%2Cw_350/https://pro.forem.tools/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcEFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--753cca82aef31525b935f311d219aefb5538d5d7/debug-much-faster-1200-1200.png" alt="Billboard image" width="1200" height="1200" loading="lazy" />
                      </a>
                    </p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Container>
  );
}
