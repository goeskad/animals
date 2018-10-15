/**
 * 动物的跑道
 */
class AnimalsTrail extends Laya.Box {
    private animals: Animal[];

    private manager: DataManager;

    constructor() {
        super();

        this.manager = DataManager.getInstance();
    }

    // 动物移动动画
    public animalsRun() {
        //TODO
    }

    // 增加动物进入跑道
    public addAnimal(animal: Animal) {
        this.manager.getData().runningAnimals.push(animal.animalKind);
        this.manager.dataChanged();

        this.animals.push(animal);
    }

    // 从跑道中移除动物
    public removeAnimal(animal: Animal) {
        let index = this.animals.indexOf(animal);
        if(index > -1) {
            this.animals.splice(index,1);

            this.manager.getData().runningAnimals.splice(index, 1);
            this.manager.dataChanged();
        } 
    }
}