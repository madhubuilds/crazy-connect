import { furnitureCatalog } from "../data/furnitureCatalog";

/**
 * Finds an asset in the catalog by its ID.
 */
export function getAssetById(assetId) {
  return furnitureCatalog.find((asset) => asset.assetId === assetId);
}

/**
 * Adjusts the footprint dimensions based on 90-degree rotations.
 */
export function getRotatedFootprint(footprint = [1, 1], rotation = 0) {
  const [width, depth] = footprint;

  // Convert radians to increments of 90 degrees (0, 1, 2, 3)
  // The use of % 4 handles full rotations, and +4) % 4 handles negative numbers.
  const normalizedRotation = Math.round(rotation / (Math.PI / 2));
  const rotationIndex = ((normalizedRotation % 4) + 4) % 4;

  const isSideways = rotationIndex % 2 === 1;

  return isSideways ? [depth, width] : [width, depth];
}

/**
 * Generates a list of grid cell coordinates (strings) occupied by an item.
 */
export function getOccupiedCells(position, footprint = [1, 1]) {
  const [width, depth] = footprint;
  const [x, , z] = position; // Assuming [x, y, z] coordinate system

  const cells = [];

  const startX = x - Math.floor(width / 2);
  const startZ = z - Math.floor(depth / 2);

  for (let ix = 0; ix < width; ix++) {
    for (let iz = 0; iz < depth; iz++) {
      cells.push(`${startX + ix},${startZ + iz}`);
    }
  }

  return cells;
}

/**
 * Checks if a proposed position/rotation overlaps with existing placed items.
 */
export function isPositionOccupied({
  position,
  assetId,
  rotation,
  placedItems,
  ignoreItemId = null,
}) {
  const asset = getAssetById(assetId);
  if (!asset) return false;

  const footprint = getRotatedFootprint(
    asset.footprint || [1, 1],
    rotation || 0,
  );

  const targetCells = getOccupiedCells(position, footprint);

  for (const item of placedItems) {
    if (item.id === ignoreItemId) continue;

    const itemAsset = getAssetById(item.assetId);
    if (!itemAsset) continue;

    const itemFootprint = getRotatedFootprint(
      itemAsset.footprint || [1, 1],
      item.rotation || 0,
    );

    const itemCells = getOccupiedCells(item.position, itemFootprint);

    // Check if any cell in the new item's footprint exists in the existing item's footprint
    const hasOverlap = targetCells.some((cell) => itemCells.includes(cell));

    if (hasOverlap) return true;
  }

  return false;
}
