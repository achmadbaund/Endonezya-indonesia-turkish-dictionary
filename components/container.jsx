import Head from 'next/head';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import fetchSuggestions from './searchUtils';
// import Footer from '@/components/Footer';

export default function Container(props) {
  const [suggestions, setSuggestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [translationResults, setTranslationResults] = useState(null);
  const router = useRouter();
  const { language_get, value_get } = router.query;
  const [value, setToTranslate] = useState(value_get);
  const [scrolling, setScrolling] = useState(false);
  const { children, ...customMeta } = props;
  const meta = {
    title: 'endonezyaevi an Indonesian-Turksih dictionany.',
    description: `Indonesian, Turkish, and Dictionary.`,
    image: 'https://leerob.io/static/images/banner.png',
    type: 'website',
    ...customMeta
  };


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
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="endonezyaevi an Indonesian-Turksih dictionany" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@leeerob" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <main>
        {children}
        {/* <Footer /> */}
      </main>
    </div>
  );
}