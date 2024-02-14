import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
   <ContentLoader
      speed={2}
      width={280}
      height={459}
      viewBox="0 0 280 459"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="140" cy="135" r="133" />
      <rect x="0" y="281" rx="0" ry="0" width="282" height="17" />
      <rect x="0" y="311" rx="10" ry="10" width="276" height="77" />
      <rect x="158" y="407" rx="10" ry="10" width="116" height="41" />
      <rect x="0" y="418" rx="0" ry="0" width="102" height="26" />
   </ContentLoader>
);

export default Skeleton;
