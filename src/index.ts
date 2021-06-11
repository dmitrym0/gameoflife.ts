export class World {
}

export class NextWorldGenerator {
    oldWorld: World;
    constructor(world: World) {
        this.oldWorld = world;
    }

    nextWorld(): World {
        return new World();
    }
}


