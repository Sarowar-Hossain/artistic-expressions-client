import React from "react";

const SubBanner = ({ banner, title }) => {
  return (
    <div className="object-cover" style={{ backgroundImage: `url(${banner})` }}>
      <div className="hero h-[400px]">
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubBanner;
