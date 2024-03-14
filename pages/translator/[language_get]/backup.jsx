"use client";

import axios from "axios";
import { useEffect } from 'react';
import { useState } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import fetchSuggestions from '../../../components/searchUtils';

export default function TranslatorPage() {
  const [suggestions, setSuggestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
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
  function performSearch() {
    return (
      value // search value / hasil.
    );
  }

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
    url: "https://api.mymemory.translated.net/get",
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
    <div>
      <div className="top-0 sticky pb-[0.8rem] sm:shadow-sm flex overflow-x-auto whitespace-nowrap border-b transition duration-100 z-50 border-transparent bg-white">
        <div className="relative z-10 select-none flex">
          <div className="z-20 flex flex-col">
            <div className="relative sm:pl-[0rem] pt-[1rem] lg:pl-[1rem]">
              <div className="absolute bottom-0 right-0 top-8"></div>
              <div className="pointer-events-auto item-center hide-below-640 relative z-10 sm:left-[0.5rem] lg:left-[1.9rem] w-[4.1rem] lg:w-[6.1rem] text-[0.8125rem] leading-5 text-white">
              <svg x="0px" y="0px" className={`h-[3.5rem] w-[3.5rem]`} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                <text x="-9999" y="-9999">ChatGPT</text>
                <path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z" 
                fill="#000"></path>
              </svg>
              </div>
            </div>
          </div>
        </div>
        <div 
          // max-w-[40rem]
          className="relative z-20 px-3 sm:mx-0 w-full sm:w-[40rem] sm:max-w-none sm:flex-none sm:pr-4 sm:pt-[0rem]"
        >
          <p className={`lg:pt-12 font-bold text-2xl sm:text-4xl hide-above-640 tracking-[-0.04em] text-black sm:leading-[3.5rem]`}>Endonezya. </p>
          <div className="flex flex-wrap gap-6 pb-0 pt-2">
            <Link 
              href={`/translator/turkish-indonesia/${value ? value : ''}`}
            >
              <button className={`inline-flex ml-1 items-center text-sm font-medium text-slate-500 border-b-4 ${language_get === 'turkish-indonesia' ? 'border-slate-900' : 'border-transparent hover:border-slate-400'}`}>
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
                <span className="ml-2.5">Turkish</span>
              </button>
            </Link>
            
            <Link 
                href={`/translator/indonesia-turkish/${value ? value : ''}`}
              >
              <button className={`flex items-center text-sm font-medium text-slate-500 border-b-4 ${language_get === 'indonesia-turkish' ? 'border-slate-900' : 'border-transparent hover:border-slate-400'}`}>
                <svg className='h-[1.3rem] w-[1.4rem]' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                      <path style={{ fill: '#B21727' }} d="M468.324,90.839H43.676c-19.562,0-35.418,15.857-35.418,35.418V256h495.484V126.257C503.742,106.695,487.884,90.839,468.324,90.839z"></path>
                      <path style={{ fill: '#FFFFFF' }} d="M8.258,385.743c0,19.562,15.857,35.418,35.418,35.418h424.648c19.561,0,35.418-15.857,35.418-35.418V256H8.258V385.743z"></path>
                      <path style={{ fill: '#121B21' }} d="M468.324,82.581H43.675C19.593,82.581,0,102.174,0,126.257v259.486c0,24.083,19.593,43.676,43.675,43.676h424.648c24.084,0,43.676-19.594,43.676-43.676V126.257C512,102.174,492.407,82.581,468.324,82.581z M495.484,247.742H74.323c-4.561,0-8.258,3.696-8.258,8.258c0,4.562,3.697,8.258,8.258,8.258h421.161v121.485c0,14.977-12.183,27.16-27.16,27.16H43.675c-14.976,0-27.159-12.183-27.159-27.16V264.258H41.29c4.561,0,8.258-3.696,8.258-8.258c0-4.562-3.697-8.258-8.258-8.258H16.516V126.257c0-14.977,12.183-27.16,27.159-27.16h424.648c14.977,0,27.16,12.183,27.16,27.16V247.742z"></path>
                  </g>
                </svg>
                <span className="ml-2.5">Indonesian</span>
              </button>
            </Link>
          </div>
          <form 
            onSubmit={handleSubmit}
            className="group relative "
            >
            <div className="flex-col flex mt-0 sm:flex-row">
              <svg className={`h-[1.5rem] absolute left-[0.9rem] top-[0.6rem] text-slate-400 font-bold pointer-events-none`} viewBox="0 0 24 24" fill="#000">
                <path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
              </svg>
              <input
                className={`sm:ml-0 rounded-md bg-light-sky ring-1 ring-slate-900/10 hover:ring-slate-300 h-[2.5rem] py-2 pl-[3rem] w-full sm:w-full text-left leading-6 placeholder-slate-400 text-slate-900 text-lg sm:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1`}
                type="text"
                autoFocus
                value={value}
                onChange={handleInputChange}
                aria-label="Turkish or Indonesia"
                placeholder={language_get}
              />
              
              <button
                className={`sm:ml-3 mt-2 sm:mt-0 h-[2.5rem] inline-flex justify-center items-center rounded-md text-sm font-semibold py-3 px-5 bg-slate-900 text-white hover:bg-slate-700`}
                type="submit"
              >
                Translate 
              </button>
            </div>
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
      </div>
      <div className="top-0 hide-above-640 overflow-x-auto whitespace-nowrap border-b transition duration-100 z-50 border-transparent bg-white shadow-sm">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex max-w-container justify-between space-x-8 pb-2 pt-2 text-sm font-semibold leading-6 text-slate-900">
          <div className="flex space-x-8 pl-4 sm:pl-6 lg:pl-8">
            <a href="#result">Result in {language_get}</a>
          </div>
          <div className="flex space-x-8 pr-4 sm:pr-6 lg:pr-8">
            <a href="#copy-link">Copy Link</a>
          </div>
        </div>
      </div>
      
      <div className="text-md mx-auto max-w-7xl sm:pl-[2rem] lg:pl-[2rem] pr-[0.5rem] pl-[0.5rem] text-left dark:text-slate-400">
        <div className="grid grid-cols-6 gap-4 pt-4 sm:pl-[2rem] lg:pl-[2rem] pl-[0.5rem] pr-[0.5rem]">
          <div className="p-4 bg-white rounded-lg ring-1 ring-slate-500/10 col-span-6 sm:col-start-1 sm:col-span-4">
               
            {translationResults && translationResults.length > 0 && (
              <div className="flex items-center sm:justify-center sm:ml-0">
                <table className="table-auto w-full whitespace-nowrap dark:text-slate-900 text-slate-900 text-left border-separate border-spacing-y-2">
                  <caption className="caption-top mb-3 text-left text-md">
                    Meanings of {`"${value ? value : ''}"`} in : {translationResults.length} result(s)
                  </caption>
                  <thead>
                    <tr className="bg-slate-900 text-white hide-below-640">
                      <th className="px-4 py-2 text-md hidden sm:table-cell md:table-cell lg:table-cell xl:table-cell">Category</th>
                      <th className="px-4 py-2 text-md">Meaning of</th>
                      <th className="px-4 py-2 text-md">Translation</th>
                    </tr>
                  </thead>
                  <tbody>
                  {translationResults.map((result, index) => (
                    <tr className={`tr-class`} key={index}>
                      <td className="td-class">Common Usage</td>
                      <td className="td-class">{result.segment}</td>
                      <td className="td-class">{result.translation}</td>
                    </tr>
                  ))}
                  
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="p-4 bg-white rounded-lg ring-1 ring-slate-500/10 sm:col-end-7 sm:col-span-2 col-start-1 col-end-7">
            <div className="crayons-card crayons-card--secondary crayons-sponsorship billboard js-billboard" data-display-unit="" data-id="74996" data-category-click="click" data-category-impression="impression" data-context-type="article" data-special="nothing" data-article-id="1686829" data-type-of="external" data-impression-recorded="true">
              <div className="crayons-sponsorship__header relative">
                <div className="flex">
                  <a href="/platformsh" target="_blank" rel="noopener" className="flex">
                    <img width="24" height="24" className="radius-default crayons-sponsorship__image" src="https://media.dev.to/cdn-cgi/image/width=64,height=64,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Forganization%2Fprofile_image%2F4463%2F82fbfc88-f8c9-44b6-abde-c8ec452f1822.png" alt="profile" loading="lazy" />
                    <div className="crayons-sponsorship__title ml-2 fs-s fw-medium">Platform.sh</div>
                  </a>
                  <span className="crayons-sponsorship__indicator c-indicator c-indicator--subtle c-indicator--round fs-2xs fw-medium ml-2 py-1 px-2">Promoted</span>
                </div>
              </div>
              <div className="p-1 pt-3 text-styles text-styles--billboard">
                <p>
                  <a href="https://auth.upsun.com/register?utm_source=devto&amp;utm_medium=paid_social&amp;utm_campaign=conversion_upsun_debug_faster">
                    <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--UYzqGtaH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_100%2Cw_350/https://pro.forem.tools/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcEFCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--753cca82aef31525b935f311d219aefb5538d5d7/debug-much-faster-1200-1200.png" alt="Billboard image" width="1200" height="1200" loading="lazy" />
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg ring-1 ring-slate-500/10 col-span-6 sm:col-start-1 sm:col-span-4">
            <div className="crayons-card crayons-card--secondary crayons-sponsorship billboard js-billboard" data-display-unit="" data-id="74996" data-category-click="click" data-category-impression="impression" data-context-type="article" data-special="nothing" data-article-id="1686829" data-type-of="external" data-impression-recorded="true">
              <div className="crayons-sponsorship__header relative">
                <div className="flex">
                  <span className="crayons-sponsorship__indicator c-indicator c-indicator--subtle c-indicator--round fs-2xs fw-medium ml-2 py-1 px-2">Promoted</span>
                </div>
              </div>
              <div className="p-1 pt-3 text-styles text-styles--billboard">
                <p>
                <a href="https://auth.upsun.com/register?utm_source=devto&amp;utm_medium=paid_social&amp;utm_campaign=conversion_upsun_prototype_fast">
                  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--LTd8KiFV--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_100%2Cw_775/https://pro.forem.tools/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcEVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--78bb21e3762ff4e4c9962d412f83ccfd91a25cef/prototype-apps-fast-launch-faster-1920-1080.png" alt="Billboard image" width="1920" height="1080" loading="lazy"/>

                </a>
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white sm:col-end-7 sm:col-span-2 col-start-1 col-end-7">
            <div className="crayons-card crayons-card--secondary crayons-sponsorship billboard js-billboard" data-display-unit="" data-id="74996" data-category-click="click" data-category-impression="impression" data-context-type="article" data-special="nothing" data-article-id="1686829" data-type-of="external" data-impression-recorded="true">
              <div className="crayons-sponsorship__header relative">
                <div className="flex">
                  <span className="crayons-sponsorship__indicator c-indicator c-indicator--subtle c-indicator--round fs-2xs fw-medium ml-2 py-1 px-2">Promoted</span>
                </div>
              </div>
              <div className="p-1 pt-3 text-styles text-styles--billboard">
                <p>
                <a href="https://aiconusa.techwell.com/?utm_source=devto&amp;utm_medium=referral&amp;utm_campaign=mk-seb-adv-campaign">
                  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--6Cd6LnVn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_100%2Cw_350/https://i.imgur.com/sB2gNeN.png" alt="Techwell image" width="940" height="788" loading="lazy"/>

                </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
