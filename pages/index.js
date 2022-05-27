import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useMemo, useState } from 'react'
import NowAiring from './components/NowAiring';
import ComingSoon from './components/ComingSoon';
import useQuery from '../utils/useQuery';

export default function Home() {
  const [{ isLoading, result: cinemas }] = useQuery(supabase => (supabase.from("cinemas").select(`id, name`)));
  const [cinemaIndex, setCinemaIndex] = useState(0);

  const [airing, setAring] = useState(true);

  return (
    <>
      <div id="main">
        <div className="banner">
          <div className="bannerImg">
            <img src="./img/2048x682_1648780788430.jpg" />
          </div>
          <div className="bannerForm">
            <div id="bannerTitleForm">mua vé nhanh</div>
            <form action="">
              <select name="chonPhim" id="chonPhim">\
                <option value="">Chọn phim</option>
                <option value="">Phim 1</option>
                <option value="">Phim 2</option>
                <option value="">Phim 3</option>
                <option value="">Phim 4</option>
                <option value="">Phim 5</option>
              </select>
              <select name="chonRap" id="chonRap">
                <option value="">Chọn rạp</option>
                <option value="">Rạp 1</option>
                <option value="">Rạp 2</option>
                <option value="">Rạp 3</option>
                <option value="">Rạp 4</option>
                <option value="">Rạp 5</option>
              </select>
              <select name="chonNgay" id="chonNgay">
                <option value="">Chọn ngày</option>
                <option value="">Ngày 1</option>
                <option value="">Ngày 2</option>
                <option value="">Ngày 3</option>
                <option value="">Ngày 4</option>
                <option value="">Ngày 5</option>
              </select>
              <select name="chonSuat" id="chonSuat">
                <option value="">Chọn suất</option>
                <option value="">Suất 1</option>
                <option value="">Suất 2</option>
                <option value="">Suất 3</option>
                <option value="">Suất 4</option>
                <option value="">Suất 5</option>
              </select>
              <button id="chonSubmit" type="submit">Mua vé</button>
            </form>
          </div>
        </div>
        <div className="content">
          <div className="tabMovie-line">
            {!isLoading && (
              <>
                <ul className="navMovie">
                <select value={cinemaIndex} onChange={e => setCinemaIndex(e.target.value)} className="login">
                  {cinemas.map((c, index) => (<option key={index} value={index}>{c.name}</option>))}
                </select>

                <li className="active"> 
                  <button onClick={() => setAring(true)} className={`hover:text-blue-500 ${airing ? "text-blue-500" : ""}`}>
                    Phim đang chiếu
                  </button>
                </li>
                <li >
                  <button onClick={() => setAring(false)} className={`hover:text-blue-500 ${!airing ? "text-blue-500" : ""}`}>
                    Phim sắp chiếu
                  </button>
                </li>
              </ul>
              <div className="tabContent">
                {airing ? <NowAiring cinema={cinemas[cinemaIndex]} /> : <ComingSoon cinema={cinemas[cinemaIndex]} />}
              </div>
              </>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}
