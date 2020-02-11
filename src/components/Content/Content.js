import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";

export default function Content({ searchValue }) {
  const [data, setData] = useState([
    {}
  ]);

  const convert = (timestamp) => {
    var date = new Date(
      parseInt(
        timestamp.split("(")[1]
      )
    );
    var dateFormat = [date.getFullYear(),
    ("0" + (date.getMonth() + 1)).slice(-2),
    ("0" + date.getDate()).slice(-2),
    ].join('-');
    var time = [date.getHours(),
    date.getMinutes()
    ].join(':');
    return dateFormat + " " + time;
  }

  useEffect(() => {
    axios
      .get(`https://api.corrently.io/core/gsi?plz=${searchValue}`)
      .then(res => res.data)
      .then((res) => {
        res.forecast && res.forecast.map((item) => {
          item.timeStamp = convert(`/Date(${item.timeStamp}/`);
          return item;
        });
        setData(res);
      });
  }, [searchValue]);

  const setTitle = data.forecast && data.forecast.length ? `${data.location.zip}-${data.location.city}` : 'Forecast';

  return (
    <div >
      <MaterialTable options={{ search: false, maxBodyHeight: 765 }}
        columns={[
          { title: "Time", field: "timeStamp", width: '150px' },
          { title: "Scale", field: "scale" },
          { title: "E Solar", field: "esolar" },
          { title: "EE Value", field: "eevalue" },
          { title: "E Wind", field: "ewind" },
          { title: "Base", field: "base" },
          { title: "GSI", field: "gsi" },
          { title: "CO2 G Standard", field: "co2_g_standard" },
          { title: "CO2 G Oekostrom", field: "co2_g_oekostrom" }
        ]}
        data={data.forecast}
        title={setTitle}
      />
    </div>
  );
}
