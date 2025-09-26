import { PricingInteraction } from '@/components/ui/pricing-interaction'
import React from 'react'

const page = () => {
  return (
    <main className='flex max-w-full justify-center items-center min-h-screen'>
        <PricingInteraction 
        starterMonth={3.99}
        starterAnnual={1.49}
        proMonth={6.99}
        proAnnual={3.49}
        />
    </main>
  )
}

export default page