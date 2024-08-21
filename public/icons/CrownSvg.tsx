import React from 'react'

interface CrownSvgProps {
  isLeader: boolean
}

function CrownSvg({ isLeader }: CrownSvgProps) {
  const fillColor = isLeader ? 'white' : '#AAAFB3'

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-1 inline-block"
    >
      <path
        d="M12.75 16.5H5.25C4.9425 16.5 4.6875 16.245 4.6875 15.9375C4.6875 15.63 4.9425 15.375 5.25 15.375H12.75C13.0575 15.375 13.3125 15.63 13.3125 15.9375C13.3125 16.245 13.0575 16.5 12.75 16.5Z"
        fill={fillColor}
      />
      <path
        d="M15.2622 4.14027L12.2622 6.28527C11.8647 6.57027 11.2947 6.39777 11.1222 5.94027L9.70468 2.16027C9.46468 1.50777 8.54218 1.50777 8.30218 2.16027L6.87718 5.93277C6.70468 6.39777 6.14218 6.57027 5.74468 6.27777L2.74468 4.13277C2.14468 3.71277 1.34968 4.30527 1.59718 5.00277L4.71718 13.7403C4.82218 14.0403 5.10718 14.2353 5.42218 14.2353H12.5697C12.8847 14.2353 13.1697 14.0328 13.2747 13.7403L16.3947 5.00277C16.6497 4.30527 15.8547 3.71277 15.2622 4.14027ZM10.8747 11.0628H7.12468C6.81718 11.0628 6.56218 10.8078 6.56218 10.5003C6.56218 10.1928 6.81718 9.93777 7.12468 9.93777H10.8747C11.1822 9.93777 11.4372 10.1928 11.4372 10.5003C11.4372 10.8078 11.1822 11.0628 10.8747 11.0628Z"
        fill={fillColor}
      />
    </svg>
  )
}

export default CrownSvg
