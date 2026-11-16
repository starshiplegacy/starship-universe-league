/**
 * League Of Legacy — canonical game-mode and map registry.
 *
 * This module assigns assets to modes. It does not invent rules or claim that
 * source-only assets are runtime-ready. Import from the match/preview layer.
 */
const ROOT = "./assets/league-of-legacy/Map/";

export const MAPS = Object.freeze({
  summonersRift: Object.freeze({
    id: "summoners-rift",
    name: "Summoner's Rift",
    sourcePath: ROOT + "For BAttle Royale & De Clasificatoria/SummonersRift/",
    format: "obj-mtl-dds",
    entry: "SummonersRift.obj",
    material: "SummonersRift.mtl",
    runtimeStatus: "source-only",
    notes: "OBJ/MTL with DDS texture set; requires a verified DDS/material import pipeline."
  }),
  versus13: Object.freeze({
    id: "versus-1-to-3",
    name: "Versus 1 to 3",
    sourcePath: ROOT + "Versus/Versus 1 to 3/files/",
    format: "fbx",
    entry: "BeginningLobby.fbx",
    runtimeStatus: "blocked-license-review",
    license: "CC BY-NC",
    licenseSource: ROOT + "Versus/Versus 1 to 3/LICENSE.txt",
    notes: "The included license is non-commercial. Do not ship or use commercially until rights are cleared."
  }),
  versus45: Object.freeze({
    id: "versus-4-to-5",
    name: "Versus 4 to 5",
    sourcePath: ROOT + "Versus/Versus 4 to 5/",
    format: "glb",
    entry: "battle_guys_map_500th_model.glb",
    runtimeStatus: "preview-candidate",
    notes: "GLB is present; scale, materials, collisions and spawn points still need validation."
  }),
  training: Object.freeze({
    id: "training-main",
    name: "Training",
    sourcePath: ROOT + "For Training/",
    format: "glb",
    entry: "For_Training.glb",
    runtimeStatus: "preview-candidate",
    notes: "The repository currently exposes one GLB in this folder; validate it before gameplay use."
  })
});

export const GAME_MODES = Object.freeze({
  battleRoyale: Object.freeze({
    id: "battle-royale",
    name: "Battle Royale",
    mapId: MAPS.summonersRift.id,
    rulesetId: "battle-royale",
    rulesStatus: "design-pending"
  }),
  ranked: Object.freeze({
    id: "ranked",
    name: "De Clasificatoria",
    mapId: MAPS.summonersRift.id,
    rulesetId: "ranked",
    rulesStatus: "design-pending"
  }),
  versus13: Object.freeze({
    id: "versus-1-to-3",
    name: "Versus 1 to 3",
    mapId: MAPS.versus13.id,
    rulesetId: "versus-1-to-3",
    rulesStatus: "design-pending"
  }),
  versus45: Object.freeze({
    id: "versus-4-to-5",
    name: "Versus 4 to 5",
    mapId: MAPS.versus45.id,
    rulesetId: "versus-4-to-5",
    rulesStatus: "design-pending"
  }),
  training: Object.freeze({
    id: "training",
    name: "Entrenamiento",
    mapId: MAPS.training.id,
    rulesetId: "training",
    rulesStatus: "design-pending"
  })
});

export function getGameMode(modeId) {
  return Object.values(GAME_MODES).find(mode => mode.id === modeId) ?? null;
}

export function getMapForMode(modeId) {
  const mode = getGameMode(modeId);
  if (!mode) return null;
  return Object.values(MAPS).find(map => map.id === mode.mapId) ?? null;
}

export function getModeLaunchInfo(modeId) {
  const mode = getGameMode(modeId);
  if (!mode) throw new Error("Unknown game mode: " + modeId);
  const map = getMapForMode(modeId);
  return Object.freeze({ mode, map, canLoadPreview: map.runtimeStatus === "preview-candidate" && map.format === "glb" });
}

export function assertMapAllowedForProduction(modeId) {
  const info = getModeLaunchInfo(modeId);
  if (info.map.runtimeStatus === "blocked-license-review") {
    throw new Error("Map blocked pending commercial-use rights review: " + info.map.name);
  }
  if (info.map.runtimeStatus !== "preview-candidate") {
    throw new Error("Map is not runtime-ready: " + info.map.name + " (" + info.map.runtimeStatus + ")");
  }
  return info;
}
