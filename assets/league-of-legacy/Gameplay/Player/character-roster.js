// Character-specific runtime configuration for League Of Legacy.
// Clip names are supplied by the project owner; existence in each GLB must be verified in-browser.
export const CHARACTER_ROSTER = {
  charlotte: {
    id: "charlotte", name: "Charlotte", model: "Charlotte.glb",
    animations: {
      idle: "idle1_base1", walk: "Run_Haste", run: "Run", jump: "Spell2",
      passive: "Attack1", hybrid: "Channel", aggressive: "Idle_Spell4_loop",
      tiny: "Spell2", damage: "Death", victory: "Dance_Loop"
    }
  },
  emma: {
    id: "emma", name: "Emma", model: "Emma.glb",
    animations: {
      idle: "Janna_Skin13_idle1.anm", walk: "Run_Normal", run: "Run_Homeguard",
      jump: "Ult_Windup", passive: "Attack1", hybrid: "Attack2",
      aggressive: "Crit", tiny: "Spell1", damage: "Death", victory: "Dance"
    }
  },
  bella: {
    id: "bella", name: "Bella", model: "Bella.glb",
    animations: {
      idle: "Idle", walk: "Run", run: "Run2", jump: "Spell3_Into_IDLE",
      passive: "Crit", hybrid: "Spell2", aggressive: "Spell4_0",
      tiny: "Spell_Dash", damage: "Death", victory: "Dance"
    }
  },
  stella: {
    id: "stella", name: "Stella", model: "Stella.glb",
    animations: {
      idle: "DiskSpin.anm", walk: "Run_Base", run: "Run_Fast",
      jump: "Spell1_empowered.anm", passive: "Attack1", hybrid: "Attack2",
      aggressive: "Crit", tiny: "Spell1.anm", damage: "Death.anm", victory: "Dave_Loop.anm"
    }
  },
  aquamarine: {
    id: "aquamarine", name: "Aquamarine", model: "Aquamarine.glb",
    animations: {
      idle: "idle1_base", walk: "Run2", run: "Run1", jump: null,
      passive: "Spell3_0", hybrid: "Spell3_90", aggressive: "Spell2_0",
      tiny: "Spell3_Ti_Idle", damage: "Death_Loop", victory: "Dance_Loop"
    }
  },
  arthur: {
    id: "arthur", name: "Arthur", model: "Arthur.glb",
    animations: {
      idle: "Idle1", walk: "Run", run: "Run", jump: "Spell1",
      passive: "Attack1", hybrid: "Attack2", aggressive: "Crit",
      tiny: "Spell2", damage: "Death", victory: "Dance"
    }
  }
};

export function getCharacterConfig(id = "charlotte") {
  return CHARACTER_ROSTER[id] || CHARACTER_ROSTER.charlotte;
}
