"use client";

import React from 'react';
import { useEffect } from 'react';
import { useState } from "react";
import Container from '../components/container';
import Link from "next/link";


export default function Home() {
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
  return (
    <Container>
       <div className="lg:flex w-full bg-wash dark:bg-wash-dark text-base md:text-lg py-2 sm:py-0 flex-col sm:flex-row z-[100]">
        <div className="flex flex-wrap gap-6 pl-[4.5rem] sm:pl-[6rem] pt-2">
          <Link 
            href={`/translator/turkish-indonesia/`}
          >
            <button className={`inline-flex ml-1 items-center text-base font-medium ms-0 sm:ms-1 text-slate-500 border-b-4 border-slate-900`}>
              <span className="">Turkish</span>
            </button>
          </Link>
          <Link 
            href={`/translator/indonesia-turkish/`}
          >
            <button className={`inline-flex ml-1 items-center text-base font-medium ms-0 sm:ms-1 text-slate-500 border-b-4 border-transparent hover:border-slate-400`}>
              <span className="">Indonesia</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="z-50 sticky top-0">
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
              <button type="button" className="flex 3xl:w-[56rem] 3xl:mx-0 relative ps-4 pe-1 py-1 h-10 bg-gray-30/20 dark:bg-gray-40/20 outline-none focus:outline-link betterhover:hover:bg-opacity-80 pointer items-center text-start w-full text-gray-30 rounded-full align-middle text-base">
                <svg width="1em" height="1em" viewBox="0 0 20 20" className="align-middle me-3 text-gray-30 shrink-0 group-betterhover:hover:text-gray-70">
                    <path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" stroke-width="2" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                Search<span className="hidden ms-auto sm:flex item-center me-1"><kbd className="w-5 h-5 border border-transparent me-1 bg-wash dark:bg-wash-dark text-gray-30 align-middle p-0 inline-flex justify-center items-center text-xs text-center rounded-md" data-platform="mac">⌘</kbd><kbd className="w-10 h-5 border border-transparent me-1 bg-wash dark:bg-wash-dark text-gray-30 align-middle p-0 inline-flex justify-center items-center text-xs text-center rounded-md" data-platform="win">Ctrl</kbd><kbd className="w-5 h-5 border border-transparent me-1 bg-wash dark:bg-wash-dark text-gray-30 align-middle p-0 inline-flex justify-center items-center text-xs text-center rounded-md">K</kbd></span>
              </button>
              <button
                className={`sm:ml-3 mt-2 sm:mt-0 h-[2.5rem] inline-flex justify-center items-center rounded-full text-base py-3 px-5 bg-selected dark:bg-selected-dark text-white dark:text-white`}
                type="submit"
              >
                Translate 
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div className="mx-auto flex flex-col w-full bg-gradient-right dark:bg-gradient-right-dark" style={{contain: 'content'}}>
        <div className="flex-col gap-2 flex grow w-full my-20 lg:my-32 mx-auto items-center">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-5">
              <div className="max-w-3xl lg:max-w-7xl gap-5 flex flex-col lg:flex-row lg:px-5">
                  <div className="w-full lg:w-6/12 max-w-3xl flex flex-col items-start justify-start lg:ps-5 lg:pe-10">
                    <h2 className="leading-xl font-display text-primary dark:text-primary-dark font-semibold text-5xl lg:text-6xl -mt-4 mb-7 w-full max-w-3xl lg:max-w-xl">Upgrade when the future is ready</h2>
                    <p className="max-w-3xl mx-auto text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">React approaches changes with care. Every React commit is tested on business-critical surfaces with over a billion users. Over 100,000 React components at Meta help validate every migration strategy.</p>
                    <div className="order-last pt-5">
                        <p className="max-w-3xl mx-auto text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">The React team is always researching how to improve React. Some research takes years to pay off. React has a high bar for taking a research idea into production. Only proven approaches become a part of React.</p>
                        <div className="hidden lg:flex justify-start w-full">
                          <a className="focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 focus-visible:dark:focus:outline-link-dark group cursor-pointer w-auto justify-center inline-flex font-bold items-center mt-10 outline-none hover:bg-gray-40/5 active:bg-gray-40/10 hover:dark:bg-gray-60/5 active:dark:bg-gray-60/10 leading-tight hover:bg-opacity-80 text-lg py-2.5 rounded-full px-4 sm:px-6 ease-in-out shadow-secondary-button-stroke dark:shadow-secondary-button-stroke-dark text-primary dark:text-primary-dark" href="/blog">
                              <svg className="me-2.5 text-primary dark:text-primary-dark" fill="none" width="24" height="24" viewBox="0 0 72 72" aria-hidden="true">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7101 56.3758C13.0724 56.7251 13.6324 57 14.3887 57H57.6113C58.3676 57 58.9276 56.7251 59.2899 56.3758C59.6438 56.0346 59.8987 55.5407 59.9086 54.864C59.9354 53.022 59.9591 50.7633 59.9756 48H12.0244C12.0409 50.7633 12.0645 53.022 12.0914 54.864C12.1013 55.5407 12.3562 56.0346 12.7101 56.3758ZM12.0024 42H59.9976C59.9992 41.0437 60 40.0444 60 39C60 29.5762 59.9327 22.5857 59.8589 17.7547C59.8359 16.2516 58.6168 15 56.9938 15L15.0062 15C13.3832 15 12.1641 16.2516 12.1411 17.7547C12.0673 22.5857 12 29.5762 12 39C12 40.0444 12.0008 41.0437 12.0024 42ZM65.8582 17.6631C65.7843 12.8227 61.8348 9 56.9938 9H15.0062C10.1652 9 6.21572 12.8227 6.1418 17.6631C6.06753 22.5266 6 29.5477 6 39C6 46.2639 6.03988 51.3741 6.09205 54.9515C6.15893 59.537 9.80278 63 14.3887 63H57.6113C62.1972 63 65.8411 59.537 65.9079 54.9515C65.9601 51.3741 66 46.2639 66 39C66 29.5477 65.9325 22.5266 65.8582 17.6631ZM39 21C37.3431 21 36 22.3431 36 24C36 25.6569 37.3431 27 39 27H51C52.6569 27 54 25.6569 54 24C54 22.3431 52.6569 21 51 21H39ZM36 33C36 31.3431 37.3431 30 39 30H51C52.6569 30 54 31.3431 54 33C54 34.6569 52.6569 36 51 36H39C37.3431 36 36 34.6569 36 33ZM24 33C27.3137 33 30 30.3137 30 27C30 23.6863 27.3137 21 24 21C20.6863 21 18 23.6863 18 27C18 30.3137 20.6863 33 24 33Z" fill="currentColor"></path>
                              </svg>
                              Read more React news
                              <svg className="text-primary dark:text-primary-dark rtl:rotate-180" fill="none" width="24" height="24" viewBox="0 0 72 72" aria-hidden="true">
                                <path className="transition-transform ease-in-out translate-x-[-8px] group-hover:translate-x-[8px]" fill-rule="evenodd" clip-rule="evenodd" d="M40.0001 19.0245C41.0912 17.7776 42.9864 17.6513 44.2334 18.7423L58.9758 33.768C59.6268 34.3377 60.0002 35.1607 60.0002 36.0257C60.0002 36.8908 59.6268 37.7138 58.9758 38.2835L44.2335 53.3078C42.9865 54.3988 41.0913 54.2725 40.0002 53.0256C38.9092 51.7786 39.0355 49.8835 40.2824 48.7924L52.4445 36.0257L40.2823 23.2578C39.0354 22.1667 38.9091 20.2714 40.0001 19.0245Z" fill="currentColor"></path>
                                <path className="opacity-0 ease-in-out transition-opacity group-hover:opacity-100" d="M60 36.0273C60 37.6842 58.6569 39.0273 57 39.0273H15C13.3431 39.0273 12 37.6842 12 36.0273C12 34.3704 13.3431 33.0273 15 33.0273H57C58.6569 33.0273 60 34.3704 60 36.0273Z" fill="currentColor"></path>
                              </svg>
                          </a>
                        </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12">
                    <p className="uppercase tracking-wide font-bold text-sm text-tertiary dark:text-tertiary-dark flex flex-row gap-2 items-center mt-5 lg:-mt-2 w-full">
                        <svg className="" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                          <g fill="none" fill-rule="evenodd" transform="translate(-446 -398)">
                              <path fill="currentColor" fill-rule="nonzero" d="M95.8838835,240.366117 C95.3957281,239.877961 94.6042719,239.877961 94.1161165,240.366117 C93.6279612,240.854272 93.6279612,241.645728 94.1161165,242.133883 L98.6161165,246.633883 C99.1042719,247.122039 99.8957281,247.122039 100.383883,246.633883 L104.883883,242.133883 C105.372039,241.645728 105.372039,240.854272 104.883883,240.366117 C104.395728,239.877961 103.604272,239.877961 103.116117,240.366117 L99.5,243.982233 L95.8838835,240.366117 Z" transform="translate(356.5 164.5)"></path>
                              <polygon points="446 418 466 418 466 398 446 398"></polygon>
                          </g>
                        </svg>
                        Latest React News
                    </p>
                    <div className="flex-col sm:flex-row flex-wrap flex gap-5 text-start my-5">
                        <div className="flex-1 min-w-[40%] text-start">
                          <a className="block h-full w-full rounded-2xl outline-none focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 focus-visible:dark:focus:outline-link-dark" href="/blog/2024/02/15/react-labs-what-we-have-been-working-on-february-2024">
                              <div className="justify-between p-5 sm:p-5 cursor-pointer w-full h-full flex flex-col flex-1 shadow-secondary-button-stroke dark:shadow-secondary-button-stroke-dark hover:bg-gray-40/5 active:bg-gray-40/10  hover:dark:bg-gray-60/5 active:dark:bg-gray-60/10 rounded-2xl text-xl text-primary dark:text-primary-dark leading-relaxed">
                                <div className="flex flex-row gap-3 w-full">
                                    <h2 className="font-semibold flex-1 text-2xl lg:text-3xl hover:underline leading-snug mb-4">React Labs: February 2024</h2>
                                </div>
                                <div>
                                    <div className="flex flex-row justify-start gap-2 items-center text-base text-tertiary dark:text-tertiary-dark">
                                      <svg className="w-6 h-6 text-tertiary dark:text-tertiary-dark" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M27.4865 9C25.8297 9 24.4865 10.3431 24.4865 12C24.4865 13.6569 25.8297 15 27.4865 15V31.1087C27.4865 32.3397 27.1078 33.5409 26.4019 34.5494L13.095 53.5592C10.3114 57.5359 13.1563 63 18.0104 63H54.9626C59.8167 63 62.6616 57.5359 59.878 53.5592L46.5711 34.5494C45.8652 33.5409 45.4865 32.3397 45.4865 31.1087V15C47.1434 15 48.4865 13.6569 48.4865 12C48.4865 10.3431 47.1434 9 45.4865 9H27.4865ZM39.4865 31.1087V15H33.4865V31.1087C33.4865 33.5707 32.7292 35.9732 31.3173 37.9902L28.5104 42H44.4626L41.6557 37.9902C40.2438 35.9732 39.4865 33.5707 39.4865 31.1087ZM18.0104 57L24.3104 48H48.6626L54.9626 57H18.0104Z" fill="currentColor"></path>
                                      </svg>
                                      February 15, 2024
                                    </div>
                                    <span className="text-base text-secondary dark:text-secondary-dark"></span>
                                </div>
                              </div>
                          </a>
                        </div>
                        <div className="flex-1 min-w-[40%] text-start">
                          <a className="block h-full w-full rounded-2xl outline-none focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 focus-visible:dark:focus:outline-link-dark" href="/blog/2023/05/03/react-canaries">
                              <div className="justify-between p-5 sm:p-5 cursor-pointer w-full h-full flex flex-col flex-1 shadow-secondary-button-stroke dark:shadow-secondary-button-stroke-dark hover:bg-gray-40/5 active:bg-gray-40/10  hover:dark:bg-gray-60/5 active:dark:bg-gray-60/10 rounded-2xl text-xl text-primary dark:text-primary-dark leading-relaxed">
                                <div className="flex flex-row gap-3 w-full">
                                    <h2 className="font-semibold flex-1 text-2xl lg:text-3xl hover:underline leading-snug mb-4">React Canaries: Incremental Feature Rollout</h2>
                                </div>
                                <div>
                                    <div className="flex flex-row justify-start gap-2 items-center text-base text-tertiary dark:text-tertiary-dark">
                                      <svg className="w-6 h-6 text-tertiary dark:text-tertiary-dark" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7101 56.3758C13.0724 56.7251 13.6324 57 14.3887 57H57.6113C58.3676 57 58.9276 56.7251 59.2899 56.3758C59.6438 56.0346 59.8987 55.5407 59.9086 54.864C59.9354 53.022 59.9591 50.7633 59.9756 48H12.0244C12.0409 50.7633 12.0645 53.022 12.0914 54.864C12.1013 55.5407 12.3562 56.0346 12.7101 56.3758ZM12.0024 42H59.9976C59.9992 41.0437 60 40.0444 60 39C60 29.5762 59.9327 22.5857 59.8589 17.7547C59.8359 16.2516 58.6168 15 56.9938 15L15.0062 15C13.3832 15 12.1641 16.2516 12.1411 17.7547C12.0673 22.5857 12 29.5762 12 39C12 40.0444 12.0008 41.0437 12.0024 42ZM65.8582 17.6631C65.7843 12.8227 61.8348 9 56.9938 9H15.0062C10.1652 9 6.21572 12.8227 6.1418 17.6631C6.06753 22.5266 6 29.5477 6 39C6 46.2639 6.03988 51.3741 6.09205 54.9515C6.15893 59.537 9.80278 63 14.3887 63H57.6113C62.1972 63 65.8411 59.537 65.9079 54.9515C65.9601 51.3741 66 46.2639 66 39C66 29.5477 65.9325 22.5266 65.8582 17.6631ZM39 21C37.3431 21 36 22.3431 36 24C36 25.6569 37.3431 27 39 27H51C52.6569 27 54 25.6569 54 24C54 22.3431 52.6569 21 51 21H39ZM36 33C36 31.3431 37.3431 30 39 30H51C52.6569 30 54 31.3431 54 33C54 34.6569 52.6569 36 51 36H39C37.3431 36 36 34.6569 36 33ZM24 33C27.3137 33 30 30.3137 30 27C30 23.6863 27.3137 21 24 21C20.6863 21 18 23.6863 18 27C18 30.3137 20.6863 33 24 33Z" fill="currentColor"></path>
                                      </svg>
                                      May 3, 2023
                                    </div>
                                    <span className="text-base text-secondary dark:text-secondary-dark"></span>
                                </div>
                              </div>
                          </a>
                        </div>
                        <div className="flex-1 min-w-[40%] text-start">
                          <a className="block h-full w-full rounded-2xl outline-none focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 focus-visible:dark:focus:outline-link-dark" href="/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023">
                              <div className="justify-between p-5 sm:p-5 cursor-pointer w-full h-full flex flex-col flex-1 shadow-secondary-button-stroke dark:shadow-secondary-button-stroke-dark hover:bg-gray-40/5 active:bg-gray-40/10  hover:dark:bg-gray-60/5 active:dark:bg-gray-60/10 rounded-2xl text-xl text-primary dark:text-primary-dark leading-relaxed">
                                <div className="flex flex-row gap-3 w-full">
                                    <h2 className="font-semibold flex-1 text-2xl lg:text-3xl hover:underline leading-snug mb-4">React Labs: March 2023</h2>
                                </div>
                                <div>
                                    <div className="flex flex-row justify-start gap-2 items-center text-base text-tertiary dark:text-tertiary-dark">
                                      <svg className="w-6 h-6 text-tertiary dark:text-tertiary-dark" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M27.4865 9C25.8297 9 24.4865 10.3431 24.4865 12C24.4865 13.6569 25.8297 15 27.4865 15V31.1087C27.4865 32.3397 27.1078 33.5409 26.4019 34.5494L13.095 53.5592C10.3114 57.5359 13.1563 63 18.0104 63H54.9626C59.8167 63 62.6616 57.5359 59.878 53.5592L46.5711 34.5494C45.8652 33.5409 45.4865 32.3397 45.4865 31.1087V15C47.1434 15 48.4865 13.6569 48.4865 12C48.4865 10.3431 47.1434 9 45.4865 9H27.4865ZM39.4865 31.1087V15H33.4865V31.1087C33.4865 33.5707 32.7292 35.9732 31.3173 37.9902L28.5104 42H44.4626L41.6557 37.9902C40.2438 35.9732 39.4865 33.5707 39.4865 31.1087ZM18.0104 57L24.3104 48H48.6626L54.9626 57H18.0104Z" fill="currentColor"></path>
                                      </svg>
                                      March 22, 2023
                                    </div>
                                    <span className="text-base text-secondary dark:text-secondary-dark"></span>
                                </div>
                              </div>
                          </a>
                        </div>
                        <div className="hidden sm:flex-1 sm:inline">
                          <a className="block h-full w-full rounded-2xl outline-none focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 focus-visible:dark:focus:outline-link-dark" href="/blog/2023/03/16/introducing-react-dev">
                              <div className="justify-between p-5 sm:p-5 cursor-pointer w-full h-full flex flex-col flex-1 shadow-secondary-button-stroke dark:shadow-secondary-button-stroke-dark hover:bg-gray-40/5 active:bg-gray-40/10  hover:dark:bg-gray-60/5 active:dark:bg-gray-60/10 rounded-2xl text-xl text-primary dark:text-primary-dark leading-relaxed">
                                <div className="flex flex-row gap-3 w-full">
                                    <h2 className="font-semibold flex-1 text-2xl lg:text-3xl hover:underline leading-snug mb-4">Introducing react.dev</h2>
                                </div>
                                <div>
                                    <div className="flex flex-row justify-start gap-2 items-center text-base text-tertiary dark:text-tertiary-dark">
                                      <svg className="w-6 h-6 text-tertiary dark:text-tertiary-dark" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7101 56.3758C13.0724 56.7251 13.6324 57 14.3887 57H57.6113C58.3676 57 58.9276 56.7251 59.2899 56.3758C59.6438 56.0346 59.8987 55.5407 59.9086 54.864C59.9354 53.022 59.9591 50.7633 59.9756 48H12.0244C12.0409 50.7633 12.0645 53.022 12.0914 54.864C12.1013 55.5407 12.3562 56.0346 12.7101 56.3758ZM12.0024 42H59.9976C59.9992 41.0437 60 40.0444 60 39C60 29.5762 59.9327 22.5857 59.8589 17.7547C59.8359 16.2516 58.6168 15 56.9938 15L15.0062 15C13.3832 15 12.1641 16.2516 12.1411 17.7547C12.0673 22.5857 12 29.5762 12 39C12 40.0444 12.0008 41.0437 12.0024 42ZM65.8582 17.6631C65.7843 12.8227 61.8348 9 56.9938 9H15.0062C10.1652 9 6.21572 12.8227 6.1418 17.6631C6.06753 22.5266 6 29.5477 6 39C6 46.2639 6.03988 51.3741 6.09205 54.9515C6.15893 59.537 9.80278 63 14.3887 63H57.6113C62.1972 63 65.8411 59.537 65.9079 54.9515C65.9601 51.3741 66 46.2639 66 39C66 29.5477 65.9325 22.5266 65.8582 17.6631ZM39 21C37.3431 21 36 22.3431 36 24C36 25.6569 37.3431 27 39 27H51C52.6569 27 54 25.6569 54 24C54 22.3431 52.6569 21 51 21H39ZM36 33C36 31.3431 37.3431 30 39 30H51C52.6569 30 54 31.3431 54 33C54 34.6569 52.6569 36 51 36H39C37.3431 36 36 34.6569 36 33ZM24 33C27.3137 33 30 30.3137 30 27C30 23.6863 27.3137 21 24 21C20.6863 21 18 23.6863 18 27C18 30.3137 20.6863 33 24 33Z" fill="currentColor"></path>
                                      </svg>
                                      March 16, 2023
                                    </div>
                                    <span className="text-base text-secondary dark:text-secondary-dark"></span>
                                </div>
                              </div>
                          </a>
                        </div>
                    </div>
                    <div className="flex lg:hidden justify-start w-full">
                        <a className="focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 focus-visible:dark:focus:outline-link-dark group cursor-pointer w-auto justify-center inline-flex font-bold items-center mt-10 outline-none hover:bg-gray-40/5 active:bg-gray-40/10 hover:dark:bg-gray-60/5 active:dark:bg-gray-60/10 leading-tight hover:bg-opacity-80 text-lg py-2.5 rounded-full px-4 sm:px-6 ease-in-out shadow-secondary-button-stroke dark:shadow-secondary-button-stroke-dark text-primary dark:text-primary-dark" href="/blog">
                          <svg className="me-2.5 text-primary dark:text-primary-dark" fill="none" width="24" height="24" viewBox="0 0 72 72" aria-hidden="true">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7101 56.3758C13.0724 56.7251 13.6324 57 14.3887 57H57.6113C58.3676 57 58.9276 56.7251 59.2899 56.3758C59.6438 56.0346 59.8987 55.5407 59.9086 54.864C59.9354 53.022 59.9591 50.7633 59.9756 48H12.0244C12.0409 50.7633 12.0645 53.022 12.0914 54.864C12.1013 55.5407 12.3562 56.0346 12.7101 56.3758ZM12.0024 42H59.9976C59.9992 41.0437 60 40.0444 60 39C60 29.5762 59.9327 22.5857 59.8589 17.7547C59.8359 16.2516 58.6168 15 56.9938 15L15.0062 15C13.3832 15 12.1641 16.2516 12.1411 17.7547C12.0673 22.5857 12 29.5762 12 39C12 40.0444 12.0008 41.0437 12.0024 42ZM65.8582 17.6631C65.7843 12.8227 61.8348 9 56.9938 9H15.0062C10.1652 9 6.21572 12.8227 6.1418 17.6631C6.06753 22.5266 6 29.5477 6 39C6 46.2639 6.03988 51.3741 6.09205 54.9515C6.15893 59.537 9.80278 63 14.3887 63H57.6113C62.1972 63 65.8411 59.537 65.9079 54.9515C65.9601 51.3741 66 46.2639 66 39C66 29.5477 65.9325 22.5266 65.8582 17.6631ZM39 21C37.3431 21 36 22.3431 36 24C36 25.6569 37.3431 27 39 27H51C52.6569 27 54 25.6569 54 24C54 22.3431 52.6569 21 51 21H39ZM36 33C36 31.3431 37.3431 30 39 30H51C52.6569 30 54 31.3431 54 33C54 34.6569 52.6569 36 51 36H39C37.3431 36 36 34.6569 36 33ZM24 33C27.3137 33 30 30.3137 30 27C30 23.6863 27.3137 21 24 21C20.6863 21 18 23.6863 18 27C18 30.3137 20.6863 33 24 33Z" fill="currentColor"></path>
                          </svg>
                          Read more React news
                          <svg className="text-primary dark:text-primary-dark rtl:rotate-180" fill="none" width="24" height="24" viewBox="0 0 72 72" aria-hidden="true">
                              <path className="transition-transform ease-in-out translate-x-[-8px] group-hover:translate-x-[8px]" fill-rule="evenodd" clip-rule="evenodd" d="M40.0001 19.0245C41.0912 17.7776 42.9864 17.6513 44.2334 18.7423L58.9758 33.768C59.6268 34.3377 60.0002 35.1607 60.0002 36.0257C60.0002 36.8908 59.6268 37.7138 58.9758 38.2835L44.2335 53.3078C42.9865 54.3988 41.0913 54.2725 40.0002 53.0256C38.9092 51.7786 39.0355 49.8835 40.2824 48.7924L52.4445 36.0257L40.2823 23.2578C39.0354 22.1667 38.9091 20.2714 40.0001 19.0245Z" fill="currentColor"></path>
                              <path className="opacity-0 ease-in-out transition-opacity group-hover:opacity-100" d="M60 36.0273C60 37.6842 58.6569 39.0273 57 39.0273H15C13.3431 39.0273 12 37.6842 12 36.0273C12 34.3704 13.3431 33.0273 15 33.0273H57C58.6569 33.0273 60 34.3704 60 36.0273Z" fill="currentColor"></path>
                          </svg>
                        </a>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </div>

    </Container>
    
  );
}
