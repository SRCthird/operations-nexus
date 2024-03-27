/**
 * The slides object for listing slide locations.
 * 
 * @param {string} Slide - The location of the slide in the backend.
 */
export interface Slides {
  Slide: string;
}

/**
 * The properties of the PowerPointApp object.
 *
 * @param {number} ID - The ID of the PowerPointApp.
 * @param {boolean} Main - Whether to show main slides or not.
 * @param {string} Department - The department of the PowerPointApp.
 */
export interface PowerPointApp {
  ID: number;
  Main: boolean;
  Department: string;
}

