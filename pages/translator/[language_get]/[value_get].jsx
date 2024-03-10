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
      query // search value / hasil.
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
      <div className="bg-white shadow-sm ring-1 ring-slate-200 mx-auto max-w-container px-[1rem] flex">
        <div className="relative z-10 select-none flex">
          <div className="z-20 flex flex-col">
            <div className="relative pt-[2rem]">
              <div className="absolute bottom-0 left-11 right-0 top-8"></div>
              <div className="pointer-events-auto item-center relative z-10 lg:left-[1.9rem] w-[4.1rem] lg:w-[7.1rem] text-[0.8125rem] leading-5 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className={`h-[3.5rem] w-[3.5rem]`} viewBox="0 0 100 100">
                  <path fill="#c7ede6" d="M87.215,56.71C88.35,54.555,89,52.105,89,49.5c0-6.621-4.159-12.257-10.001-14.478 C78.999,35.015,79,35.008,79,35c0-11.598-9.402-21-21-21c-9.784,0-17.981,6.701-20.313,15.757C36.211,29.272,34.638,29,33,29 c-7.692,0-14.023,5.793-14.89,13.252C12.906,43.353,9,47.969,9,53.5C9,59.851,14.149,65,20.5,65c0.177,0,0.352-0.012,0.526-0.022 C21.022,65.153,21,65.324,21,65.5C21,76.822,30.178,86,41.5,86c6.437,0,12.175-2.972,15.934-7.614C59.612,80.611,62.64,82,66,82 c4.65,0,8.674-2.65,10.666-6.518C77.718,75.817,78.837,76,80,76c6.075,0,11-4.925,11-11C91,61.689,89.53,58.727,87.215,56.71z"></path>
                  <path fill="#fdfcef" d="M78.5,71.5V72h3v-0.5c0,0,4.242,0,5.5,0c2.485,0,4.5-2.015,4.5-4.5 c0-2.333-1.782-4.229-4.055-4.455C87.467,62.364,87.5,62.187,87.5,62c0-2.485-2.015-4.5-4.5-4.5c-1.438,0-2.703,0.686-3.527,1.736 C79.333,56.6,77.171,54.5,74.5,54.5c-2.761,0-5,2.239-5,5c0,0.446,0.077,0.87,0.187,1.282C69.045,60.005,68.086,59.5,67,59.5 c-1.781,0-3.234,1.335-3.455,3.055C63.364,62.533,63.187,62.5,63,62.5c-2.485,0-4.5,2.015-4.5,4.5s2.015,4.5,4.5,4.5s9.5,0,9.5,0 H78.5z"></path>
                  <path fill="#472b29" d="M74.5,54c-3.033,0-5.5,2.467-5.5,5.5c0,0.016,0,0.031,0,0.047C68.398,59.192,67.71,59,67,59 c-1.831,0-3.411,1.261-3.858,3.005C63.095,62.002,63.048,62,63,62c-2.757,0-5,2.243-5,5s2.243,5,5,5h15.5 c0.276,0,0.5-0.224,0.5-0.5S78.776,71,78.5,71H63c-2.206,0-4-1.794-4-4s1.794-4,4-4c0.117,0,0.23,0.017,0.343,0.032l0.141,0.019 c0.021,0.003,0.041,0.004,0.062,0.004c0.246,0,0.462-0.185,0.495-0.437C64.232,61.125,65.504,60,67,60 c0.885,0,1.723,0.401,2.301,1.1c0.098,0.118,0.241,0.182,0.386,0.182c0.078,0,0.156-0.018,0.228-0.056 c0.209-0.107,0.314-0.346,0.254-0.573C70.054,60.218,70,59.852,70,59.5c0-2.481,2.019-4.5,4.5-4.5 c2.381,0,4.347,1.872,4.474,4.263c0.011,0.208,0.15,0.387,0.349,0.45c0.05,0.016,0.101,0.024,0.152,0.024 c0.15,0,0.296-0.069,0.392-0.192C80.638,58.563,81.779,58,83,58c2.206,0,4,1.794,4,4c0,0.117-0.017,0.23-0.032,0.343l-0.019,0.141 c-0.016,0.134,0.022,0.268,0.106,0.373c0.084,0.105,0.207,0.172,0.34,0.185C89.451,63.247,91,64.949,91,67c0,2.206-1.794,4-4,4 h-5.5c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5H87c2.757,0,5-2.243,5-5c0-2.397-1.689-4.413-4.003-4.877 C87.999,62.082,88,62.041,88,62c0-2.757-2.243-5-5-5c-1.176,0-2.293,0.416-3.183,1.164C79.219,55.76,77.055,54,74.5,54L74.5,54z"></path>
                  <path fill="#472b29" d="M73 61c-1.403 0-2.609.999-2.913 2.341C69.72 63.119 69.301 63 68.875 63c-1.202 0-2.198.897-2.353 2.068C66.319 65.022 66.126 65 65.938 65c-1.529 0-2.811 1.2-2.918 2.732C63.01 67.87 63.114 67.99 63.251 68c.006 0 .012 0 .018 0 .13 0 .24-.101.249-.232.089-1.271 1.151-2.268 2.419-2.268.229 0 .47.041.738.127.022.007.045.01.067.01.055 0 .11-.02.156-.054C66.962 65.537 67 65.455 67 65.375c0-1.034.841-1.875 1.875-1.875.447 0 .885.168 1.231.473.047.041.106.063.165.063.032 0 .063-.006.093-.019.088-.035.148-.117.155-.212C70.623 62.512 71.712 61.5 73 61.5c.208 0 .425.034.682.107.023.007.047.01.07.01.109 0 .207-.073.239-.182.038-.133-.039-.271-.172-.309C73.517 61.04 73.256 61 73 61L73 61zM86.883 62.5c-1.326 0-2.508.897-2.874 2.182-.038.133.039.271.172.309C84.205 64.997 84.228 65 84.25 65c.109 0 .209-.072.24-.182C84.795 63.748 85.779 63 86.883 63c.117 0 .23.014.342.029.012.002.023.003.035.003.121 0 .229-.092.246-.217.019-.137-.077-.263-.214-.281C87.158 62.516 87.022 62.5 86.883 62.5L86.883 62.5z"></path>
                  <path fill="#fff" d="M31.5 76h-10c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h10c.276 0 .5.224.5.5S31.777 76 31.5 76zM34.5 76h-1c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h1c.276 0 .5.224.5.5S34.777 76 34.5 76zM39.491 78H30.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8.991c.276 0 .5.224.5.5S39.767 78 39.491 78zM28.5 78h-1c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h1c.276 0 .5.224.5.5S28.777 78 28.5 78zM25.5 78h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S25.777 78 25.5 78zM31.5 80h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S31.776 80 31.5 80zM34.5 71c-.177 0-.823 0-1 0-.276 0-.5.224-.5.5 0 .276.224.5.5.5.177 0 .823 0 1 0 .276 0 .5-.224.5-.5C35 71.224 34.776 71 34.5 71zM34.5 73c-.177 0-4.823 0-5 0-.276 0-.5.224-.5.5 0 .276.224.5.5.5.177 0 4.823 0 5 0 .276 0 .5-.224.5-.5C35 73.224 34.776 73 34.5 73zM39.5 75c-.177 0-2.823 0-3 0-.276 0-.5.224-.5.5 0 .276.224.5.5.5.177 0 2.823 0 3 0 .276 0 .5-.224.5-.5C40 75.224 39.776 75 39.5 75z"></path>
                  <g>
                    <path fill="#fff" d="M72.5 24h-10c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h10c.276 0 .5.224.5.5S72.776 24 72.5 24zM76.5 24h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S76.776 24 76.5 24zM81.5 26h-10c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h10c.276 0 .5.224.5.5S81.777 26 81.5 26zM69.5 26h-1c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h1c.276 0 .5.224.5.5S69.776 26 69.5 26zM66.47 26H64.5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h1.97c.276 0 .5.224.5.5S66.746 26 66.47 26zM75.5 22h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S75.777 22 75.5 22zM72.5 28h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S72.776 28 72.5 28z"></path>
                  </g>
                  <g>
                    <path fill="#ea5167" d="M37.81,47.585c1.164-6.772,7.049-11.929,14.153-11.929c3.227,0,6.196,1.076,8.595,2.872 l6.127-6.598c-4.009-3.286-9.134-5.259-14.722-5.259c-11.446,0-20.952,8.276-22.879,19.169L37.81,47.585z"></path>
                    <path fill="#00a698" d="M60.497,61.599c-2.387,1.765-5.338,2.81-8.534,2.81c-7.516,0-13.675-5.769-14.313-13.119 l-8.539,2.846c1.987,10.819,11.459,19.019,22.852,19.019c6.001,0,11.47-2.275,15.594-6.009L60.497,61.599z"></path>
                    <path fill="#48bed8" d="M69.693,45.72h-4.015H52.442v8.626h13.237c-1.028,3.272-3.194,6.039-6.034,7.839l6.944,5.787 c5.255-4.261,8.616-10.766,8.616-18.058c0-1.432-0.136-2.832-0.385-4.193H69.693z"></path>
                    <path fill="#fde751" d="M37.586,50.032c0-2.092,0.457-4.075,1.261-5.868l-7.493-4.995 c-1.679,3.214-2.634,6.866-2.634,10.744c0,3.627,0.832,7.059,2.313,10.117l7.511-5.206C38.193,53.58,37.586,51.389,37.586,50.032z"></path>
                  </g>
                  <g>
                    <path fill="#472b29" d="M51.962,73.825c-13.185,0-23.913-10.727-23.913-23.913S38.777,26,51.962,26 c5.511,0,10.89,1.922,15.146,5.411l0.552,0.452l-7.022,7.563l-0.483-0.361c-2.394-1.791-5.227-2.738-8.193-2.738 c-7.557,0-13.705,6.148-13.705,13.705s6.148,13.705,13.705,13.705c5.708,0,10.73-3.468,12.77-8.721H51.771v-9.968h23.608l0.1,0.55 c0.263,1.44,0.396,2.892,0.396,4.314C75.875,63.098,65.148,73.825,51.962,73.825z M51.962,27.342 c-12.445,0-22.57,10.125-22.57,22.57s10.125,22.57,22.57,22.57s22.57-10.125,22.57-22.57c0-1.161-0.094-2.343-0.28-3.522h-21.14 v7.284h13.48l-0.274,0.872c-1.98,6.3-7.75,10.533-14.357,10.533c-8.297,0-15.047-6.75-15.047-15.047s6.75-15.047,15.047-15.047 c3.058,0,5.985,0.915,8.506,2.652l5.231-5.633C61.775,28.993,56.925,27.342,51.962,27.342z"></path>
                  </g>
                  <g>
                    <path fill="#fdfcef" d="M36.5,36.5c0,0,1.567,0,3.5,0s3.5-1.567,3.5-3.5c0-1.781-1.335-3.234-3.055-3.455 C40.473,29.366,40.5,29.187,40.5,29c0-1.933-1.567-3.5-3.5-3.5c-1.032,0-1.95,0.455-2.59,1.165 c-0.384-1.808-1.987-3.165-3.91-3.165c-2.209,0-4,1.791-4,4c0,0.191,0.03,0.374,0.056,0.558C26.128,27.714,25.592,27.5,25,27.5 c-1.228,0-2.245,0.887-2.455,2.055C22.366,29.527,22.187,29.5,22,29.5c-1.933,0-3.5,1.567-3.5,3.5s1.567,3.5,3.5,3.5s7.5,0,7.5,0 V37h7V36.5z"></path>
                    <path fill="#472b29" d="M38.25 32C38.112 32 38 31.888 38 31.75c0-1.223.995-2.218 2.218-2.218.034.009.737-.001 1.244.136.133.036.212.173.176.306-.036.134-.173.213-.306.176-.444-.12-1.1-.12-1.113-.118-.948 0-1.719.771-1.719 1.718C38.5 31.888 38.388 32 38.25 32zM31.5 36A.5.5 0 1 0 31.5 37 .5.5 0 1 0 31.5 36z"></path>
                    <path fill="#472b29" d="M40,37h-3.5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5H40c1.654,0,3-1.346,3-3 c0-1.496-1.125-2.768-2.618-2.959c-0.134-0.018-0.255-0.088-0.336-0.196s-0.115-0.244-0.094-0.377C39.975,29.314,40,29.16,40,29 c0-1.654-1.346-3-3-3c-0.85,0-1.638,0.355-2.219,1c-0.125,0.139-0.321,0.198-0.5,0.148c-0.182-0.049-0.321-0.195-0.36-0.379 C33.58,25.165,32.141,24,30.5,24c-1.93,0-3.5,1.57-3.5,3.5c0,0.143,0.021,0.28,0.041,0.418c0.029,0.203-0.063,0.438-0.242,0.54 c-0.179,0.102-0.396,0.118-0.556-0.01C25.878,28.155,25.449,28,25,28c-0.966,0-1.792,0.691-1.963,1.644 c-0.048,0.267-0.296,0.446-0.569,0.405C22.314,30.025,22.16,30,22,30c-1.654,0-3,1.346-3,3s1.346,3,3,3h7.5 c0.276,0,0.5,0.224,0.5,0.5S29.776,37,29.5,37H22c-2.206,0-4-1.794-4-4s1.794-4,4-4c0.059,0,0.116,0.002,0.174,0.006 C22.588,27.82,23.711,27,25,27c0.349,0,0.689,0.061,1.011,0.18C26.176,24.847,28.126,23,30.5,23c1.831,0,3.466,1.127,4.153,2.774 C35.333,25.276,36.155,25,37,25c2.206,0,4,1.794,4,4c0,0.048-0.001,0.095-0.004,0.142C42.739,29.59,44,31.169,44,33 C44,35.206,42.206,37,40,37z"></path>
                    <path fill="#472b29" d="M34.5,36c-0.159,0-0.841,0-1,0c-0.276,0-0.5,0.224-0.5,0.5c0,0.276,0.224,0.5,0.5,0.5 c0.159,0,0.841,0,1,0c0.276,0,0.5-0.224,0.5-0.5C35,36.224,34.776,36,34.5,36z"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div 
          className="relative z-20 max-w-[40rem] sm:mx-0 sm:w-[40rem] sm:max-w-none sm:flex-none sm:pr-4 sm:pt-[0.4rem]"
        >
          <div className="flex flex-wrap gap-6 pb-0 pt-3">
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
                className={`sm:ml-0 rounded-md bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 h-[2.5rem] py-2 pl-[3rem] w-full sm:w-full text-left leading-6 placeholder-slate-400 text-slate-900 text-lg sm:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1`}
                type="text"
                autoFocus
                value={value}
                onChange={handleInputChange}
                aria-label="Turkish or Indonesia"
                placeholder={language_get}
              />
              
              <button
                className={`hide-below-640 sm:ml-3 mt-2 sm:mt-0 h-[2.5rem] inline-flex justify-center items-center rounded-md text-sm font-semibold py-3 px-5 bg-slate-900 text-white hover:bg-slate-700`}
                type="submit"
              >
                Translate 
              </button>
            </div>
          </form>
        </div>
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

      <div className="text-md mx-auto max-w-7xl pl-[2rem] pr-[0.5rem] text-left dark:text-slate-400">
        <div className="grid grid-cols-6 gap-4 pt-4 pl-[2rem] pr-[0.5rem]">
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
