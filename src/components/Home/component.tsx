import L from 'leaflet';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchIPDetail,
  selectAllIpTracker,
  selectIpTrackerById,
} from '../../features/ip-tracker/ipTrackerSlice';
import { ReactComponent as Arrow } from '../../icons/icon-arrow.svg';
import { ResponseError } from '../../model/ResponseError';
import { DisplayBox } from '../DisplayBox';
import { MapDisplay } from '../MapDisplay';

const Home = () => {
  const DEFAULT_LAT = 34.04915;
  const DEFAULT_LNG = -118.09462;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [ip, setIp] = useState<string>();

  const dispatch = useAppDispatch();
  const selectIPTracker = useAppSelector((state) =>
    selectIpTrackerById(state, ip ?? '')
  );

  const trackIP = () => {
    dispatch(fetchIPDetail(searchTerm))
      .unwrap()
      .then((response) => {
        setIp(response?.ip);
        setErrorMessage(undefined);
      })
      .catch((error: ResponseError) => {
        setErrorMessage(error.messages);
      });
  };

  const pressedEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      trackIP();
    }
  };

  return (
    <div className="relative">
      <div className="bg-image h-72 md:h-52">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold py-8 text-white">
            IP Address Tracker
          </h1>
          <div className="w-full px-8 md:px-32">
            <div className="relative">
              <input
                type="text"
                className="p-4 rounded-md w-full placeholder:text-sm md:placeholder:text-base"
                placeholder="Search for any IP address or domain"
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                onKeyDown={pressedEnter}
              />
              <button
                type="button"
                className="absolute right-0 top-0 rounded-tr-md rounded-br-md border-none h-full bg-black px-6 py-4"
                aria-label="search"
                id="search"
                onClick={trackIP}
              >
                <span>
                  <Arrow />
                </span>
              </button>
            </div>
            <DisplayBox
              ipTracker={selectIPTracker}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <MapDisplay
          lat={selectIPTracker?.location?.lat ?? DEFAULT_LAT}
          lng={selectIPTracker?.location?.lng ?? DEFAULT_LNG}
          locationName={
            selectIPTracker?.location
              ? `${selectIPTracker?.location?.city}, ${selectIPTracker?.location?.region}, ${selectIPTracker?.location?.country}`
              : 'You are here'
          }
        />
      </div>
    </div>
  );
};

export default Home;
