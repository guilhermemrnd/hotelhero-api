export interface RegionsResponse {
  query: string;
  data: Array<{
    index: string;
    gaiaId: string;
    type: string;
    regionNames: {
      fullName: string;
      shortName: string;
      displayName: string;
      primaryDisplayName: string;
      secondaryDisplayName: string;
      lastSearchName: string;
    };
    essId: {
      sourceName: string;
      sourceId: string;
    };
    coordinates: {
      lat: string;
      long: string;
    };
    hierarchyInfo: {
      country: {
        name: string;
        isoCode2: string;
        isoCode3: string;
      };
      relation: string[];
    };
  }>;
}
