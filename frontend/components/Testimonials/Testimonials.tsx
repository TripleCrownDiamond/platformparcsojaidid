import React from 'react';
import Image from 'next/image';

const Testimonials = () => {

    const testimonials = [
        {
            name: "John Doe",
            testimonial: "Grâce à cette plateforme, j'ai pu augmenter le rendement de ma production de soja de manière significative.",
            image: "/img/user.png",
            role: "Producteur de Soja"
        },
        {
            name: "Marie Dupont",
            testimonial: "En tant que transformatrice de soja, cette application m'a aidée à mieux comprendre la qualité des récoltes pour optimiser le processus de transformation.",
            image: "/img/user.png",
            role: "Transformatrice de Soja"
        },
        {
            name: "Pauline Yao",
            testimonial: "Les techniques recommandées par cette plateforme m'ont aidée à améliorer la qualité de mon soja, ce qui a facilité la transformation en produits dérivés.",
            image: "/img/user.png",
            role: "Transformatrice de Soja"
        }
    ];    

    // Fonction pour tronquer le témoignage à 150 caractères
    const truncateTestimonial = (text: string, maxLength: number): string => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className='flex flex-col justify-center items-center my-20'>
            <h1 className='text-2xl md:text-4xl font-black mb-6'>Ils utilisent notre plateforme</h1>
            <div className='flex flex-wrap justify-center items-center gap-10'>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className='flex flex-col h-96 items-center justify-center p-6 bg-green-100 rounded-lg shadow-md max-w-xs'>
                        <Image 
                            src={testimonial.image} 
                            alt={`${testimonial.name}'s profile`} 
                            className='w-24 h-24 rounded-full mb-4'
                            width={100}
                            height={100}
                        />
                        <h2 className='text-lg font-semibold'>{testimonial.name}</h2>
                        <p className='text-sm text-gray-600'>{testimonial.role}</p>
                        <p className='text-center mt-4 text-gray-800'>
                            {truncateTestimonial(testimonial.testimonial, 150)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Testimonials;
