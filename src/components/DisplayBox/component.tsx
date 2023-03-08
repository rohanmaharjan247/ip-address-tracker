import { IpTracker } from '../../model/ip-tracker';

interface DisplayBoxProps {
  ipTracker: IpTracker | undefined;
  errorMessage: string | undefined;
}

const DisplayBox = ({ ipTracker, errorMessage }: DisplayBoxProps) => {
  return (
    <div className="card-box">
      {errorMessage ? (
        <p className="text-center">{errorMessage}</p>
      ) : (
        <>
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-dark-gray-400">
              IP Address
            </h4>
            <h3 className="text-lg font-bold md:text-xl">
              {ipTracker?.ip ?? '-'}
            </h3>
          </div>
          <div className="divider"></div>
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-dark-gray-400">
              Location
            </h4>
            <h3 className="text-lg font-bold md:text-xl">
              {ipTracker
                ? `${ipTracker?.location?.region}, ${ipTracker?.location?.country}`
                : '-'}
            </h3>
          </div>
          <div className="divider"></div>
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-dark-gray-400">
              Timezone
            </h4>
            <h3 className="text-lg font-bold md:text-xl">
              {ipTracker?.location?.timezone ?? '-'}
            </h3>
          </div>
          <div className="divider"></div>
          <div className="">
            <h4 className="text-xs uppercase font-bold tracking-widest text-dark-gray-400">
              ISP
            </h4>
            <h3 className="text-lg font-bold md:text-xl">
              {ipTracker?.isp ?? '-'}
            </h3>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayBox;
