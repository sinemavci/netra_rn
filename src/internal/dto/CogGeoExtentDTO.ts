export class CogGeoExtentDTO extends BaseDTO {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;

  constructor(minLat: number, maxLat: number, minLon: number, maxLon: number) {
    super();
    this.minLat = minLat;
    this.maxLat = maxLat;
    this.minLon = minLon;
    this.maxLon = maxLon;
  }

  static fromDataModel(model: CogGeoExtent) {
    return new CogGeoExtentDTO(
      model.minLat,
      model.maxLat,
      model.minLon,
      model.maxLon
    );
  }

  static fromJSON(json: string) {
    const parsedJSON = JSON.parse(json);
    return new CogGeoExtentDTO(
      parsedJSON.minLat,
      parsedJSON.maxLat,
      parsedJSON.minLon,
      parsedJSON.maxLon
    );
  }

  toDataModel(): CogGeoExtent {
    return new CogGeoExtent({
      minLat: this.minLat,
      maxLat: this.maxLat,
      minLon: this.minLon,
      maxLon: this.maxLon,
    });
  }

  toJSON() {
    return {
      minLat: this.minLat,
      maxLat: this.maxLat,
      minLon: this.minLon,
      maxLon: this.maxLon,
    };
  }
}
