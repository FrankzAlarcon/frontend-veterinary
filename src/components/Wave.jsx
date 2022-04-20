import React from 'react';

function Wave() {
  return (
    <div className="w-full h-screen absolute bottom-0 -z-10">
      <svg
        id="visual"
        className="w-full h-screen"
        version="1.1"
      >
        <path
          d="M0 425L41.7 489C83.3 553 166.7 681 250 672.5C333.3 664 416.7 519 500 522.8C583.3 526.7 666.7 679.3 750 733.3C833.3 787.3 916.7 742.7 1000 674.2C1083.3 605.7 1166.7 513.3 1250 461.7C1333.3 410 1416.7 399 1500 428.7C1583.3 458.3 1666.7 528.7 1750 545C1833.3 561.3 1916.7 523.7 1958.3 504.8L2000 486L2000 1001L1958.3 1001C1916.7 1001 1833.3 1001 1750 1001C1666.7 1001 1583.3 1001 1500 1001C1416.7 1001 1333.3 1001 1250 1001C1166.7 1001 1083.3 1001 1000 1001C916.7 1001 833.3 1001 750 1001C666.7 1001 583.3 1001 500 1001C416.7 1001 333.3 1001 250 1001C166.7 1001 83.3 1001 41.7 1001L0 1001Z"
          fill="#4f46e5"
          strokeLinecap="round"
          strokeLinejoin="miter"
        />
      </svg>
    </div>
  );
}

export default Wave;