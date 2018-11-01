/**
 * 购买动物组件
 */
class BuyAnimalButtons extends Laya.Box {
    private buyButton: Laya.Image;

    constructor(private shop: AnimalsShop) {
        super();

        this.init();
         
        this.autoSize = true;
        this.pos(220, 550);
    }

    init(): void {
        this.buyButton = new Laya.Image();
        
        this.buyButton.skin = "res/buy.png";
        this.addChild(this.buyButton);
        this.buyButton.on(Laya.Event.CLICK, this, this.onClickBuy);
    }

    onClickBuy() {
        console.log("click buy", this.shop.visible);
        Laya.stage.addChild(this.shop);
    }
}