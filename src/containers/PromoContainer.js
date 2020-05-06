import React, { useState, useEffect } from 'react';

import PromoCard from '../components/PromoCard';

import config from "../config";

const PromoContainer = () => {
  const [promos, setPromos] = useState([]);
  const [isPromosFetched, setIsPromosFetched] = useState(false);

  useEffect(() => {
    if (!isPromosFetched) {
      fetch(`http://${config.SERVER_IP}:${config.BACKEND_PORT}/misc/promotions`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        let _promos = [];
        for (let k in data) {
            if (k === 'status') {
                continue;
            }
            _promos.push(data[k]);
        }
        setPromos(_promos);
        setIsPromosFetched(true);
      });
    }
  });

  return (
    <div className="page">
      <h1 className="allMargin">Promotions</h1>
      {promos.map(o =>
        <PromoCard
          key={`promocard_${o.id}`}
          code={o.code}
          restaurant={o.rname}
          description={o.description}
          time={o.enddate == null ? null : o.enddate.slice(0, 10) + ' ' + o.enddate.slice(11, 16)}
        />
      )}
    </div>
  );
};

export default PromoContainer;