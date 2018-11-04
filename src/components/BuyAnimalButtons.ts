/**
 * 购买动物组件
 */
class BuyAnimalButtons extends Laya.Box {
    private buyButton: Laya.Image;
    private m_bk_ui:ui.backgroundUI = null;
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
    private _on_init_bkui():void{
        this.m_bk_ui = new ui.backgroundUI();
        Laya.stage.addChildAt(this.m_bk_ui,1);
    }
    onClickBuy() {
        console.log("click buy", this.shop.visible);
        if(this.m_bk_ui == null){
            Laya.loader.load("res/atlas/ui/bk.atlas",Laya.Handler.create(this,this._on_init_bkui,null,true),null,Laya.Loader.ATLAS);
        }
        Laya.stage.addChild(this.shop);
    }
}