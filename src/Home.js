import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_FT_COVIDUPDATE_XSite_3000x1200_PV_en-GB._CB408004052_.jpg"
          alt=""
        />
        <div className="home__row">
          <Product
            id="87675"
            title="the lean stratp"
            price={29.99}
            image="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"
            rating={5}
          />
          <Product
            id="49538094"
            title="Huawei Mate 40 pro"
            price={999.0}
            rating={4}
            image="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/mate40-pro/main-product/positive.png"
          />
        </div>
        <div className="home__row">
          <Product
            id="98687"
            title="Huawei Watch GT3 Pro"
            price={432.0}
            rating={5}
            image="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/admin-image/wearables/watch-gt3-pro-titanium/titanium.png"
          />
          <Product
            id="9876789"
            title="Samsung S22 Ultra"
            price={1022}
            rating={5}
            image="https://www.xda-developers.com/files/2022/02/Samsung-Galaxy-S22-Pink-Gold_Product-Box-Image_49652-e1644317124639.jpg"
          />
          <Product
            id="987687"
            title="Oneplus 10 Pro"
            price={888.0}
            rating={4}
            image="https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-10-pro-2.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id="86789"
            title="Vertu"
            price={2111}
            rating={3}
            image="https://cdn.shopify.com/s/files/1/0620/6524/6434/products/82.1_grande.png?v=1642247528"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
