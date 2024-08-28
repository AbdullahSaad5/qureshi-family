import React, { useEffect, useState } from 'react';

export default function menbers() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://quresh-family-5b06b2823b36.herokuapp.com/api/members');
      const jsonData = await response.json();
      setData(jsonData);
      console.log("data is here", data)
    };

    fetchData();
  }, [])
  return(
    data
  )}
