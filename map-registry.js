/**
 * League Of Legacy — canonical game mode and map registry.
 * Map assignment and rulesets are independent. This file does not claim that
 * collision, spawn points, navigation or match simulation are implemented.
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
    runtimeStatus: "blocked-license-review",
    license: "Riot Games intellectual property — Summoner's Rift map",
    licenseStatus: "written-license-required",
    licenseSource: "https://www.riotgames.com/es-419/informacion-legal",
    notes: "The asset appears to reproduce Riot Games map content. Do not load into this game/app or distribute without written authorization applicable to the project."
  }),
  versus13: Object.freeze({
    id: "versus-1-to-3",
    name: "Versus 1 to 3",
    sourcePath: ROOT + "Versus/Versus 1 to 3/files/",
    format: "fbx",
    entry: "BeginningLobby.fbx",
    runtimeStatus: "blocked-license-review",
    license: "CC BY-NC",
    licenseStatus: "non-commercial-only",
    licenseSource: ROOT + "Versus/Versus 1 to 3/LICENSE.txt",
    attribution: "Omeleto (Thingiverse)",
    notes: "The included license is non-commercial. Preview/use is disabled until rights and attribution are cleared for the intended project."
  }),
  versus45: Object.freeze({
    id: "versus-4-to-5",
    name: "Versus 4 to 5",
    sourcePath: ROOT + "Versus/Versus 4 to 5/",
    format: "glb",
    entry: "battle_guys_map_500th_model.glb",
    runtimeStatus: "preview-candidate",
    licenseStatus: "not-verified",
    notes: "GLB present; inspect scale, material appearance, memory use, collision and spawn points before gameplay."
  }),
  training: Object.freeze({
    id: "training-main",
    name: "Training",
    sourcePath: ROOT + "For Training/",
    format: "glb",
    entry: "For_Training.glb",
    runtimeStatus: "preview-candidate",
    licenseStatus: "not-verified",
    notes: "One GLB entry is currently visible in this folder; confirm whether additional training maps will be added."
  })
});

export const GAME_MODES = Object.freeze({
  battleRoyale: Object.freeze({
    id: "battle-royale", name: "Battle Royale",
    mapId: MAPS.summonersRift.id, rulesetId: "battle-royale",
    rulesStatus: "design-pending"
  }),
  ranked: Object.freeze({
    id: "ranked", name: "De Clasificatoria",
    mapId: MAPS.summonersRift.id, rulesetId: "ranked",
    rulesStatus: "design-pending"
  }),
  versus13: Object.freeze({
    id: "versus-1-to-3", name: "Versus 1 to 3",
    mapId: MAPS.versus13.id, rulesetId: "versus-1-to-3",
    rulesStatus: "design-pending"
  }),
  versus45: Object.freeze({
    id: "versus-4-to-5", name: "Versus 4 to 5",
    mapId: MAPS.versus45.id, rulesetId: "versus-4-to-5",
    rulesStatus: "design-pending"
  }),
  training: Object.freeze({
    id: "training", name: "Entrenamiento",
    mapId: MAPS.training.id, rulesetId: "training",
    rulesStatus: "design-pending"
  })
});

export function getGameMode(modeId) {
  return Object.values(GAME_MODES).find(mode => mode.id === modeId) ?? null;
}
export function getMapForMode(modeId) {
  const mode = getGameMode(modeId);
  return mode ? Object.values(MAPS).find(map => map.id === mode.mapId) ?? null : null;
}
export function getModeLaunchInfo(modeId) {
  const mode = getGameMode(modeId);
  if (!mode) throw new Error("Unknown game mode: " + modeId);
  const map = getMapForMode(modeId);
  return Object.freeze({
    mode, map,
    canLoadPreview: map.runtimeStatus === "preview-candidate" &&
      (map.format === "glb" || map.format === "obj-mtl-dds")
  });
}
export function assertMapAllowedForProduction(modeId) {
  const info = getModeLaunchInfo(modeId);
  if (info.map.runtimeStatus === "blocked-license-review")
    throw new Error("Map blocked pending license review: " + info.map.name);
  if (info.map.licenseStatus === "not-verified" || info.map.licenseStatus === "review-required")
    throw new Error("Map license status is not cleared: " + info.map.name);
  if (info.map.runtimeStatus !== "preview-candidate")
    throw new Error("Map is not runtime-ready: " + info.map.name);
  return info;
}
