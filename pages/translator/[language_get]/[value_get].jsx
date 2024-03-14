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
    <Container>
      <div className="lg:flex w-full bg-wash dark:bg-wash-dark text-base md:text-lg py-2 sm:py-0 flex-col sm:flex-row z-[100]">
        <div className="flex flex-wrap gap-6 pl-[4.5rem] sm:pl-[6rem] pt-2">
          <Link 
            href={`/translator/turkish-indonesia/${value ? value : value_get}`}
          >
            <button className={`inline-flex ml-1 items-center text-base font-medium ms-0 sm:ms-1 text-slate-500 border-b-4 ${language_get === 'turkish-indonesia' ? 'border-slate-900' : 'border-transparent hover:border-slate-400'}`}>
              <span className="">Turkish</span>
            </button>
          </Link>
          <Link 
            href={`/translator/indonesia-turkish/${value ? value : value_get}`}
          >
            <button className={`inline-flex ml-1 items-center text-base font-medium ms-0 sm:ms-1 text-slate-500 border-b-4 ${language_get === 'indonesia-turkish' ? 'border-slate-900' : 'border-transparent hover:border-slate-400'}`}>
              <span className="">Indonesia</span>
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
            <div className={`flex items-center justify-between w-full sm:w-[69.3%] ${scrolling ? 'pt-[0.5rem]' : ''} pb-[0.5rem] px-[0.5rem] gap-0 sm:gap-3`}>
              <div className="flex flex-row 3xl:flex-1 hide-below-640">
                <div className="flex 3xl:flex-1 align-center">
                  <Link 
                    className="active:scale-95 overflow-hidden transition-transform relative items-center text-primary dark:text-primary-dark p-1 whitespace-nowrap outline-link rounded-full 3xl:rounded-xl inline-flex text-lg font-normal gap-2" 
                    href="/"
                  >
                    <svg width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-sm me-0 w-10 h-10 text-link dark:text-link-dark flex origin-center transition-all ease-in-out">
                      <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
                      <g stroke="currentColor" stroke-width="1" fill="none">
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
                <svg className={`h-[1.5rem] absolute top-[0.6rem] left-[1.8rem] sm:left-[5.5rem] lg:left-[6rem] sm:top-[0.8rem] text-gray-30 font-bold pointer-events-none`} viewBox="0 0 24 24" fill="#99a1b3">
                  <path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
                </svg>
                <input
                  className={`flex 3xl:w-[56rem] 3xl:mx-0 relative pl-[3.1rem] sm:pl-[2.9rem] ps-4 pe-1 py-1 h-10 bg-gray-30/20 dark:bg-gray-40/20 outline-none focus:outline-link betterhover:hover:bg-opacity-80 pointer items-center text-start w-full text-gray-30 rounded-full align-middle text-md`}
                  type="text"
                  autoFocus
                  value={value}
                  onChange={handleInputChange}
                  aria-label="Turkish or Indonesia"
                  placeholder={language_get}
                />
                
                <button
                  className={`sm:ml-3 mt-2 sm:mt-0 h-[2.5rem] inline-flex justify-center items-center rounded-full text-base py-3 px-5 bg-selected dark:bg-selected-dark text-white dark:text-white`}
                  type="submit"
                >
                  Translate 
                </button>
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
      <div className="text-md mx-auto max-w-7xl sm:pl-[2rem] lg:pl-[2rem] pr-[0.5rem] pl-[0.5rem] text-left dark:text-slate-400">
        <div className="grid grid-cols-6 gap-4 pt-4 sm:pl-[2rem] lg:pl-[2rem] pl-[0.5rem] pr-[0.5rem]">
          <div className="p-4 bg-white col-span-6 sm:col-start-1 sm:col-span-4">
          <div className="flex flex-wrap">
            <div className="flex mb-3 mt-0.5 items-center">
                <Link 
                  className="text-link dark:text-link-dark text-sm tracking-wide font-bold me-1 hover:underline" href="#result"
                >
                  About :  {translationResults ? translationResults.length : '0'} result(s)
                </Link>
            </div>
          </div>

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
          <div className="p-4 bg-white sm:col-end-7 sm:col-span-2 col-start-1 col-end-7">
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
          <div className="p-4 bg-white col-span-6 sm:col-start-1 sm:col-span-4">
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

    </Container>
  );
}
