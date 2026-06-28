import { eightNinePhotographySite } from "../sites/eight-nine-photography";

export type ActiveSite = typeof eightNinePhotographySite;

export function getActiveSite(): ActiveSite {
  return eightNinePhotographySite;
}
