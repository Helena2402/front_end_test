'use client'

import { useState } from 'react'

interface ReadMoreProps {
  id: string
  text: string
  amountOfWords?: number
}

export const ReadMore = ({id, text, amountOfWords = 25}: ReadMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const splittedText = text.split(' ')
  const itCanOverflow = splittedText.length > amountOfWords
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(' ')
    : text
  const endText = splittedText.slice(amountOfWords - 1).join(' ')

  return (
    <p id={id}>
      {beginText}
      {itCanOverflow && (
          <>
            {!isExpanded && <span>... </span>}
            <span className={`${!isExpanded && 'hidden'}`} > 
              {endText}
            </span>
            <a className='text-blue-800 cursor-pointer '
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? '' : 'show more'}
            </a>
          </>
      )}
    </p>
  )
}