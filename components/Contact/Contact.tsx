"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Contact = () => {
  return (
    <div id='contact' className='w-full mt-20 flex flex-col justify-center items-center bg-green-100 p-5 md:p-24 mb-28'>
        <Image src='/img/mail.png' alt='' width={250} height={100} />
        <h1 className='mt-2 text-3xl font-bold tracking-tight text-green-900 sm:text-4xl'>
            Contactez nous
        </h1>
        <p className='mt-1 mb-4 text-lg leading-8 text-gray-600'>
            Laissez nous un méssage sur notre site web
        </p>
        <Link
          href="https://ididong.org/contact"
          className="rounded-md bg-green-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 transition duration-300"
        >
          Contactez nous maintenant
        </Link>
    </div>
  )
}

export default Contact;