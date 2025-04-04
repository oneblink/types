/**
 * A JSON representation of an ArcGIS Graphic. Graphics will be autocast at Form runtime using `Graphic.fromJSON` (see: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html#fromJSON).
 *
 * For information on what properties can be included, refer to the ArcGIS documentation here: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
 */
type ArcGISGraphic = Record<string, unknown>

export type ArcGISWebMapElementValue = {
  /**
   * A representation of the Graphics created via the drawing tool, not intended to be modified externally (ie. in lookups).
   * To modify drawn Graphics within a lookup, use the `drawingLayer` property instead.
   */
  userInput?: ArcGISGraphic[]
  drawingLayer?: ArcGISGraphic[]
  layers?: {
    title: string
    graphics: ArcGISGraphic[]
  }[]
}