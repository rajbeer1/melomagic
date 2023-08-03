import { useState } from 'react'
import axios from 'axios';

import './App.css'

function App() {
  const [limit, setlimit] = useState(2);
  const [target_liveness, settarget_liveness] = useState(0.5);
  const [target_popularity, settarget_popularity] = useState(0.5);
  const [target_energy, settarget_energy] = useState(0.5);
  const [target_instrumentalness, settarget_instrumentalness] = useState(0.5);
  const [seed_genres, setseed_genres] = useState("hip-hop");
  const [songs, setsongs] = useState([]);
  const getsongs = async () => {
    try {
      const response = await axios.post(
        'https://melomagic-api.onrender.com/playlist',
        {
          limit: limit,
          target_liveness: target_liveness,
          target_popularity: target_popularity,
          target_energy: target_energy,
          target_instrumentalness: target_instrumentalness,
          seed_artists: '4NHQUGzhtTLFvgF5SZesLK',
          seed_genres,
          seed_tracks: '0c6xIDDpzE81m2q797ordA',
        }
      );

      setsongs(response.data.uris);
      console.log(response.data.uris);
    } catch (error) {
      console.error(error);
    }
  };
   const limitchange = (event) => {
     const value = Math.max(1, Math.min(100, Number(event.target.value)));
     setlimit(value);
   };const livelychange = (event) => {
     const value = Math.max(0, Math.min(1, Number(event.target.value)));
     settarget_liveness(value);
   };
  const popularitychange = (event) => {
    const value = Math.max(1, Math.min(100, Number(event.target.value)));
    settarget_popularity(value);
  };const energychange = (event) => {
    const value = Math.max(0, Math.min(1, Number(event.target.value)));
    settarget_energy(value);
  };
  const instrumentchange = (event) => {
    const value = Math.max(0, Math.min(1, Number(event.target.value)));
    settarget_instrumentalness(value);
  };

  return (
    <div>
      <h1 className="text-4xl text-white py-10">welcome to MeloMagic </h1>
      <div>
        <h2 className="text-white p-3">enter the number of songs needed</h2>
        <input
          className=" w-80 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          type="number"
          placeholder="between 1 and 100"
          onChange={limitchange}
        />
        <h2 className="text-white p-3">how lively the songs should be</h2>
        <input
          className=" w-80 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          type="number"
          placeholder="between 0 and 1"
          onChange={livelychange}
        />
        <h2 className="text-white p-3">how popular should the songs be</h2>
        <input
          className=" w-80 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          type="number"
          placeholder="between 1 and 100"
          onChange={popularitychange}
        />
        <h2 className="text-white p-3">energy of the songs be </h2>
        <input
          className=" w-80 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          type="number"
          placeholder="between 0 and 1"
          onChange={energychange}
        />
        <h2 className="text-white p-3">instruments should be </h2>
        <input
          className=" w-80 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          type="number"
          placeholder="between 0 and 1"
          onChange={instrumentchange}
        />
        <div>
          <select
            className=" m-3 p-3 text-black"
            value={seed_genres}
            onChange={(e) => setseed_genres(e.target.value)}
          >
            <option value="">genres</option>
            <option value="hip-hop">hip-hop</option>
            <option value="anime">anime</option>
            <option value="pop">pop</option>
            <option value="punk-rock">punk-rock</option>
            <option value="rock">rock</option>
          </select>
        </div>
      </div>

      <button
        onClick={getsongs}
        className=" my-5 text-3xl bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow"
      >
        {' '}
        submit
      </button>

      <h1>Recommended Songs:</h1>
      <ul className="text-white ">
        {songs.map((song, index) => (
          <li className=" py-2 text-2xl" key={index}>
            {song}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
