export interface IpTracker {
  ip: string;
  location: Location;
  domains: string[];
  as: AS;
  isp: string;
}

export interface Location {
  country: string;
  region: string;
  timezone: string;
  city: string;
  lat: number;
  lng: number;
  postalCode: string;
  geonameId: number;
}

export interface AS {
  asn: number;
  name: string;
  route: string;
  domain: string;
  type: string;
}
