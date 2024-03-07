"use client";

import axios from "axios";
import { useEffect } from 'react';
import { useState } from "react";
import { useRouter } from 'next/router';
import Container from '../../../components/container';
import Link from "next/link";

export default function TranslatorPage() {
  const [language, setTranslatedTo] = useState("id|tr"); // Default value
  const [showResults, setShowResults] = useState(false);
  const [query, setQuery] = useState('');
  const [translationResults, setTranslationResults] = useState(null);
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
      query // search value / hasil 
    );
  }

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
      <div className="bg-slate-50 border-b-2 pb-3 text-left w-full dark:text-slate-400">
        <header className="text-md mx-auto max-w-7xl sm:px-6 lg:px-8 text-left dark:text-slate-400">
          <div className={`px-4 sm:px-6 lg:px-8 ${scrolling ? 'lg:pb-4' : 'lg:pb-12'}`}>
            <div className="relative z-20 mx-auto max-w-[40rem] lg:mx-0 lg:w-[40rem] lg:max-w-none lg:flex-none lg:pr-4">
              <p className={`lg:pt-12 ${scrolling ? 'font-bold text-2xl sm:text-4xl' : 'font-extrabold text-3xl sm:text-5xl'} hide-below-640 tracking-[-0.04em] text-black sm:leading-[3.5rem]`}>Endonezya. </p>
              <div className="flex flex-wrap gap-6 sm:mt-4">
                <Link 
                  href={`/translator/turkish-indonesia/${value ? value : ''}`}
                >
                  <button className={`inline-flex ml-1 items-center text-sm font-medium text-slate-500 border-b-4 ${language_get === 'turkish-indonesia' ? 'border-indigo-600' : 'border-transparent hover:border-slate-400'}`}>
                    <svg className='h-6 w-6 sm:h-7 sm:w-7' version="1.1" id="Layer_1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
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
                  <button className={`flex items-center text-sm font-medium text-slate-500 border-b-4 ${language_get === 'indonesia-turkish' ? 'border-indigo-600' : 'border-transparent hover:border-slate-400'}`}>
                    <svg className='h-6 w-6 sm:h-7 sm:w-7' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000">
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
            </div>
            <form 
              onSubmit={handleSubmit}
              className="group relative"
            >
              <div className="flex-col flex mt-0 sm:flex-row">
                <svg className={`h-7 absolute left-0.7 sm:left-6 ${scrolling ? 'top-1.8' : 'top-1.8 sm:top-6'} text-slate-400 font-bold pointer-events-none`} viewBox="0 0 24 24" fill="#2f7cff">
                  <path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
                </svg>
                <input
                  className={`sm:ml-0 border-none shadow-md bg-light-sky ring-1 ring-slate-700/10 ${scrolling ? 'h-16' : 'h-16 sm:h-20'} py-2 pl-11 sm:pl-16 rounded-md w-full sm:w-full text-left leading-6 placeholder-slate-400 text-slate-900 text-lg sm:text-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2`}
                  type="text"
                  autoFocus
                  value={value}
                  onChange={handleInputChange}
                  aria-label="Turkish or Indonesia"
                  placeholder={language_get}
                />
                <button
                  className={`sm:ml-3 mt-2 sm:mt-0 inline-flex justify-center items-center rounded-lg text-sm font-semibold py-3 px-4 bg-slate-900 text-white hover:bg-slate-700`}
                  // style={{ background: '#bf1e2e' }}
                  type="submit"
                >
                  Translate
                </button>

              </div>
            </form>
          {/* {showResults && (
          <div className="max-w-screen-xl mx-auto px-4 sm:px-4 mt-2">
            <ul role="list" className="bg-white p-2 ring-1 ring-slate-900/5 shadow rounded-md">
              <li className="group/item relative flex items-center justify-between rounded-md p-2 hover:bg-slate-100">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                  <svg className="h-6 w-6 absolute left-1 top-2.2 sm:left-2 text-slate-400 font-bold pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.516 6.984v5.25l4.5 2.672-0.75 1.266-5.25-3.188v-6h1.5zM12 20.016q3.281 0 5.648-2.367t2.367-5.648-2.367-5.648-5.648-2.367-5.648 2.367-2.367 5.648 2.367 5.648 5.648 2.367zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93z"></path>
                  </svg>
                  </div>
                  <div className="pl-3 sm:pl-5 w-full text-sm leading-6">
                    <Link 
                      href={`/translator/${language_get}/${performSearch()}`}
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
          )} */}
          </div>
        </header>
      </div>
      <div className="top-0 overflow-x-auto whitespace-nowrap border-b transition duration-100 z-50 border-transparent bg-white shadow-sm">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex max-w-container justify-between space-x-8 py-4 text-sm font-semibold leading-6 text-slate-900">
          <div className="flex space-x-8 pl-4 sm:pl-6 lg:pl-8">
            <a href="#result">Result in {language_get}</a>
          </div>
          <div className="flex space-x-8 pr-4 sm:pr-6 lg:pr-8">
            <a href="#copy-link">Copy Link</a>
          </div>
        </div>
      </div>

      <div className="text-md mx-auto max-w-7xl sm:px-6 lg:px-8 text-left dark:text-slate-400">
        <div className="grid grid-cols-6 gap-4 px-4 pt-4 sm:px-6 lg:px-8">
          <div className="col-span-6 sm:col-start-1 sm:col-span-4">
                  {/* <thead>
                    <tr className="text-white">
                      <th className="px-4 py-2 text-md hidden sm:table-cell md:table-cell lg:table-cell xl:table-cell">Category</th>
                      <th className="px-4 py-2 text-md">Meaning of</th>
                      <th className="px-4 py-2 text-md">Translation</th>
                    </tr>
                  </thead>
                  <tr className="tr-class">
                      <th className="th-class">Name</th>
                      <td className="td-class">Frodo Baggins</td>
                    </tr> */}
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
